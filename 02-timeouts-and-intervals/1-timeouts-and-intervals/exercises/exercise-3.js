import { labeledLogger } from '../../../lib/labeled-logger.js';

const { log } = labeledLogger();

// fill in the blanks

let x = '';

const exercise3_cb_1 = () => {
    x += 'a';
    log('cb 1:', x);
};
const intervalId = setInterval(exercise3_cb_1, 200);

const exercise3_cb_2 = () => {
    x += 'w';
    log('cb 2:', x);
};
setTimeout(exercise3_cb_2, 100);

const exercise3_cb_3 = () => {
    const test = x === 'whaaaa!';
    log('cb 3:', test);
    console.assert(test, 'x should be "whaaaa!');
};
setTimeout(exercise3_cb_3, 900);

const exercise3_cb_4 = () => {
    clearTimeout(intervalId, 802); // clear something
    x += '!';
    log('cb 4:', x);
};
setTimeout(exercise3_cb_4, 850);

const exercise3_cb_5 = () => {
    x += 'h';
    log('cb 5:', x);
};
setTimeout(exercise3_cb_5, 150);

log(x);

log('= = = =  the call stack is empty  = = = =');
