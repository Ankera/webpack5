// webpack.speed.js
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// 合并公共配置,并添加开发环境配置
module.exports = smp.wrap(merge(baseConfig, {
  mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
  // watch: true,
  devtool: 'eval-source-map',
  // cache: {
  //   type: 'filesystem', // 或者 'memory'
  // },
}));
