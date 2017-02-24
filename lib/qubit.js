const math = require('mathjs')

class QuantumComputing {
  constructor() {
  }

  boot(qubitRegsNum, classicRegNum) {
    if (typeof(classicRegNum) === 'undefined') classicRegNum = qubitRegsNum
    this.qasm = []
    this.qasm.push(`qreg q[${qubitRegsNum}];`)
    this.qasm.push(`creg c[${classicRegNum}];\n`)

    this.qubitRegsNum = qubitRegsNum
    this.classicRegNum = classicRegNum
    this.twoBitsEntanglements = {}

    this.amplitudes = []
    const n = Math.pow(2, qubitRegsNum)
    for (let i = 0; i < n; i++) {
      this.amplitudes.push(0)
    }
    this.amplitudes[0] = 1  // pr |00....000> = 1

    this.measures = []  // offset is bits offset, value is bits qubit offset
    for (let i = 0; i < classicRegNum; i++) {
      // TODO
      this.measures.push(null)
    }

    return this
  }

  /**
   *
   *  eg this.amplitudes = [1/2, 1/2, 1/2, 1/2]
   *                        00   01    10   11
   *
   * getSingleQubitPairs(0) =>
   * [
   *  [{bitString: '00', i: 0, amplitudes: 1/2}, {bitString: '01', i: 1, amplitudes: 1/2}],
   *  [{bitString: '10', i: 0, amplitudes: 1/2}, {bitString: '11', i: 1, amplitudes: 1/2}],
   * ]
   *
   */
  getSingleQubitPairs(offset) {
    if (offset >= this.qubitRegsNum) throw `Error: invalid offset ${offset}`
    const memory = {}
    const pairs = []
    const shift = Math.pow(2, offset)
    for (let i = 0; i < this.amplitudes.length; i++) {
      if (i in memory) continue
      const n = Math.floor(i / shift)
      const isOne = n % 2 === 1

      let a = null,
          b = null
      if (isOne) {
        a = i - shift
        b = i
      } else {
        a = i
        b = i + shift
      }

      memory[a] = true
      memory[b] = true
      pairs.push([
        {i: a, amplitude: this.amplitudes[a]},
        {i: b, amplitude: this.amplitudes[b]}
      ])
    }
    return pairs
  }

  /**
   *
   * like getSingleQubitPairs, but return for two qubits
   * |control, target>
   * |00> |01> |10> |11>
   *  a    b    c    d
   *
   */
  getTwoQubitsPairs(control, target) {
    if (control >= this.qubitRegsNum) throw `Error: invalid offset ${control}`
    if (target >= this.qubitRegsNum) throw `Error: invalid offset ${target}`
    const memory = {}
    const pairs = []
    const shiftControl = Math.pow(2, control)
    const shiftTarget = Math.pow(2, target)
    for (let i = 0; i < this.amplitudes.length; i++) {
      if (i in memory) continue
      const nControl = Math.floor(i / shiftControl)
      const controlIsOne = nControl%2 === 1

      const nTarget = Math.floor(i / shiftTarget)
      const targetIsOne = nTarget%2 === 1

      let a = null,
          b = null,
          c = null,
          d = null
      if (controlIsOne) {
        if (targetIsOne) {
          d = i
          c = i - shiftTarget
          b = d - shiftControl
          a = b - shiftTarget
        } else {
          c = i
          d = c + shiftTarget
          b = d - shiftControl
          a = b - shiftTarget
        }
      } else {
        if (targetIsOne) {
          b = i
          a = b - shiftTarget
          c = a + shiftControl
          d = c + shiftTarget
        } else {
          a = i
          b = a + shiftTarget
          c = a + shiftControl
          d = c + shiftTarget
        }
      }

      memory[a] = true
      memory[b] = true
      memory[c] = true
      memory[d] = true

      pairs.push([
        {i: a, amplitude: this.amplitudes[a]},
        {i: b, amplitude: this.amplitudes[b]},
        {i: c, amplitude: this.amplitudes[c]},
        {i: d, amplitude: this.amplitudes[d]}
      ])
    }

    return pairs
  }

  // TODO: universal getPairs([offsets])
  // TODO: universal applyMatrix([offsets], matrix)

