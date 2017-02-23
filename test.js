const QuantumComputing = require('./lib/qubit.js')

const qc = new QuantumComputing(1, 1)
qc
  .boot(1)
  .h(0)
  .measure(0)
  .print()