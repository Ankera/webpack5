const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

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
    react: "React",
    "react-dom": "ReactDOM",
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack')
  },
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
    alias: {
      "@": path.join(__dirname, "../src"),
      // 'common-variables': path.resolve(__dirname, 'common/css/variable.less'),
    },
    // modules: [path.resolve("node_modules")], // 指定去本项目 node_modules 查找模块，不允许向上查找，全局
  },
  // 找loader的解析路径
  // resolveLoader: {
  //   modules: ['loaders', 'node_modules']
  // },
  stats: "minimal", // 或者 'normal'、'verbose'
  module: {
    // noParse: /lodash/, 
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // 匹配.ts, tsx文件
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          },
          {
            loader: "babel-loader",
            // options: {
            //   // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            //   presets: ["@babel/preset-react", "@babel/preset-typescript"],
            // },
          },
        ],
      },
      {
        test: /.css$/, //匹配 css和less 文件
        use: [
          // "style-loader",
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          // MiniCssExtractPlugin.loader,
          // 'css-loader',
          {
            loader: "css-loader",
            options: {
              modules: false, // 不开启CSS模块化
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /.less$/, //匹配 css和less 文件
        use: [
          // "style-loader",
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // import: true,
              // modules: true, // 开启CSS模块化
              modules: {
                localIdentName: '[name]__[hash:5]'
              }
              /**
               * 比如有的less文件引入
               *  @import 'common/css/variable.less';
               * 想让 variable.less 也被编译，执行 'postcss-loader' & 'less-loader'
               */
              // importLoaders: 2,
            },
          },
          "postcss-loader",
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['autoprefixer']
          //     }
          //   }
          // },
          {
            loader: "less-loader",
            options: {
              // lessOptions: {
              //   // modifyVars: {
              //   //   'common-variables': `"${path.resolve(__dirname, '/srccommon/css/variable.less')}"`,
              //   // },
              // },
              additionalData: '@import "common/css/variable.less";',
            }
          }
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        /**
         *
         */
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[hash:8]_[name][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  plugins: [
    new WebpackBar(),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: []
    }),

    // 每个 tsx 文件自动引入 import isarray from 'isarray';
    new webpack.ProvidePlugin({
      isarray: "isarray",
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),

    // TODO 性能提升待定
    // new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
  ],
};
