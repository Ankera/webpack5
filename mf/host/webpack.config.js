const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
  output: {},
  devServer: {
    port: 8000,
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
      // filename: "remoteEntry.js",
      name: "host",
      remotes: {
        remote: "remote@http://localhost:3000/remoteEntry.js",
      },
      shared: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
      },
    }),
  ],
};
