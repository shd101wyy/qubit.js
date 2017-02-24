# Test of qubit.js library  
power by [markdown-preview-enhanced](https://github.com/shd101wyy/markdown-preview-enhanced ) code chunk.  

```true
const {QuantumComputing} = require('../lib/qubit.js')
const qc = new QuantumComputing()
```
```

```


**[The Quamtum bit (qubit)](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=71972f437b08e12d1f465a8857f4514c&pageIndex=1 )**  
```node
qc
  .boot(1)   // create 1 qubit register
  .measure() // measure all qubits  

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
==================  QASM  ==================
qreg q[1];
creg c[1];

measure q[0] -> c[0];

================== Result ==================
[ { bitString: '0', probability: 1 } ]
```

From the result we can see that the qubit is initially at state `|0⟩`

**[Excited State and Pauli Operators](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=71972f437b08e12d1f465a8857f4514c&pageIndex=2 )**  
```node
// X Gate  
qc
  .boot(1)
  .x(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/vu7ey924a_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


```node
// Y Gate  
qc
  .boot(1)
  .y(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/bncxk1vsl_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


```node
// Z Gate  
qc
  .boot(1)
  .z(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/wavxwpb3d_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**[Superposition](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=71972f437b08e12d1f465a8857f4514c&pageIndex=3 )**  

**Superposition (+) Z-Measurement**
```node
qc
  .boot(1)
  .h(0)  // hadamard gate
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/2yc5j81ar_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```



**Superposition (-) Z-Measurement**
```node
qc
  .boot(1)
  .h(0)  // hadamard gate
  .z(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/iiz3ule0p_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**Superposition (+) X-Measurement**
```node
qc
  .boot(1)
  .h(0)  // hadamard gate
  .h(0)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/tf1s62h2h_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**Superposition (-) X-Measurement**
```node
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
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/elz66x4mf_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**Superposition (+i) Y-Measurement**
```node
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
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/onsc9lfb6_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**Superposition (-i) Y-Measurement**
```node
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
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/ynoeatz90_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**[Multiple Qubits](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=050edf961d485bfcd9962933ea09062b&pageIndex=1 )**  

**A Random Classical Circuit**
```node
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
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/sq48awyf9_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**CNOT (input 00)**
```node
qc
  .boot(2)
  .cnot(0, 1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/bdke03jq9_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**CNOT (input 01)**
```node
qc
  .boot(2)
  .x(1)
  .cnot(0, 1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/8ktu06ejd_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**CNOT (input 10)**
```node
qc
  .boot(2)
  .x(0)
  .cnot(0, 1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/1rn01pt1u_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**CNOT (input 11)**
```node
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
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/qgu0tdpyg_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**5Q Complete Superposition Circuit**
```node
qc
  .boot(5)
  .h('all')
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/equbcfuih_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**[Non-Clifford Gates](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=050edf961d485bfcd9962933ea09062b&pageIndex=2 )**  

**Red State**
```node
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
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/th5m5d5o7_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**Green State**
```node
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
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/599nzlj0t_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**Blue State**
```node
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
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/02qkm7arf_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```


**[Entanglement and Bell Tests](https://quantumexperience.ng.bluemix.net/qstage/#/tutorial?sectionId=050edf961d485bfcd9962933ea09062b&pageIndex=3 )**  
**Bell State ZZ-Measurement**  
```node
qc
  .boot(2)
  .h(0)
  .cnot(0, 1)
  .measure()

console.log('\n==================  QASM  ==================')
console.log(qc.toQASM())
console.log('\n================== Result ==================')
console.log(qc.getResult())
```
```
/Users/wangyiyi/百度云同步盘/Github/qubit.js/tests/r1iqnduy2_code_chunk:3
const {QuantumComputing} = require('../lib/qubit.js')
                                                    ^
SyntaxError: Identifier 'QuantumComputing' has already been declared
    at Object.exports.runInThisContext (vm.js:76:16)
    at Module._compile (module.js:528:28)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```
