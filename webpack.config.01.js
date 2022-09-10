const path = require('path');
const webpack = require('webpack'); // 访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js'
  },
  mode: 'development',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/assets')
    }
  },
  externals: {
    lodash: "_"
  },
  module: {
    rules: [
      // {
      //   test: /\.(jsx|js)?$/,
      //   use: [

      //     path.resolve(__dirname, 'loaders', 'loader3.js'),
      //   ]
      // },
      // {
      //   test: /\.css$/i,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: "css-loader",
      //       options: {
      //         importLoaders: 1,
      //         // 0 => no loaders (default);
      //         // 1 => postcss-loader;
      //         // 2 => postcss-loader, sass-loader
      //       },
      //     },
      //     'postcss-loader',
      //     // path.resolve(__dirname, 'loaders', 'loader1.js'),
      //     // path.resolve(__dirname, 'loaders', 'loader2.js'),
      //   ],
      // },
      // {
      //   test: /\.less$/i,
      //   use: ['postcss-loader', "less-loader"],
      // },
      // {
      //   test: /\.scss$/i,
      //   use: ['postcss-loader', "sass-loader"],
      // },
    ],
  },
  devtool: false,
  devServer: {
    port: 3002,
    static: './dist',
    // allowedHosts: ['http://localhost:3004'],
    proxy: {
      "/api": 'http://localhost:3005'

      // '/api': {
      //   target: 'http://localhost:3005',
      //   "^/api": ""
      // },
    },
    onBeforeSetupMiddleware: function (devServer) {
      console.log('devServer', devServer)
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' });
      });
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false,
    }),
    new webpack.ProvidePlugin({
      isarray: "isarray"
    })
  ]
}