const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

module.exports = {
    devtool: isProduction ? false : 'cheap-module-eval-source-map',
    entry: {
        main: './src/index',
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-notifications',
            'redux',
            'redux-thunk',
            'redux-saga',
            'moment',
            'socket.io-client',
            'axios',
            'emojis-list',
            'lodash'
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../live-chat/public/js/dist'),
        publicPath: 'js/dist'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.woff|\.svg|\.ttf|\.eot|\.woff2/, loader: 'url-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ]

    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, '../live-chat/public/js/dist'), {
            allowExternal: true
        }),
        new HtmlWebpackPlugin({
            title: 'Teko Admin Chat',
            filename: '../../../resources/views/index.blade.php',
            template: 'index.html'
        })
    ].concat(isProduction ? [
        new UglifyJSPlugin({
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
    ] : [
        new webpack.NamedModulesPlugin(),
    ])
}
