import { labeledLogger } from '../../../lib/labeled-logger.js';

const { log } = labeledLogger();

const arr = [];

const exercise5_cb_0 = () => {
    log('pushing 1');
    arr.push(1);
};
const intervalId = setInterval(exercise5_cb_0, 100);

// fill in the blanks

const exercise5_cb_1 = () => {
    const sum = arr.reduce((sum, next) => sum + next, 0);
    log('callback 1:', sum);
    const test = sum === 0;
    console.assert(test, 'Test 1');
};
setTimeout(exercise5_cb_1, 0);

const exercise5_cb_2 = () => {
    log('callback 2:', arr);
    const test = arr.length === 7;
    console.assert(test, 'Test 2');
};
setTimeout(exercise5_cb_2, 700);

const exercise5_cb_3 = () => {
    const sum = arr.reduce((sum, next) => sum + next, 0);
    log('callback 3:', sum);
    const test = sum === 6;
    console.assert(test, 'Test 3');

    clearInterval(intervalId);
    arr.push('almost done!');
};
setTimeout(exercise5_cb_3, 600);

const exercise5_cb_4 = () => {
    const sum = arr.reduce((sum, next) => sum + next, 0);
    log('callback 4:', sum);
    const test = sum === 2;
    console.assert(test, 'Test 4');
};
setTimeout(exercise5_cb_4, 200);

const exercise5_cb_5 = () => {
    const sum = arr.reduce((sum, next) => sum + next, 0);
    log('callback 5:', sum);
    const test = sum === 5;
    console.assert(test, 'Test 5');
};
setTimeout(exercise5_cb_5, 500);

log('= = = =  the call stack is empty  = = = =');