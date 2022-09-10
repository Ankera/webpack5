const path = require('path');
const webpack = require('webpack'); // 访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devtool: false,
  mode: "development",
  // devtool: 'source-map',
  // devServer: {

  // },
  // module: {},
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}