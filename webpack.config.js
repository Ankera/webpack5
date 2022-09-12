const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    entry1: path.join(__dirname, './src/entry1.js'),
    entry2: path.join(__dirname, './src/entry2.js'),
  },
}