/**
 * webpack 工作流程 2022-09-14 02:00
 * @author zimu
 */

const path = require('path');
const RunPlugin = require('./webpack/plugins/run-plugin');
const DonePlugin = require('./webpack/plugins/done-plugin');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    // entry1: path.join(__dirname, './src/entry1.js'),
    // entry2: path.join(__dirname, './src/entry2.js'),
    entry1: './src/entry1.js',
    entry2: './src/entry2.js'
  },
  plugins: [
    new RunPlugin(),
    new DonePlugin(),
  ]
}