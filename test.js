const QuantumComputing = require('./lib/qubit.js')
const math = require('mathjs')

const qc = new QuantumComputing(1, 1)
qc
  .boot(2)
  .h(0)
  .s(1)
  .measure()

qc.print()