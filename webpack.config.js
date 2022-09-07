const path = require('path');
const webpack = require('webpack'); // 访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: {
  //   pageOne: './src/index.js',
  //   pageTwo: './src/index01.js'
  // },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    port: 3002,
    static: './dist',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ]
}