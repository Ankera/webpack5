/**
 * loader 叠加的顺序
 * post + inline + normal + pre
 */

const path = require('path');

module.exports = {
  entry: './src/indexLoader.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'distLoaders'),
    filename: 'main.js'
  },
  resolveLoader: {
    alias: {
      "inline1-loader": path.resolve(__dirname, 'loaders/inline1-loader.js'),
      "inline2-loader": path.resolve(__dirname, 'loaders/inline2-loader.js'),
    },
    modules: ['node_modules', 'loaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // enforce: 'normal', // 默认
        use: [
          path.resolve(__dirname, 'loaders/normal1-loader.js'),
          path.resolve(__dirname, 'loaders/normal2-loader.js'),
        ]
      },
      {
        test: /\.js$/,
        enforce: 'post', // 后置
        use: [
          path.resolve(__dirname, 'loaders/post1-loader.js'),
          path.resolve(__dirname, 'loaders/post2-loader.js'),
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre', // 前置
        use: [
          path.resolve(__dirname, 'loaders/pre1-loader.js'),
          path.resolve(__dirname, 'loaders/pre2-loader.js'),
        ]
      },
    ]
  }
}