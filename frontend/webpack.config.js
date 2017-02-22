"use strict";

// const path    = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: { path: __dirname + '/build/', filename: 'index.js' },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            // {
            //     test: /\.html$/,
            //     loader: 'vue-template-loader'
            // },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                // query: {
                //     minimize: true
                // }
            }
        ]
    },

    plugins: [],
};