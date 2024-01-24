// webpack.prod.js
const path = require('path')
const { merge } = require("webpack-merge");
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css

      new TerserPlugin({ // 压缩js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"] // 删除console.log
          }
        }
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css' // 抽离css的输出目录和名称
    }),

    // 清理无用css
    // new PurgeCSSPlugin({
    //   // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
    //   // 只打包这些文件中用到的样式
    //   paths: globAll.sync([
    //     `${path.join(__dirname, '../src')}/**/*.tsx`,
    //     path.join(__dirname, '../public/index.html')
    //   ]),
    // }),

    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: source => {
            return !source.includes('index.html') // 忽略index.html
          }
        },
      ],
    }),
    
  ]
});
