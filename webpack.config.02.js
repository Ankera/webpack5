/**
 * babel-loader 插件 2022-09-13 01:24
 * plugin-import 按需加载
 * plugin-log 日志前增加 额外提示
 */

const path = require('path');
const webpack = require('webpack'); // 访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: false,
  mode: "development",
  // devtool: 'source-map',
  devServer: {
    port: 3003
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              /**
               * 官方的按需加载插件
               */
              // ["import",
              //   // 执行要按需加载的模块
              //   {
              //     libraryName: "lodash",
              //     libraryDirectory: ""
              //   }
              // ]

              [
                path.resolve(__dirname, 'plugin-import'),
                {
                  libraryName: "lodash",
                  libraryDirectory: ""
                }
              ],
              // 日志插件
              [
                path.resolve(__dirname, 'plugin-log'),
                {
                  log: true,
                }
              ]
            ]
          }
        }
      }
    ]
  },
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