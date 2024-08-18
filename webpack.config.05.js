/**
 * loader 叠加的顺序
 * post + inline + normal + pre
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const path = require("path");

module.exports = {
  entry: "./src/indextest.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "distTest"),
    filename: "main.js",
  },
  cache: false,
  devServer: {
    hot: true,
    port: 3002,
    static: path.resolve(__dirname, 'static')
  },
  plugins: [
    new webpack.DefinePlugin({
      __WEBPACK__ENV: JSON.stringify('packages'),
      TWO: '1+1',
    }),
    
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    
    new HotModuleReplacementPlugin()
  ],
};
