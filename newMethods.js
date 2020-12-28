// cls && node newMethods.js 0.5 0 -1 2 rk
const Table = require('cli-table');
let [method, ...argv] = process.argv.reverse();

const f = (x, y) => (2 * Math.pow(x, 2) - y);

// -1 0.5 0.5
const NewMethod = (f) => {
    let [t, y, x, h, ...args] = argv;
    const iterations = [];

    t = +t;
    x = parseFloat(x);
    y = parseFloat(y);
    h = parseFloat(h);

    for (; x < t;) {
        const k1 = h * f(x, y);
        const k2 = h * f(x + h / 2, y + k1 / 2);
        const k3 = h * f(x + h / 2, y + k2 / 2);
        const k4 = h * f(x + h, y + k3);
        const y_xh = y + 1 / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
        iterations.push({ x, y, k1, k2, k3, k4, y_xh });
        x = x + h;
        y = y_xh;
    }

    const table = new Table(
        {
            head: ['x', 'y', 'k1', 'k2', 'k3', 'k4', 'y_xh',]
            , colWidths: [10, 20, 20, 20, 20, 20, 20]
        }
    );
    iterations.forEach((e, ind) => {
        let { x, y, k1, k2, k3, k4, y_xh } = e;
        y = y.toFixed(5);
        k1 = k1.toFixed(5);
        k2 = k2.toFixed(5);
        k3 = k3.toFixed(5);
        k4 = k4.toFixed(5);
        y_xh = y_xh.toFixed(5);
        table.push([ x, y, k1, k2, k3, k4, y_xh ]);
    })

    // table is an Array, so you can `push`, `unshift`, `splice` and friends

    console.log(table.toString());
}

switch (method) {
    case 'rk':
        NewMethod(f);
        break;
    default:
        break;
}