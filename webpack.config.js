var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './frontend/index.js',
  output: { path: __dirname + '/frontend', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        // SASS compiling && loading
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        // CSS loading
        test: /\.css$/,
        loaders: ['style', 'css?sourceMap']
      },
      {
        // Font loading (via css)
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ]
  }
};