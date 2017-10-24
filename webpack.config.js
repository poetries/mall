var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'common': ["./src/page/common/index.js"],
        'index': ["./src/page/index/index.js"],
        'login': ["./src/page/login/index.js"]
    },
    output: {
        path: __dirname + '/dist/',
        filename: "js/[name].js"
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=resource/[name].[ext]'
            },
            {
                test: /\.string$/,
                loader: 'html-loader',
                query: {
                    minimize: true,
                    removeAttributeQuotes: false
                }
            }
        ]
    },
    plugins: [
        // 独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模版的处理
        new HtmlWebpackPlugin({ 'index': '首页' }),
        new HtmlWebpackPlugin({ 'login': '用户登录' })
    ]
}