const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

const isProduction = process.env.NODE_ENV == 'production'
console.log(`Building in ${isProduction ? 'production' : 'development'} environment`)

module.exports = {
    devtool: isProduction ? false : 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../live-chat/public'),
        allowedHosts: ['http://local.chat.com', 'http://tekshop.local'],
        compress: true
    },
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
            'emoji-datasource-messenger',
            'grapheme-splitter',
            'lodash'
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../live-chat/public/js/dist'),
        publicPath: 'js/dist'
    },
    resolve: {
        alias: {
            Actions: path.resolve(__dirname, 'src/actions/'),
            Components: path.resolve(__dirname, 'src/components/'),
            Constants: path.resolve(__dirname, 'src/constants/'),
            Containers: path.resolve(__dirname, 'src/container/'),
            Reducers: path.resolve(__dirname, 'src/reducers/'),
            Helper: path.resolve(__dirname, 'src/helper')
        },
        extensions: ['.js', '.jsx']
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
        })
    ].concat(isProduction ? [
        new HtmlWebpackPlugin({
            title: 'Teko Admin Chat',
            filename: '../../../resources/views/index.blade.php',
            template: 'index.html'
        }),
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
        new HtmlWebpackPlugin({
            title: 'Teko Admin Chat',
            filename: '../../../resources/views/index.blade.php',
            template: 'index.html'
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title: 'Teko Admin Chat',
            filename: '../../index.html',
            template: 'index.html',
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.NamedModulesPlugin(),
    ])
}
