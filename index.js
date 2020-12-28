const nerdamerInst = require('./js/nerdamer.core');
require('./js/Algebra');
require('./js/Calculus');
require('./js/Extra');
require('./js/Solve');
const { derivative } = require('mathjs');
const Table = require('cli-table');
// const nerdamerInst = require('nerdamer');
let {
    x0a,
    x1a,
    x2a,
    funct,
    x0,
    x1,
    h,
    hVals: [hl, hu],
    derivated,
    stopValue,
    stopCriteria = "Estimated Error",
    root,
    precision,
    ea,
    et,
    method
} = params = require('./params');

let i = 0;

const e = Math.exp(1);
const pi = Math.PI;

let iterations = 0;
let onemore = true;

const getJSMath = (str) => {
    return str.replace('cos', 'Math.cos')
        .replace(/sin/g, 'Math.sin')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/\^/g, '**');
}

getEval = (e) => {
    switch (e) {
        case 'estimatederror':
            return ['ea.length?ea[ea.length -1]>stopValue:true', 'ea.length?ea[ea.length -1]>stopValue:true||onemore'];
            break;
        case 'iterations':
            return ['iterations < stopValue', '(iterations < stopValue)||onemore'];
            break;
        case 'totalerror':
            return ['et.length?et[et.length -1]>stopValue:true', 'et.length?et[et.length -1]>stopValue:true||onemore'];
            break;
        default:
            return ['ea.length?ea[ea.length -1]>stopValue:true', 'ea.length?ea[ea.length -1]>stopValue:true||onemore'];
            break;
    }
}

fx = (x, funct) => eval(funct);

fxy = (x, y, funct) => eval(funct);

extractions = (funct) => {
    const nerdamer = nerdamerInst
        .solveEquations(funct, 'x')
        .toString()
        .split(',')[0];

    let eq = getJSMath(
        typeof nerdamer === 'string' ? nerdamer : nerdamer.pop()
    )
    let useVal = 0;
    try {
        useVal = eval(eq);
    } catch (exc) { }
    const root = useVal.toFixed(precision);
    return [funct, eq, useVal];
}

const bisection = () => {
    funct = getJSMath(funct);

    let message = 'bisection';
    if (+x0 === +x1) return {
        values: {},
        message: 'Select an interval, x0 is equals to x1',
        error: true
    }
    const [useFunction, eq, useVal] = extractions(funct);

    root = +(useVal.toFixed(precision));

    const addFactor = +(+Math.random().toFixed(2) * 100) % 2 == 0 ? 0.6 : -0.8;
    x0 = (+root + 0.9 * addFactor);
    x1 = (+root - addFactor);

    stopValue = +stopValue;

    let fx0 = [];
    let fx1 = [];
    let fx2 = [];
    let update = [];

    const useCriteria = stopCriteria.toLowerCase().replace(/\s/g, '');

    let [baseEval, evalCondition] = getEval(useCriteria);

    try {
        ea = [];
        et = [];
        x0a = [];
        x1a = [];
        x2a = [];
        x0a = [];
        iterations = 0;

        for (; eval(evalCondition); iterations++) {

            // if (useCriteria.includes('error'))
            onemore = eval(baseEval);

            let useX0 = parseFloat(
                // fx0[iterations - 1] * fx2[iterations - 1]  < 0   => f(x0)*f(x2) < 0 (negative)
                ((x0a.length === 0) ? +x0 : +(fx0[iterations - 1] * fx2[iterations - 1] < 0 ? x0a[iterations - 1] : x2a[iterations - 1])).toFixed(precision)
            );
            let useX1 = parseFloat(
                // same condition - parameters reversed instead of putting f(x0)*f(x2) >= 0
                // fx0[iterations - 1] * fx2[iterations - 1]  < 0   => f(x0)*f(x2) < 0 (positive or equal to 0)
                ((x1a.length === 0) ? +x1 : +(fx0[iterations - 1] * fx2[iterations - 1] < 0 ? x2a[iterations - 1] : x1a[iterations - 1])).toFixed(precision)
            )
            x0a.push(useX0);
            x1a.push(useX1);

            const useF0x = fx(useX0, funct);
            const useF1x = fx(useX1, funct);

            let useX2 = parseFloat(
                ((useX0 + useX1) / 2).toFixed(5)
            )
            x2a.push(useX2);
            const useF2x = fx(useX2, funct);

            fx0.push(parseFloat(useF0x.toFixed(precision)));
            fx2.push(parseFloat(useF2x.toFixed(precision)));

            ea.push(
                +(x2a[iterations - 1] ? (Math.abs(
                    (useX2 - x2a[iterations - 1]) / useX2) * 100) : 90000).toFixed(precision)
            );
            et.push(+(Math.abs((root - useX2) / root) * 100).toFixed(precision));
        }
    } catch (exc) {
        message = exc;
    }
    return {
        precision,
        values: x2a.map((v, i) => {
            return {
                x0: x0a[i],
                x1: x1a[i],
                x2: x2a[i],
                fx0: fx0[i],
                fx2: fx2[i],
                ea: ea[i],
                et: et[i]
            }
        }),
        message,
        error: false
    };
};

