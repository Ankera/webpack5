const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module () {

}

Module._resolveFilename = function (filename) {
  const filePath = path.resolve(__dirname, filename);
  const isExist = fs.existsSync(filePath);
  if (isExist) {
    return filePath;
  }
}

function myRequire (filename) {
  filename = Module._resolveFilename(filename);
  console.log('filename', filename)
}


const age = myRequire('./eventLoop.js');

// console.log('age', age);