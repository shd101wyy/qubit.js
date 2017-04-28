---
presentation:
  enableSpeakerNotes: true
---

<!-- slide -->
# [qubit.js](https://github.com/shd101wyy/qubit.js)  
A very <strike>silly</strike> simple quantum computing circuit simulator.  
(the implementation could be wrong though)   
By Yiyi Wang

```{javascript id:"j223kur3", require:["../dist/qubit.min.js"], hide:true}

```

<!-- slide vertical:true -->
## Example
```javascript
const {QuantumComputing} = require('qubit.js')

const qc = new QuantumComputing()

qc
  .boot(3)   // simulate 3 qubits
  .x(0)      // apply Pauli X Gate (Not Gate) to qubit[0]
  .measure() // measure all

console.log(qc.toQASM())    // convert to QASM code  
console.log(qc.getResult()) // print probabilities  
```

<!-- slide vertical:true -->
<img src="http://i.imgur.com/AIEBx3T.png">

<!-- slide vertical:true -->
# 3 Qubtis
8 possible quantum states  

|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 1 | 0  | 0 | 0 | 0 | 0 | 0 | 0 |

<!-- slide vertical:true -->
# 3 Qubtis
8 possible quantum states  

|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 1 | 0  | 0 | 0 | 0 | 0 | 0 | 0 |


```javascript
qc
  .boot(3)

// =>
amplitudes = [1, 0, 0, 0, 0, 0, 0, 0]
```

<!-- slide vertical:true -->
# Pauli X Gate (Not Gate)
It is a $unary\ quantum\ gate$  
matrix:
$$
X = \begin{bmatrix}
  0 & 1 \\
  1 & 0
\end{bmatrix}
$$


<!-- slide vertical:true -->
|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 1 | 0  | 0 | 0 | 0 | 0 | 0 | 0 |

```javascript
qc
  .boot(2)
  .x(0)

amplitudes = [1, 0, 0, 0, 0, 0, 0, 0]
// =>
// what should the amplitudes be ?
```

<!-- slide vertical:true -->
We are applying the matrix to a single qubit **q[0]**...  
|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 1 | 0  | 0 | 0 | 0 | 0 | 0 | 0 |
So we found all possible pairs.  

$\alpha|0\rangle + \beta|1\rangle$  

* $|00\color{red}{0}\rangle$ and $|00\color{red}{1}\rangle$
* $|01\color{red}{0}\rangle$ and $|01\color{red}{1}\rangle$
* $|10\color{red}{0}\rangle$ and $|10\color{red}{1}\rangle$
* $|11\color{red}{0}\rangle$ and $|11\color{red}{1}\rangle$

<!-- slide vertical:true -->
|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 1 | 0  | 0 | 0 | 0 | 0 | 0 | 0 |
For the pair:  
* $|00\color{red}{0}\rangle$ and $|00\color{red}{1}\rangle$  
We have amplitudes $\alpha = 1$ and $\beta = 0$   
Therefore
$$
\begin{bmatrix}
\alpha' \\ \beta' \end{bmatrix}
= X
\begin{bmatrix}
\alpha \\
\beta
\end{bmatrix}
= \begin{bmatrix}
  0 & 1 \\
  1 & 0
\end{bmatrix}
\begin{bmatrix} 1 \\ 0 \end{bmatrix} =
\begin{bmatrix} 0 \\ 1 \end{bmatrix}
$$

<!-- slide vertical:true -->
|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 0 | 1  | 0 | 0 | 0 | 0 | 0 | 0 |

```javascript
qc
  .boot(2)
  .x(0)

amplitudes = [1, 0, 0, 0, 0, 0, 0, 0]
// =>
amplitudes = [0, 1, 0, 0, 0, 0, 0, 0]
```

<!-- slide vertical: true -->
# Measure
|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 0 | 1  | 0 | 0 | 0 | 0 | 0 | 0 |

```javascript
qc
  .boot(2)
  .x(0)
  .measure() // one qubit register to one classic register

amplitudes = [1, 0, 0, 0, 0, 0, 0, 0]
// =>
amplitudes = [0, 1, 0, 0, 0, 0, 0, 0]
```
$\because probability\ =\ amplitude ^ 2$  
$\therefore p(|001\rangle) = 1^2 = 1$

