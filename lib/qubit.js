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
    }
  }

  applyAll(gate) {
    for (let i = 0; i < this.qubits.length; i++) {
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
    if (typeof(target) === 'undefined') throw('target is not defined')
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
  }

  getResult() {
    // n = this.measures.length
    // there should be 2^(n)
    const output = [] // { bitString, probability }
    const n = this.measures.length
    const helper = (offset, bitString, probability)=> {
      if (math.equal(probability, 0)) return
      if (offset >= n) { // end
        return output.push({bitString, probability})
      }

      const pr = this.getQubitProbability(this.measures[offset])

      helper(offset+1,
            '0'+bitString,
            math.multiply(
              probability,
              pr[0]))

      helper(offset+1,
            '1'+bitString,
            math.multiply(
              probability,
              pr[1]))
    }

    helper(0, '', 1)
    this.result = output
                    .sort((a, b)=> {parseInt(b) - parseInt(a)})
                    .map((x)=> {return {bitString: x.bitString, probability: parseFloat(math.format(x.probability))}})
                    .filter((x)=> x.probability)
    return this.result
  }

  executeQASM(code) {
    // need to write an interpreter here
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