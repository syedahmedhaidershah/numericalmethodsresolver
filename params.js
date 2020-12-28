getCriteria = [
    'Estimated Error',
    'Total Error',
    'Iterations',
    'Step Size'
]

module.exports = {
    x0a: [],
    x1a: [],
    x2a: [],
    funct: 'x+y',
    derivated: true,
    x0: 0,
    x1: 1,
    h: 0.1,
    hVals: [0,0.3],
    stopValue: 0,
    stopCriteria: getCriteria[0],
    root: 0,
    precision: 5,
    ea: [],
    et: [],
    method: 'eulermod'
}