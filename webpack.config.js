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
  module: {
    rules: [
      // {
      //   test: /\.(jsx|js)?$/,
      //   use: [

      //     path.resolve(__dirname, 'loaders', 'loader3.js'),
      //   ]
      // },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          'postcss-loader',
          // path.resolve(__dirname, 'loaders', 'loader1.js'),
          // path.resolve(__dirname, 'loaders', 'loader2.js'),
        ],
      },
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
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ]
}