  /**
   * get probability of qubits[offset]
   */
  getQubitProbability(offset) {
    if (offset >= this.qubitRegsNum) throw `Error: invalid offset ${offset}`
    let probability0 = 0,
        probability1 = 0
    const shift = Math.pow(2, offset)
    for (let i = 0; i < this.amplitudes.length; i++) {
      const amplitude = this.amplitudes[i]
      if (math.equal(amplitude, 0)) continue
      const n = Math.floor(i / shift)
      const isOne = n % 2 === 1

      if (isOne) {
        probability1 += math.abs(math.pow(amplitude, 2))
      } else {
        probability0 += math.abs(math.pow(amplitude, 2))
      }
    }

    return [probability0, probability1]
  }

  /**
   * eg this.getQubitsProbability([0, 1], [0, 1])
   * get probability of qubit[0] = 0 and qubit[1] = 1
   */
  getQubitsProbability(offsets, targets) {
    let probability = 0
    for (let i = 0; i < this.amplitudes.length; i++) {
      const amplitude = this.amplitudes[i]
      if (math.equal(amplitude, 0)) continue

      let found = true
      for (let j = 0; j < offsets.length; j++) {
        const offset = offsets[j],
              target = targets[j]
        const shift = Math.pow(2, offset),
              n = Math.floor(i / shift)
        if (n % 2 !== target) {
          found = false
          break
        }
      }

      if (found) {
        probability += math.abs(math.pow(amplitude, 2))
      }
    }
    // console.log('getQubitsProbability:', offsets, targets, probability)
    return probability
  }

