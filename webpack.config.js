var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin的函数
var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};

var config = {
    entry: {
        'common': ["./src/page/common/index.js"],
        'index': ["./src/page/index/index.js"],
        'login': ["./src/page/user-login/index.js"]
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//blog.poetries.top/mall/dist/',
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
    resolve: {
        //文件后缀名
        // extensions : ['','.js','.json'],
        //文件别名
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
        }
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
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088')

}

module.exports = config;