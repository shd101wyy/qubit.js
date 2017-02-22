const math = require('mathjs')

/*
class Num {
  constructor(real, complex) {
    this.real = real
    this.complex = complex
  }

  add(n) {
    return new Num(this.real + n.real, this.complex + n.complex)
  }

  minus(n) {
    return new Num(this.real - n.real, this.complex - n.complex)
  }

  multiply(n) {

  }

  toString() {
    if (this.complex === 0) {
      return this.real.toString()
    } else if (this.real === 0) {
      return `${this.complex}i`
    } else if (this.complex > 0)
      return `${this.real}+${this.complex}i`
    } else {
      return `${this.real}-${this.complex}i`
    }
  }
}
*/

class Qubit {
  constructor() {
    // a|0> + b|0>
    this.a = 1 // ground state at start
    this.b = 0
  }

  /**
   * @param {Matrix} A: a 2x2 matrix
   */
  multiply(A) { // Ax
    const r = A.multiply(new Matrix([[this.a], [this.b]]))
    this.a = r.subset(math.index(0, 0))
    this.b = r.subset(math.index(1, 0))
  }
}

class QuantumComputing {
  constructor() {
    this.reboot()
  }

  boot(qubitRegsNum, classicRegNum) {
    if (typeof(classicRegNum) === 'undefined') classicRegNum = qubitRegsNum
    this.qasm.push(`qreg q[${qubitRegsNum}]`)
    this.qasm.push(`creg c[${classicRegNum}]`)

    this.qubits = []
    for (let i = 0; i < qubitRegsNum; i++) {
      this.qubits.push(new Qubit())
    }

    this.bits = []
    for (let i = 0; i < classicRegNum; i++) {
      // TODO
    }
  }

  reboot() {
    this.qubits = [] // qubits
    this.bits = []   // classic bits

    this.qasm = []
  }

  /**
   * Single bit gate
   */

  id(offset) { // identity matrix, do nothing
    this.qasm.push(`id q[${offset}];`)
    // this.qubits[offset].multiply([[1, 0], [0, 1]])
    return this
  }

  /**
   * Pauli X Gate
   * 𝛑-rotation around the X axis and has a property that
   * X -> X, Z -> -Z.
   * Also refered as a bit-flip
   */
  x(offset) { // not gate
    this.qasm.push(`x q[${offset}];`)
    this.qubits[offset].multiply( math.matrix([[0, 1], [1, 0]]) )
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
    this.qasm.push(`y q[${offset}];`)
    this.qubits[offset].multiply( math.matrix([[0, math.complex(0, -1)], [math.complex(0, 1), 0]]) )
    return this
  }

  /**
   * Pauli Z Gate
   * 𝛑-rotation around the Z axis and has a property that
   * X -> -X, Z -> Z.
   * Also refered as a phase-flip
   */
  z(offset) {
    this.qasm.push(`z q[${offset}];`)
    this.qubits[offset].multiply( math.matrix([[1, 0], [0, -1]]) )
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
    this.qasm.push(`s q[${offset}];`)
    this.qubits[offset].multiply( math.matrix([[1, 0], [0, math.complex(0, 1)]]) )
    return this
  }

  /**
   * The Phase Gate that is transposed conjugate of S and
   * has the property that it maps X -> -Y and Z -> Z.
   */
  sdg(offset) {
    this.qasm.push(`sdg q[${offset}];`)
    this.qubits[offset].multiply( math.matrix([[1, 0], [0, math.complex(0, -1)]]) )
    return this
  }

  /**
   * Hadamard gate
   * 1/sqrt(2) [[1, 1], [1, -1]]
   *
   */
  h(offset) {
    this.qasm.push(`h q[${offset}];`)
    const t = 1 / Math.sqrt(2)
    this.qubits[offset].multiply( math.matrix([[t, t], [t, -t]]) )
    return this
  }

  /**
   * CNot Gate
   * A two-qubit gate that flips the target qubit(i.e. applies Pauli X)
   * if control is in state 1. This gate is required to generate entanglement
   * and is the physical two qubit gate.
   */
  cnot(control, target) {
  }
  cx(control, target) {
    return this.cnot(control, target)
  }

  /**
   * @param {Number} q: qubit offset
   * @param {Number} c: classic bit offset. If undefined, then set to q
   */
  measure(q, c) {
    if (typeof(c) === 'undefined') c = q

  }

  executeQASM() {
    // need to write an interpreter here
  }

  toQASM() {
    return this.qasm.join('\n').trim()
  }
}

module.exports = QuantumComputing