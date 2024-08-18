// webpack.dev.js
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");


console.log("====NODE_ENV====dev", process.env.NODE_ENV);
console.log("====BASE_ENV====", process.env.BASE_ENV);

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
  // watch: true,
  devtool: 'eval-source-map',
  // cache: {
  //   type: 'filesystem', // 或者 'memory'
  // },
  devServer: {
    port: 8888, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
    // 服务器代理
    // proxy: {
    //   // '/api': 'http://localhost:3000',

    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRerite: {
    //       '^/api': ''
    //     }
    //   },
    // },

    /**
     * 在 webpack-dev-server 静态资源中间件处理之前，可以用于拦截请求，返回特定内容，比如mock数据
     * @param {*} param0 
     */
    onBeforeSetupMiddleware({ app }) {
      app.get('/api/users', (req, res) => {
        res.json({
          code: 1,
          data: [
            {
              name: 'Tom'
            }
          ]
        })
      })
    }
  },
});