const falsepos = () => {
    funct = getJSMath(funct);

    let message = 'falsepos';

    const [useFunction, eq, useVal] = extractions(funct);

    root = +(useVal.toFixed(precision));

    const addFactor = +(+Math.random().toFixed(2) * 100) % 2 == 0 ? 0.5 : -0.7;
    x0 = (+root + 0.9 * addFactor);
    x1 = (+root - addFactor);

    if (+x0 === +x1) return {
        values: {},
        message: 'Select an interval, x0 is equals to x1',
        error: true
    }

    stopValue = +stopValue;

    let fx0 = [];
    let fx2 = [];
    let update = [];

    const useCriteria = stopCriteria.toLowerCase().replace(/\s/g, '');

    let [baseEval, evalCondition] = getEval(useCriteria);

    try {
        ea = [];
        et = [];
        x0a = [];
        x1a = [];
        x2a = [];
        x0a = [];
        iterations = 0;

        for (; eval(evalCondition); iterations++) {

            if (useCriteria.includes('error'))
                onemore = eval(baseEval);

            // x0a[iterations - 1] = latest value for x0 or x1 in lectures
            // x2a[iterations - 1] = latest value for x2 or x3 in lectures
            // useX0 = x0 --> retreived from the statement above
            // useX1 = x1 --> retreived from the statement above
            let useX0 = parseFloat(
                // +((x0a[iterations - 1] < 0) == (x2a[iterations - 1] < 0) => x0<0 AND x2<0 - OR Both negative/positive
                ((x0a.length === 0) ? +x0 : +((x0a[iterations - 1] < 0) == (x2a[iterations - 1] < 0) ? x2a[iterations - 1] : x0a[iterations - 1])).toFixed(precision)
            );
            let useX1 = parseFloat(
                // +((x0a[iterations - 1] < 0) !== (x2a[iterations - 1] < 0) => x0<0 AND x2>0 - OR x0>0 AND x2<0 - OR Opp polarity
                ((x1a.length === 0) ? +x1 : +((x0a[iterations - 1] < 0) !== (x2a[iterations - 1] < 0) ? x2a[iterations - 1] : x1a[iterations - 1])).toFixed(precision)
            )
            x0a.push(useX0);
            x1a.push(useX1);

            const useF0x = fx(useX0, funct);
            const useF1x = fx(useX1, funct);

            // useX1 = x1 or x2 in lectures
            // useF1x = f(x1) or f(x2) in lectures
            // useX0 = x0 or x1 in lectures
            // useX1 = x1 or x2 in lectures
            // useF0x = f(x0) or f(x1) in lectures
            // useF1x = f(x1) or f(x2) in lectures
            // useF2 = x2 or x3 in lectures
            let useX2 = parseFloat(
                (useX1 - (useF1x * (useX0 - useX1) / (useF0x - useF1x))).toFixed(precision)
            )
            x2a.push(useX2);
            // useF2x = f(x2) or f(x3) in lectures
            const useF2x = fx(useX2, funct);

            fx0.push(parseFloat(useF0x.toFixed(precision)));
            fx2.push(parseFloat(useF2x.toFixed(precision)));

            ea.push(
                +(x2a[iterations - 1] ? (Math.abs(
                    (useX2 - x2a[iterations - 1]) / useX2) * 100) : 90000).toFixed(precision)
            );
            et.push(Math.abs((root - useX2) / root) * 100);
        }
    } catch (exc) {
        message = exc;
    }
    return {
        precision,
        values: x2a.map((v, i) => {
            return {
                x0: x0a[i],
                x1: x1a[i],
                x2: x2a[i],
                fx0: fx0[i],
                fx2: fx2[i],
                ea: ea[i],
                et: et[i]
            }
        }),
        message,
        error: false
    };
};

