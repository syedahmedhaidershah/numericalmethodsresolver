# Numerical Methods Resolver
### A CLI utility for Numerical Analysis for the defined methods.

* Available methods: *
i. Linear Systems Resolutions:
    1. Open
        a. Newton Raphson
        b. Secant
    2. Closed:
        a. False Position (Regula Falsi)
        b. Bisection. 
ii. ODE Resolutions
    1. Euler's Method
    2. Modified Euler's Method


## Params definitions:
### Some of the parameters might not be used in some of the methods. It's better to let them be.
```js
getCriteria = [
    'Estimated Error',
    'Total Error',
    'Iterations',
    'Step Size'
];

module.exports = {
    x0a: [],
    x1a: [],
    x2a: [],
    funct: 'x+y',
    derivated: true,
    x0: 0,
    x1: 1,
    h: 0.1, // For Euler's convergence 
    hVals: [0,0.3], // For Euler's convergence 
    stopValue: 0,
    stopCriteria: getCriteria[0],
    root: 0,
    precision: 5,
    ea: [],
    et: [],
    method: 'eulermod'
}
```