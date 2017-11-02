const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './src/client/index'
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
                exclude: /node_modules/,
                options: {
                    presets: ['es2015','react']
                }
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
};
