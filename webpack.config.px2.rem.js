const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    devtool: false,
    entry: "./src/px2-rem-loader/index.js",
    output: {
        path: path.resolve(__dirname, 'distPxRem'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        // loader: 'px2rem-loader',
                        loader: path.resolve(__dirname, 'src/px2-rem-loader/px2rem-loader.js'),
                        // loader: path.resolve(__dirname, 'src/px2-rem-loader/px2vw-loader.js'),
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                            exclude: /antd\.css/
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/px2-rem-loader/index.html',
            filename: 'index.html'
          })
    ]
}