const nrm = () => {
    const useFunForD = funct;
    funct = getJSMath(funct);

    let message = 'nrm';

    const [useFunction, eq, useVal] = extractions(funct);

    root = +(useVal.toFixed(precision));

    if (+x0 === +x1) return {
        values: {},
        message: 'Select an interval, x0 is equals to x1',
        error: true
    }

    x0 = ((+root < 0) ? root - 1 : root + 1);

    if (parseFloat(((+x0).toFixed(precision))) === 0) return {
        values: {},
        message: 'X0 could not be 0, try increasing precision',
        error: true
    }

    let fdx = derivative(useFunForD, 'x').toString();

    fdx = getJSMath(fdx);
    stopValue = +stopValue;

    let fxArr = [];
    let fdxArr = [];

    const useCriteria = stopCriteria.toLowerCase().replace(/\s/g, '');

    let [baseEval, evalCondition] = getEval(useCriteria);

    try {
        ea = [];
        et = [];
        xn = [];
        xn1 = [];
        iterations = 0;

        for (; eval(evalCondition); iterations++) {

            if (useCriteria.includes('error'))
                onemore = eval(baseEval);

            // xn1[iterations -1 ] => latest value of x0 or xn
            let useXn = parseFloat(
                // xn assumes either x0 if the first iteration is taking place
                // or xn assumes previous value of xn+1
                ((xn.length === 0) ? +x0 : +(xn1[iterations - 1])).toFixed(precision)
            )
            xn.push(useXn);

            const useFx = fx(useXn, funct);
            const useFdx = fx(useXn, fdx);

            // useXn = x0 or xn
            // useFx = f(x)
            // useFdx = f'(x)
            let useXn1 = parseFloat(
                (useXn - (useFx / useFdx)).toFixed(precision)
            )
            xn1.push(useXn1);

            fxArr.push(parseFloat(useFx.toFixed(precision)));
            fdxArr.push(parseFloat(useFdx.toFixed(precision)));

            // ea = Estimated Error
            // et = Total Error
            ea.push(
                +(Math.abs((useXn1 - useXn) / useXn1) * 100).toFixed(precision)
            );
            et.push(
                +(Math.abs((root - useXn1) / root) * 100).toFixed(precision)
            );
        }
    } catch (exc) {
        message = exc;
    }
    return {
        precision,
        values: xn.map((v, i) => {
            return {
                xn: xn[i],
                xn1: xn1[i],
                fx: fxArr[i],
                fdx: fdxArr[i],
                ea: ea[i],
                et: et[i]
            }
        }),
        message,
        error: false
    };
};

const secant = () => {
    const useFunForD = funct;
    funct = getJSMath(funct);

    let message = 'secant';

    const [useFunction, eq, useVal] = extractions(funct);

    root = +(useVal.toFixed(precision));

    const addFactor = +(+Math.random().toFixed(2) * 100) % 2 == 0 ? 0.5 : -0.7;
    x0 = (+root + 0.9 * addFactor);
    x1 = (+root - addFactor);

    if (+x0 === +x1) return {
        values: {},
        message: 'Select an interval, x0 is equals to x1',
        error: true
    }

    stopValue = +stopValue;

    let fxl = [];
    let fxu = [];
    let fx2 = [];
    let x2 = [];

    const useCriteria = stopCriteria.toLowerCase().replace(/\s/g, '');

    let [baseEval, evalCondition] = getEval(useCriteria);

    try {
        ea = [];
        et = [];
        xl = [];
        xu = [];
        x2 = [];
        iterations = 0;

        for (; eval(evalCondition); iterations++) {

            if (useCriteria.includes('error'))
                onemore = eval(baseEval);

            // xl[iterations -1] = latest value for xl or x0 (lower bracketing value for interval)
            // xu[iterations -1] = latest value for  xu or x1 (upper bracketing value for interval)
            let useXl = parseFloat(
                ((xl.length === 0) ? +x0 : +(xu[iterations - 1])).toFixed(precision)
            );
            let useXu = parseFloat(
                ((xu.length === 0) ? +x1 : +(x2[iterations - 1])).toFixed(precision)
            )
            xl.push(useXl);
            xu.push(useXu);

            const useFlx = fx(useXl, funct);
            const useFux = fx(useXu, funct);

            // useXu = x0
            // useFux = f(x1)
            // useXu = x1 - upper
            // useXl = x0 - lower
            //  useFux = f(x1)
            // useFlx = f(x0)
            // useX2 = x2;
            let useX2 = parseFloat(
                (useXu - (useFux * (useXu - useXl) / (useFux - useFlx))).toFixed(precision)
            )
            x2.push(useX2);

            fxl.push(parseFloat(useFlx.toFixed(precision)));
            fxu.push(parseFloat(useFux.toFixed(precision)));
            fx2.push(parseFloat(fx(useX2, funct).toFixed(precision)));

            ea.push(
                +(
                    x2[iterations - 1] ? (Math.abs(
                        (useX2 - x2[iterations - 1]) / useX2) * 100) : 90000
                ).toFixed(precision)
            );
            et.push(+(Math.abs((root - useX2) / root) * 100).toFixed(precision));
        }
    } catch (exc) {
        message = exc;
    }
    return {
        precision,
        values: x2.map((v, i) => {
            return {
                x0: xl[i],
                x1: xu[i],
                x2: x2[i],
                fxl: fxl[i],
                fxu: fxu[i],
                fx2: fx2[i],
                ea: ea[i],
                et: et[i]
            }
        }),
        message,
        error: false
    };
};