<!-- slide vertical: true -->
![Screen Shot 2017-04-21 at 1.00.40 AM](http://i.imgur.com/ZHfLNfY.png)

<!-- slide vertical: true -->
# Another example  
```javascript
qc
  .boot(3)   // simulate 3 qubits
  .x(0)      // apply Pauli X Gate (Not Gate) to qubit[0]
  .cnot(0, 1) // apply Controlled Not (CNot Gate)
              // q[0] is control, q[1] is target.
  .measure()
```

<!-- slide vertical:true -->  
![Screen Shot 2017-04-28 at 11.52.19 AM](http://i.imgur.com/i5GjhYE.png)


<!-- slide vertical:true -->
## After applying Pauli X Gate to q[0]
|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 0 | 1  | 0 | 0 | 0 | 0 | 0 | 0 |

```javascript
qc
  .boot(2)
  .x(0)
  .cnot(0, 1) // q[0] is control, q[1] is target

amplitudes = [1, 0, 0, 0, 0, 0, 0, 0]
// =>
amplitudes = [0, 1, 0, 0, 0, 0, 0, 0]
// =>
// what should the amplitudes be ?
```

<!-- slide vertical: true -->
# Recall the Controlled Gate
## (CNot Gate)  
it is a Binary Quantum Gate that operates on two qubits

$$CNOT = \begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{bmatrix}$$   
transforms the quantum state: ($|control, target \rangle$)  
$a|00\rangle + b|01\rangle + c|10\rangle + d|11\rangle$   
into:  
$a|00\rangle + b|01\rangle + c|11\rangle + d|10\rangle$   

<!-- slide vertical: true -->
We are applying the matrix to a two qubits (control) **q[0]** and (target) **q[1]**...  
|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 0 | 1  | 0 | 0 | 0 | 0 | 0 | 0 |  

$|control, target \rangle$  
$a|00\rangle + b|01\rangle + c|10\rangle + d|11\rangle$   
So we found all possible pairs
* $|0\color{red}{00}\rangle$ and $|0\color{red}{01}\rangle$ and $|0\color{red}{10}\rangle$ and $|0\color{red}{11}\rangle$
* $|1\color{red}{00}\rangle$ and $|1\color{red}{01}\rangle$ and $|1\color{red}{10}\rangle$ and $|1\color{red}{11}\rangle$

<!-- slide vertical: true -->
For the pair:
* $|0\color{red}{00}\rangle$ and $|0\color{red}{01}\rangle$ and $|0\color{red}{10}\rangle$ and $|0\color{red}{11}\rangle$  
$ \because |control, target \rangle$ and $q[0]$ is control, $q[1]$ is target.   
$ \therefore a|0\color{red}{00}\rangle + b|0\color{red}{10}\rangle + c|0\color{red}{01}\rangle + d|0\color{red}{11}\rangle$  

We have $a = 0$, $b = 0$, $c = 1$, $d = 0$
$$\therefore
\begin{bmatrix}
a' \\ b' \\ c' \\ d'
\end{bmatrix} = CNOT \begin{bmatrix} a \\ b \\ c \\ d \end{bmatrix} =
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{bmatrix}
\begin{bmatrix}0\\0\\1\\0\end{bmatrix} =
\begin{bmatrix} 0 \\ 0 \\ 0 \\ 1  \end{bmatrix}
$$

<!-- slide vertical:true -->
|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 0 | 0  | 0 | 1 | 0 | 0 | 0 | 0 |

```javascript
qc
  .boot(2)
  .x(0)
  .cnot(0, 1) // q[0] is control, q[1] is target

amplitudes = [1, 0, 0, 0, 0, 0, 0, 0]
// =>
amplitudes = [0, 1, 0, 0, 0, 0, 0, 0]
// =>
amplitudes = [0, 0, 0, 1, 0, 0, 0, 0]
```

<!-- slide vertical: true -->
# Measure
|q[2]q[1]q[0]   | 000 | 001 | 010 | 011 | 100 | 101| 110 | 111   
|---|---|---|---|---|---|---|---|---|  
| amplitude | 0 | 0  | 0 | 1 | 0 | 0 | 0 | 0 |

```javascript
qc
  .boot(2)
  .x(0)
  .measure() // one qubit register to one classic register

amplitudes = [1, 0, 0, 0, 0, 0, 0, 0]
// =>
amplitudes = [0, 1, 0, 0, 0, 0, 0, 0]
// =>
amplitudes = [0, 0, 0, 1, 0, 0, 0, 0]
```
$\because probability\ =\ amplitude ^ 2$  
$\therefore p(|011\rangle) = 1^2 = 1$

<!-- slide vertical: true -->
![Screen Shot 2017-04-21 at 1.39.07 AM](http://i.imgur.com/mscoSQY.png)

<!-- slide vertical: true -->
I implemented two helper functions for applying matrix.  
* **applySingleBitMatrix(offset, matrix)**
  * apply unary quantum gate  
* **applyTwoBitsMatrix(control, target, matrix)**
  * apply binary quantum gate

<!-- slide vertical: true -->
For example, **Hadamard Gate**:  
$$
H = \begin{bmatrix} 1/\sqrt{2} & 1/\sqrt{2} \\ 1/\sqrt{2} & -1/\sqrt{2} \end{bmatrix}
$$
```javascript
qc.h(0)

// is the same as

const t = 1 / Math.sqrt(2)
qc.applySingleBitMatrix(0, [[t, t], [t, -t]])

```


<!-- slide vertical: true -->
For more information about this project, check the **qubit.js** github repo:  
https://github.com/shd101wyy/qubit.js  

[IBM Q](https://quantumexperience.ng.bluemix.net)  


<!-- slide vertical: true -->
# Thank you