const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js'
    // publicPath: "http://localhost:3000",
  },
  devServer: {
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    // 向主机提供服务
    new ModuleFederationPlugin({
      filename: "remoteEntry.js",
      name: "remote",
      exposes: {
        "./NewList": "./src/newList",
      },
      shared: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
      },
    }),
  ],
};