const euler = () => {
    if (!derivated) funct = derivative(funct, 'x').toString();
    funct = getJSMath(funct);
    root = +(root.toFixed(precision));

    let it = 0;

    let x = x0;
    let y0 = x1;

    let xi = [x];
    let yi = [y0];
    let fxA = [];
    let yi1 = [];

    let useH = h;

    for (; hl <= xi[it] && xi[it] < hu; it++) {
        const useFxy = fxy(xi[it], yi[it], funct);
        let useForm = yi[it] + useFxy * useH;
        yi1.push(useForm);
        yi.push(useForm);
        xi.push(xi[it] + useH);
        fxA.push(useFxy);
    }
    return {
        precision,
        msessage: 'euler',
        values: xi.map((e, ind) => {
            return {
                xi: xi[ind],
                yi: yi[ind],
                'f(xi,yi)': fxA[ind],
                'yi+1': yi1[ind]
            }
        })
    }
}

const eulerMod = () => {
    if (!derivated) funct = derivative(funct, 'x').toString();
    funct = getJSMath(funct);
    root = +(root.toFixed(precision));

    let it = 0;

    let x = x0;
    let y0 = x1;

    let xi = [x];
    let yi = [y0];
    let fxA = [];
    let yi1 = [];
    let xi1 = [];
    let fxA1 = [];
    let myi1 = [];

    let useH = h;

    for (; hl <= xi[it] && xi[it] < hu; it++) {
        const useFxy = fxy(xi[it], yi[it], funct);
        let useForm = +(yi[it] + useFxy * useH).toFixed(precision);
        yi1.push(useForm);
        yi.push(useForm);
        xi.push(xi[it] + useH);
        fxA.push(useFxy.toFixed(precision));
        xi1.push(xi[it + 1]);
        const useFxy1 = +(fxy(xi[it + 1], useForm, funct)).toFixed(precision);
        fxA1.push(useFxy1);
        const useForm1 = +(yi[it] + (useFxy + useFxy1) * useH / 2).toFixed(precision);
        myi1.push(useForm1);
    }
    return {
        precision,
        msessage: 'euler',
        values: xi.map((e, ind) => {
            return {
                xi: +(xi[ind]),
                yi: +(yi[ind]),
                'f(xi,yi)': +(fxA[ind]),
                'yi+1': +(yi1[ind]),
                'xi+1': xi1[ind],
                'f(xi+1,yi+1)': +(fxA1[ind]),
                'mod.yi+1': +(myi1[ind])
            }
        })
    }
}

flow = () => {
    let resolve;

    switch (method) {
        case 'nrm':
            resolve = nrm();
            break;
        case 'bisection':
            resolve = bisection();
            break;
        case 'falsepos':
            resolve = falsepos();
        case 'secant':
            resolve = secant();
            break;
        case 'euler':
            resolve = euler();
            break;
        case 'eulermod':
            resolve = eulerMod();
            break;
        default:
            break;
    }

    let { precision, values, error, message } = resolve;
    if (error) throw new Error(message);

    const table = new Table(
        {
            head: ['#', ...Object.keys(values[0])],
            colWidths: [10, ...Object.keys(values[0]).map(k => 10)]
        }
    );
    values.forEach((e, ind) => {
        table.push([ind, ...Object.values(e)]);
    })

    // // table is an Array, so you can `push`, `unshift`, `splice` and friends

    console.log(table.toString());
}

flow();