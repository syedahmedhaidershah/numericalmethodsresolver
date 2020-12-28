# Numerical Methods Resolver
### A CLI utility for Numerical Analysis for the defined methods.

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://opensource.org/licenses/MIT)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/xsahil03x/fancy_on_boarding/blob/master/LICENSE)


- Available methods:

* Linear Systems Resolutions:<br />
    * Open:<br />
        * Newton Raphson<br />
        * Secant<br />
    * Closed:<br />
        * False Position (Regula Falsi)<br />
        * Bisection.<br />
* ODE Resolutions<br />
    * Euler's Method<br />
    * Modified Euler's Method<br />


## Params definitions:
### Some of the parameters might not be used in some of the methods. It's better to let them be.
```js
const getCriteria = [
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