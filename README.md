# qubit.js
A simple quantum computing circuit simulator (working in progress)  
**Not Finished yet!**

## Install  
**node.js**  
```sh  
npm install qubit.js
```  

**browser**  
```html  
<script src="qubit.min.js"></script>
```

## Build  
```sh
npm install  
./build.sh
```

## Usages  
```javascript  
const {QuantumComputing} = require('./lib/qubit.js')
const qc = new QuantumComputing()
qc
  .boot(1)   // create one qubit register
  .x(0)      // apply Pauli X Gate to qubit[0]
  .measure() // measure all

console.log(qc.toQASM())    // convert to QASM code  
console.log(qc.getResult()) // print probabilities  
```

## API  
* **boot(qubitRegsNum, classicRegNum=qubitRegsNum)** init quantum computing circuit.  
* **applySingleBitMatrix(offset, matrix)** apply matrix to qubits[offset].  
* **applyTwoBitsMatrix(control, target, matrix)** apply matrix to qubits[control] and qubits[target].    
* **id(offset || 'all')** apply Identity Gate to qubits[offset] or all qubits.       
* **x(offset || 'all')** apply Pauli X Gate to qubits[offset] or all qubits.  
* **y(offset || 'all')** apply Pauli Y Gate to qubits[offset] or all qubits.  
* **z(offset || 'all')** apply Pauli Z Gate to qubits[offset] or all qubits.  
* **s(offset || 'all')** apply Phase Gate to qubits[offset] or all qubits.  
* **sdg(offset || 'all')** apply Phase Gate to qubits[offset] or all qubits.  
* **t(offset || 'all')** apply Phase Gate to qubits[offset] or all qubits.  
* **tdg(offset || 'all')** apply Phase Gate to qubits[offset] or all qubits.  
* **h(offset || 'all')** apply Hadamard Gate to qubits[offset] or all qubits.    
* **cnot(control, target)** apply Controlled Gate to qubits[control] and qubits[target].
* **cx(control, target)** apply Controlled Gate to qubits[control] and qubits[target].
* **barrier(offsets=[] || 'all')** the barrier prevents transformations accross this source line.
* **measure(q || 'all', c)** measure qubits[q] to classicReg[c] or measure one-to-one.   
* **getResult()** get result after measurement.    
* **toQASM()** convert to `QASM 2.0` code.  
* **executeQASM(code)** execute `QASM 2.0 code`.  

For more information, read [qubit.js source code](./lib/qubit.js).

## References
[A bunch of materials](http://www.vcpc.univie.ac.at/~ian/hotlist/qc/intro.shtml)  
[A gentle introduction to quantum computing](http://physlab.org/wp-content/uploads/2016/03/Abdullah-Khalid.pdf)  
[An introduction to quantum computing](https://www2.warwick.ac.uk/fac/sci/physics/research/cfsa/people/pastmembers/charemzam/pastprojects/mcharemza_quant_comp.pdf) (<- this one is very nice)    

## Other similar projects on Github
[jsqubits](https://github.com/davidbkemp/jsqubits)  
[qubitjs](https://github.com/krohling/qubitjs)  
[QuantumComputing](https://github.com/corbett/QuantumComputing)  
[Quirk](https://github.com/Strilanc/Quirk)    
[quantumjs](https://github.com/lsjcp/quantumjs)  
[quantumpy](https://github.com/jtauber/quantumpy)
