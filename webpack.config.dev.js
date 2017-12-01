const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

module.exports = {
    devtool: isProduction ? false : 'cheap-module-eval-source-map',
    entry: [
        './src/index'
    ],
    output: {
        filename: 'main-bundle.js',
        path: path.resolve(__dirname, 'static'),
        publicPath: '/'
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
        new WebpackShellPlugin({
            onBuildStart: [],
            onBuildExit: [
                'cp ./static/main-bundle.js ../live-chat/public/js/client/'
            ]
        })
    ].concat(isProduction ? [
        new UglifyJSPlugin({
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ] : [])
}
