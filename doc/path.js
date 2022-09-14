const path = require('path');
const fs = require('fs');

console.log(path.join('a', 'b', 'c', 'd', 'e', 'f'))

console.log(path.posix.join('a', 'b', 'c', 'd', 'e'))

// console.log(path.resolve(__dirname, 'demo.txt'))
// fs.watch(path.resolve(__dirname, 'demo.txt'), (err, data, a) => {
//   console.log(err, data, a)
// })

console.log(path.dirname(__filename))
