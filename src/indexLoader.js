const title = require('inline1-loader!inline2-loader!./titleLoader');

console.log('titleLoader', title);

const sum = (a, b) => a + b;

console.log('求和sum', sum(1, 2));