  /**
   * eg this.applySingleBitMatrix(0, [[1, 0], [0, 1]])
   *    apply identity matrix
   *
   */
  applySingleBitMatrix(offset, matrix) {
    const pairs = this.getSingleQubitPairs(offset)
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i]
      const a = pair[0].amplitude,
            b = pair[1].amplitude
      const r = math.multiply(matrix, math.matrix([[a], [b]]))
      this.amplitudes[pair[0].i] = r.subset(math.index(0, 0))
      this.amplitudes[pair[1].i] = r.subset(math.index(1, 0))
    }
  }

  applyTwoBitsMatrix(control, target, matrix) {
    const pairs = this.getTwoQubitsPairs(control, target)
    let entangled = null
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i]
      const a = pair[0].amplitude,
            b = pair[1].amplitude,
            c = pair[2].amplitude,
            d = pair[3].amplitude
      const r = math.multiply(matrix, math.matrix([[a], [b], [c], [d]]))
      this.amplitudes[pair[0].i] = r.subset(math.index(0, 0))
      this.amplitudes[pair[1].i] = r.subset(math.index(1, 0))
      this.amplitudes[pair[2].i] = r.subset(math.index(2, 0))
      this.amplitudes[pair[3].i] = r.subset(math.index(3, 0))

      if (entangled !== null) continue
      const a2 = math.pow(r.subset(math.index(0, 0)), 2),
            b2 = math.pow(r.subset(math.index(1, 0)), 2),
            c2 = math.pow(r.subset(math.index(2, 0)), 2),
            d2 = math.pow(r.subset(math.index(3, 0)), 2)

      // check entanglement
      // 00 01 10 11
      const pc_0 = math.add(a2, b2),
            pc_1 = math.add(c2, d2)
      const pt_0 = math.add(a2, c2),
            pt_1 = math.add(b2, d2)
      if (!(math.equal(pc_0 * pt_0, a2) &&
            math.equal(pc_0 * pt_1, b2) &&
            math.equal(pc_1 * pt_0, c2) &&
            math.equal(pc_1 * pt_1, d2))) {
        entangled = true

        this.twoBitsEntanglements[control] = target
        this.twoBitsEntanglements[target] = control
      } else {
        entangled = false

        delete this.twoBitsEntanglements[control]
        delete this.twoBitsEntanglements[target]
      }
    }

    // console.log('entangled: ', entangled)
  }

  applyAll(gate) {
    for (let i = 0; i < this.qubitRegsNum; i++) {
      this[gate](i)
    }
    return this
  }

  /**
   * Single bit gate
   */
  id(offset) { // identity matrix, do nothing
    if (offset === 'all') return this.applyAll('id')
    this.qasm.push(`id q[${offset}];`)
    // this.qubits[offset].applySingleBitMatrix(offset, [[1, 0], [0, 1]])
    return this
  }

  /**
   * Pauli X Gate
   * 𝛑-rotation around the X axis and has a property that
   * X -> X, Z -> -Z.
   * Also refered as a bit-flip
   */
  x(offset) { // not gate
    if (offset === 'all') return this.applyAll('x')
    this.qasm.push(`x q[${offset}];`)
    this.applySingleBitMatrix(offset, [[0, 1], [1, 0]])
    return this
  }
  not(offset) {
    return this.x(offset)
  }


  /**
   * Pauli Y Gate
   * 𝛑-rotation around the Y axis and has a property that
   * X -> -X, Z -> -Z.
   * This is both a bit-flip and a phase-flip, that satisfies Y = XZ.
   */
  y(offset) {
    if (offset === 'all') return this.applyAll('y')
    this.qasm.push(`y q[${offset}];`)
    this.applySingleBitMatrix(offset, [[0, math.complex(0, -1)], [math.complex(0, 1), 0]])
    return this
  }

  /**
   * Pauli Z Gate
   * 𝛑-rotation around the Z axis and has a property that
   * X -> -X, Z -> Z.
   * Also refered as a phase-flip
   */
  z(offset) {
    if (offset === 'all') return this.applyAll('z')
    this.qasm.push(`z q[${offset}];`)
    this.applySingleBitMatrix(offset, [[1, 0], [0, -1]])
    return this
  }

  /**
   * The Phase gate that is sqrt(S), which is a pi/4
   * rotation around Z axis. This gate is required for
   * universal control.
   */
  t(offset) {
    if (offset === 'all') return this.applyAll('t')
    this.qasm.push(`t q[${offset}];`)
    this.applySingleBitMatrix(offset, [[1, 0], [0, math.divide(math.complex(1, 1), math.sqrt(2))]])
    return this
  }

  /**
   * The Phase gate is the transposed
   * conjugate of T
   */
  tdg(offset) {
    if (offset === 'all') return this.applyAll('tdg')
    this.qasm.push(`tdg q[${offset}];`)
    this.applySingleBitMatrix(offset, [[1, 0], [0, math.divide(math.complex(1, -1), math.sqrt(2))]])
    return this
  }

  /**
   * Phase Gate
   * The Phase Gate is sqrt(Z) and has the property that
   * it maps X -> Y and Z -> Z. This gate extends H to
   * make complex superpositions.
   * [[1, 0], [0, i]]
   */
  s(offset) {
    if (offset === 'all') return this.applyAll('s')
    this.qasm.push(`s q[${offset}];`)
    this.applySingleBitMatrix(offset, [[1, 0], [0, math.complex(0, 1)]])
    return this
  }

  /**
   * The Phase Gate that is transposed conjugate of S and
   * has the property that it maps X -> -Y and Z -> Z.
   */
  sdg(offset) {
    if (offset === 'all') return this.applyAll('sdg')
    this.qasm.push(`sdg q[${offset}];`)
    this.applySingleBitMatrix(offset, [[1, 0], [0, math.complex(0, -1)]])
    return this
  }

  /**
   * Hadamard gate
   * 1/sqrt(2) [[1, 1], [1, -1]]
   *
   */
  h(offset) {
    if (offset === 'all') return this.applyAll('h')
    this.qasm.push(`h q[${offset}];`)
    const t = 1 / Math.sqrt(2)
    this.applySingleBitMatrix(offset, [[t, t], [t, -t]])
    return this
  }

  /**
   * CNot Gate
   * A two-qubit gate that flips the target qubit(i.e. applies Pauli X)
   * if control is in state 1. This gate is required to generate entanglement
   * and is the physical two qubit gate.
   * https://en.wikipedia.org/wiki/Controlled_NOT_gate
   */
  cnot(control, target) {
    /**
     * |ct>   c: control, t: target
     *
     * a|00> + b|01> + c|10> + d|11>
     * => transform into
     * a|00> + b|01> + c|11> + d|10>
     * where a^2 + b^2 + c^2 + d^2 = 1
     *
     */
    if (typeof(target) === 'undefined') throw('target has to be defined')
    this.qasm.push(`cx q[${control}],q[${target}];`)
    this.applyTwoBitsMatrix(control, target, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]])
    return this
  }

  cx(control, target) {
    return this.cnot(control, target)
  }

  /**
   *
   * Select the bit on this classical register where the measure will write its value.
   * @param {Number} q: qubit offset
   * @param {Number} c: classic bit offset. If undefined, then set to q
   */
  measure(q, c) {
    if (typeof(c) === 'undefined') c = q
    if (typeof(q) === 'undefined' || q === 'all') { // measure all
      for (let i = 0; i < this.qubitRegsNum; i++) {
        this.measure(i, i)
      }
      return this
    }
    this.qasm.push(`measure q[${q}] -> c[${c}];`)
    this.measures[c] = q
    return this
  }

  toBitString(num, bitsNum) {
    let output = ''
    for (let i = 0; i < bitsNum; i++) {
      if (num % 2 === 0) {
        output = '0' + output
      } else {
        output = '1' + output
      }
      num = Math.floor(num / 2)
    }
    return output
  }

  getResult() {
    // n = this.measures.length
    // there should be 2^(n)
    const output = [] // { bitString, probability }
    const n = this.measures.length

    let oneToOne = true
    for (let i = 0; i < this.measures.length; i++) {
      if (this.measures[i] !== i) {
        oneToOne = false
        break
      }
    }
    if (oneToOne) {
      const output = []
      for (let i = 0; i < this.amplitudes.length; i++) {
        output.push({bitString: this.toBitString(i, this.qubitRegsNum), probability: math.abs(math.pow(this.amplitudes[i], 2))})
      }
      this.result = output
                      .map((x)=> {return {bitString: x.bitString, probability: parseFloat(math.format(x.probability))}})
                      .filter((x)=> x.probability)
      return this.result
    }

    /**
     * @param  {[type]} offset        classical register offset.
     * @param  {[type]} bitString     [description]
     * @param  {[type]} probability   [description]
     * @param  {Object} [meausred={}] key is qubit offset, value is its state 0 | 1
     * @return {[type]}               nothing
     */
    const helper = (offset, bitString, probability, measured={})=> {
      if (math.equal(probability, 0)) return
      if (offset >= n) { // end
        return output.push({bitString, probability})
      }

      const qubitOffset = this.measures[offset]
      if (qubitOffset === null) { // not initialized
        return helper(offset + 1,
                      '0' + bitString,
                      probability,
                      measured)
      }

      if (qubitOffset.toString() in measured) { // already measured, so have same state.
        return helper(offset + 1,
                      measured[qubitOffset] + bitString,
                      probability,
                      measured)
      }

      // TODO entanglement
      const keys = Object.keys(measured)
      for (let i = 0; i < keys.length; i++) {
        if (this.twoBitsEntanglements[qubitOffset] == keys[i]) {
          // console.log('find entanglement: ', keys[i], qubitOffset)
          const pr = this.getQubitProbability(parseInt(keys[i]))
          helper(offset+1,
                '0'+bitString,
                math.multiply(
                  math.divide(probability, pr[0]), // restore probability
                  this.getQubitsProbability(
                    [qubitOffset, parseInt(keys[i])],
                    [0, measured[keys[i]]]
                )),
                Object.assign({}, measured, {[qubitOffset]: 0}))

          helper(offset+1,
                '1'+bitString,
                math.multiply(
                  math.divide(probability, pr[1]), // restore probability
                  this.getQubitsProbability(
                    [qubitOffset, parseInt(keys[i])],
                    [1, measured[keys[i]]]
                )),
                Object.assign({}, measured, {[qubitOffset]: 1}))
          return
        }
      }


      const pr = this.getQubitProbability(this.measures[offset])

      helper(offset+1,
            '0'+bitString,
            math.multiply(
              probability,
              pr[0]),
              Object.assign({}, measured, {[qubitOffset]: 0}))

      helper(offset+1,
            '1'+bitString,
            math.multiply(
              probability,
              pr[1]),
              Object.assign({}, measured, {[qubitOffset]: 1}))
    }

    helper(0, '', 1, {})
    this.result = output
                    .map((x)=> {return {bitString: x.bitString, probability: parseFloat(math.format(x.probability))}})
                    .filter((x)=> x.probability)
    return this.result
  }

  executeQASM(c) {
    throw "Sorry, this function is not implemented yet."
    // need to write an interpreter here
    const code = c.split('\n').filter(x => x.length > 0)
  }

  toQASM() {
    return this.qasm.join('\n').trim()
  }
}

if (typeof(window) !== 'undefined') {
  window.QuantumComputing = QuantumComputing
  window.math = math
}

if (typeof(module) !== 'undefined') {
  module.exports = {QuantumComputing, math}
}