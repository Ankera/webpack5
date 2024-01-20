const path = require("path");
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  externals: {
    // 检查是否有这样的配置，将其删除或注释掉
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  mode: "development",
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },
  stats: 'minimal', // 或者 'normal'、'verbose'
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // 匹配.ts, tsx文件
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            // options: {
            //   // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            //   presets: ["@babel/preset-react", "@babel/preset-typescript"],
            // },
          }
        ],
      },
      {
        test: /.(css|less)$/, //匹配 css和less 文件
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          'less-loader'
        ]
      },
      {
        test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/images/[hash:8]_[name][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/fonts/[name][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/media/[name][ext]', // 文件输出目录和命名
        },
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),

    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ],
};
