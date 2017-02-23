# IDEA

[QASM](https://www.media.mit.edu/quanta/qasm2circ/)  

```javascript
const QuantumComputing = require('qubit.js')  
const qc = QuantumComputing()

qc
  .boot(2, 2) // clear everything and init 2 qubits and 2 classic bits
  .h(0)
  .h(1)
  .cnot(0, 1)
  .measure(0, 0)
  .measure(1, 1)

qc
  .print()  // print probability

qc
  .toQASM() // convert to qasm

qc
  .boot(2, 2) // clear everything and reboot

qc.executeQASM(`
  qreg q[2]
  creg c[2]

  h q[0];
  h q[1];
  x q[2];
  cx q[1], q[2];
  cx q[0], q[2];
  h q[0];
  h q[1];
  h q[2];
`)

const q = qubit.createArray(5)
q[0].h()

```