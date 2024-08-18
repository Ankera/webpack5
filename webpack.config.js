/**
 * 实现 babel-loader
 */

const path = require('path');

module.exports = {
  entry: './src/indexSum.js',
  output: {
    path: path.resolve(__dirname, 'distSum'),
    filename: 'indexSum.js'
  },
  devtool: false,
  mode: 'development',
  resolveLoader: {
    alias: {
      'babel-loader': path.resolve(__dirname, 'loaders', 'babel-loader')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: [["@babel/env", {
            //   targets: {
            //     "chrome": "58",
            //     "ie": "11"
            //   }
            // }]],
            presets: ['@babel/preset-env'],
            plugins: []
          }
        }
      }
    ]
  }
}