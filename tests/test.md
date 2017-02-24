# Test of qubit.js library  
power by [markdown-preview-enhanced](https://github.com/shd101wyy/markdown-preview-enhanced) code chunk.  

* Is entanglement transitive?
* What is the meaning of `measure` function?  
* What does `barrier` do?

```{javascript cmd:"true", id:"izhslyj4"}
const {QuantumComputing} = require('../lib/qubit.js')
const qc = new QuantumComputing()
```

**[The Quamtum bit (qubit)](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=71972f437b08e12d1f465a8857f4514c&pageIndex=1)**  
```{javascript cmd:"node", continue:'izhslyj4', id:"izhsmuw6"}
qc
  .boot(1)   // create 1 qubit register
  .measure() // measure all qubits  

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '0', probability: 1 } ]
```
From the result we can see that the qubit is initially at state `|0⟩`

**[Excited State and Pauli Operators](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=71972f437b08e12d1f465a8857f4514c&pageIndex=2)**  
```{javascript cmd:"node", continue:'izhslyj4', id:"izhsvslj"}
// X Gate  
qc
  .boot(1)
  .x(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '1', probability: 1 } ]
```

```{javascript cmd:"node", continue:'izhslyj4', id:"izhsz1hx"}
// Y Gate  
qc
  .boot(1)
  .y(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '1', probability: 1 } ]
```

```{javascript cmd:"node", continue:'izhslyj4', id:"izhsz1i1"}
// Z Gate  
qc
  .boot(1)
  .z(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '0', probability: 1 } ]
```

**[Superposition](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=71972f437b08e12d1f465a8857f4514c&pageIndex=3)**  

**Superposition (+) Z-Measurement**
```{javascript cmd:"node", continue:'izhslyj4', id:"izhti05x"}
qc
  .boot(1)
  .h(0)  // hadamard gate
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '0', probability: 0.4999999999999999 },
{ bitString: '1', probability: 0.4999999999999999 } ]
 */
```


**Superposition (-) Z-Measurement**
```{javascript cmd:"node", continue:'izhslyj4', id:"izhtknti"}
qc
  .boot(1)
  .h(0)  // hadamard gate
  .z(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '0', probability: 0.4999999999999999 },
{ bitString: '1', probability: 0.4999999999999999 } ]
 */
```

**Superposition (+) X-Measurement**
```{javascript cmd:"node", continue:'izhslyj4', id:"izhtmswy"}
qc
  .boot(1)
  .h(0)  // hadamard gate
  .h(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '0', probability: 0.9999999999999996 } ]
 */
```

**Superposition (-) X-Measurement**
```{javascript cmd:"node", continue:'izhslyj4', id:"izhtnzph"}
qc
  .boot(1)
  .h(0)  // hadamard gate
  .z(0)
  .h(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '1', probability: 0.9999999999999996 } ]
```

**Superposition (+i) Y-Measurement**
```{javascript cmd:"node", continue:'izhslyj4', id:"izhtpvz8"}
qc
  .boot(1)
  .h(0)
  .s(0)
  .sdg(0)
  .h(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '0', probability: 0.9999999999999996 } ]
```

**Superposition (-i) Y-Measurement**
```{javascript cmd:"node", continue:'izhslyj4', id:"izhtrn9b"}
qc
  .boot(1)
  .h(0)
  .sdg(0)
  .sdg(0)
  .h(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '1', probability: 0.9999999999999996 } ]
```

**[Multiple Qubits](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=050edf961d485bfcd9962933ea09062b&pageIndex=1)**  

**A Random Classical Circuit**
```{javascript cmd:"node", continue:'izhslyj4', id:"izhtw5rs"}
qc
  .boot(5)
  .x(0)
  .x(2)
  .x(4)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '10101', probability: 1 } ]
```

**CNOT (input 00)**
```{javascript cmd:"node", continue:'izhslyj4', id:"cnot-00"}
qc
  .boot(2)
  .cnot(0, 1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '00', probability: 1 } ]
```

**CNOT (input 01)**
```{javascript cmd:"node", continue:'izhslyj4', id:"cnot-01"}
qc
  .boot(2)
  .x(1)
  .cnot(0, 1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '10', probability: 1 } ]
```

**CNOT (input 10)**
```{javascript cmd:"node", continue:'izhslyj4', id:"cnot-10"}
qc
  .boot(2)
  .x(0)
  .cnot(0, 1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '11', probability: 1 } ]
```

**CNOT (input 11)**
```{javascript cmd:"node", continue:'izhslyj4', id:"cnot-11"}
qc
  .boot(2)
  .x(0)
  .x(1)
  .cnot(0, 1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
// [ { bitString: '01', probability: 1 } ]
```

**5Q Complete Superposition Circuit**
```{javascript cmd:"node", continue:'izhslyj4', id:"5q-csc"}
qc
  .boot(5)
  .h('all')
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '00000', probability: 0.03124999999999993 },
{ bitString: '11111', probability: 0.03124999999999993 },
{ bitString: '01000', probability: 0.03124999999999993 },
{ bitString: '11000', probability: 0.03124999999999993 },
{ bitString: '00100', probability: 0.03124999999999993 },
{ bitString: '10100', probability: 0.03124999999999993 },
{ bitString: '01100', probability: 0.03124999999999993 },
{ bitString: '11100', probability: 0.03124999999999993 },
{ bitString: '00010', probability: 0.03124999999999993 },
{ bitString: '10010', probability: 0.03124999999999993 },
{ bitString: '01010', probability: 0.03124999999999993 },
{ bitString: '11010', probability: 0.03124999999999993 },
{ bitString: '00110', probability: 0.03124999999999993 },
{ bitString: '10110', probability: 0.03124999999999993 },
{ bitString: '01110', probability: 0.03124999999999993 },
{ bitString: '11110', probability: 0.03124999999999993 },
{ bitString: '10000', probability: 0.03124999999999993 },
{ bitString: '10001', probability: 0.03124999999999993 },
{ bitString: '01001', probability: 0.03124999999999993 },
{ bitString: '11001', probability: 0.03124999999999993 },
{ bitString: '00101', probability: 0.03124999999999993 },
{ bitString: '10101', probability: 0.03124999999999993 },
{ bitString: '01101', probability: 0.03124999999999993 },
{ bitString: '11101', probability: 0.03124999999999993 },
{ bitString: '00011', probability: 0.03124999999999993 },
{ bitString: '10011', probability: 0.03124999999999993 },
{ bitString: '01011', probability: 0.03124999999999993 },
{ bitString: '11011', probability: 0.03124999999999993 },
{ bitString: '00111', probability: 0.03124999999999993 },
{ bitString: '10111', probability: 0.03124999999999993 },
{ bitString: '01111', probability: 0.03124999999999993 },
{ bitString: '00001', probability: 0.03124999999999993 } ]
 */
```

**[Non-Clifford Gates](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=050edf961d485bfcd9962933ea09062b&pageIndex=2)**  

**Red State**
```{javascript cmd:"node", continue:'izhslyj4', id:"red-state"}
qc
  .boot(1)
  .h(0)
  .t(0)
  .h(0)
  .t(0)
  .s(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '0', probability: 0.8535533905932734 },
{ bitString: '1', probability: 0.14644660940672613 } ]
 */
```

**Green State**
```{javascript cmd:"node", continue:'izhslyj4', id:"green-state"}
qc
  .boot(1)
  .h(0)
  .t(0)
  .h(0)
  .t(0)
  .s(0)
  .h(0)
  .t(0)
  .h(0)
  .t(0)
  .h(0)
  .t(0)
  .h(0)
  .s(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '0', probability: 0.8901650429449539 },
{ bitString: '1', probability: 0.10983495705504456 } ]
 */
```

**Blue State**
```{javascript cmd:"node", continue:'izhslyj4', id:"blue-state"}
qc
  .boot(1)
  .h(0)
  .t(0)
  .h(0)
  .t(0)
  .s(0)
  .h(0)
  .t(0)
  .h(0)
  .t(0)
  .h(0)
  .t(0)
  .s(0)
  .h(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '0', probability: 0.28661165235168123 },
{ bitString: '1', probability: 0.7133883476483173 } ]
 */
```

**[Entanglement and Bell Tests](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=050edf961d485bfcd9962933ea09062b&pageIndex=3)**  
**Bell State ZZ-Measurement**  
```{javascript cmd:"node", continue:"izhslyj4", id:"zz"}
qc
  .boot(2)
  .h(0)
  .cnot(0, 1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '00', probability: 0.4999999999999999 },
{ bitString: '11', probability: 0.4999999999999999 } ]
 */
```

**Bell State ZW-Measurement**  
```{javascript cmd:"node", continue:"izhslyj4", id:"zw"}
qc
  .boot(2)
  .h(0)
  .cnot(0, 1)
  .s(1)
  .h(1)
  .t(1)
  .h(1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '00', probability: 0.4267766952966367 },
{ bitString: '01', probability: 0.07322330470336309 },
{ bitString: '10', probability: 0.07322330470336309 },
{ bitString: '11', probability: 0.4267766952966367 } ]
 */
```

**Bell State ZV-Measurement**  
```{javascript cmd:"node", continue:"izhslyj4", id:"zv"}
qc
  .boot(2)
  .h(0)
  .cnot(0, 1)
  .s(1)
  .h(1)
  .tdg(1)
  .h(1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '00', probability: 0.4267766952966367 },
{ bitString: '01', probability: 0.07322330470336309 },
{ bitString: '10', probability: 0.07322330470336309 },
{ bitString: '11', probability: 0.4267766952966367 } ]
*/
```

**Bell State XW-Measurement**  
```{javascript cmd:"node", continue:"izhslyj4", id:"xw"}
qc
  .boot(2)
  .h(0)
  .cnot(0, 1)
  .h(0)
  .s(1)
  .h(1)
  .t(1)
  .h(1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '00', probability: 0.4267766952966366 },
{ bitString: '01', probability: 0.07322330470336307 },
{ bitString: '10', probability: 0.07322330470336307 },
{ bitString: '11', probability: 0.4267766952966366 } ]
 */
```

**Bell State XV-Measurement**  
```{javascript cmd:"node", continue:"izhslyj4", id:"xv"}
qc
  .boot(2)
  .h(0)
  .cnot(0, 1)
  .h(0)
  .s(1)
  .h(1)
  .tdg(1)
  .h(1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '00', probability: 0.07322330470336307 },
{ bitString: '01', probability: 0.4267766952966366 },
{ bitString: '10', probability: 0.4267766952966366 },
{ bitString: '11', probability: 0.07322330470336307 } ]
 */
```

**[GHZ States](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=050edf961d485bfcd9962933ea09062b&pageIndex=4)**  
**3Q GHZ State**  
```{javascript cmd:"node", continue:"izhslyj4", id:"3q-ghz-gate"}
qc
  .boot(3)
  .h(0)
  .h(1)
  .x(2)
  .cnot(1, 2)
  .cnot(0, 2)
  .h('all')
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '000', probability: 0.4999999999999996 },
{ bitString: '111', probability: 0.4999999999999996 } ]
 */
```

```{javascript cmd:"node", continue:"izhslyj4", id:"3q-ghz-yyx-gate"}
qc
  .boot(3)
  .h(0)
  .h(1)
  .x(2)
  .cnot(1, 2)
  .cnot(0, 2)
  .h('all')
  .barrier([0, 1, 2])
  .sdg(0)
  .sdg(1)
  .h('all')
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '000', probability: 0.4999999999999996 },
{ bitString: '111', probability: 0.4999999999999996 } ]
 */
```


```{javascript cmd:"node", continue:"izhslyj4", id:"3q-ghz-yxy-gate"}
qc
  .boot(3)
  .h(0)
  .h(1)
  .x(2)
  .cnot(1, 2)
  .cnot(0, 2)
  .h('all')
  .barrier([0, 1, 2])
  .sdg(0)
  .sdg(2)
  .h('all')
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '000', probability: 0.24999999999999967 },
{ bitString: '011', probability: 0.24999999999999967 },
{ bitString: '101', probability: 0.24999999999999967 },
{ bitString: '110', probability: 0.24999999999999967 } ]
 */
```

```{javascript cmd:"node", continue:"izhslyj4", id:"3q-ghz-xyy-gate"}
qc
  .boot(3)
  .h(0)
  .h(1)
  .x(2)
  .cnot(1, 2)
  .cnot(0, 2)
  .h('all')
  .barrier([0, 1, 2])
  .sdg(1)
  .sdg(2)
  .h('all')
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '000', probability: 0.24999999999999967 },
{ bitString: '011', probability: 0.24999999999999967 },
{ bitString: '101', probability: 0.24999999999999967 },
{ bitString: '110', probability: 0.24999999999999967 } ]
 */
```

```{javascript cmd:"node", continue:"izhslyj4", id:"3q-ghz-xxx-gate"}
qc
  .boot(3)
  .h(0)
  .h(1)
  .x(2)
  .cnot(1, 2)
  .cnot(0, 2)
  .h('all')
  .barrier([0, 1, 2])
  .h('all')
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '001', probability: 0.24999999999999967 },
{ bitString: '010', probability: 0.24999999999999967 },
{ bitString: '100', probability: 0.24999999999999967 },
{ bitString: '111', probability: 0.24999999999999967 } ]
 */
```

**[Shor's algorithm](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=8443c4f713521c10b1a56a533958286b&pageIndex=6)**  

**Multi7x4Mod15**

```{javascript cmd:"node", continue:"izhslyj4", id:"Multi7x4Mod15"}
qc
  .boot(4)
  .x(1)
  .x('all')
  .cnot(2, 1)
  .cnot(1, 2)
  .cnot(2, 1)
  .cnot(1, 0)
  .cnot(0, 1)
  .cnot(1, 0)
  .cnot(3, 0)
  .cnot(0, 3)
  .cnot(3, 0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
/*
[ { bitString: '1011', probability: 1 } ]
 */
```