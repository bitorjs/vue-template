const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const watcherPlugin = require('./watcher');

var path = require('path');
const cwd = process.cwd();

module.exports = WebpackMerge(base, {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: 'build.js',
    path: path.resolve(cwd, 'dist'),
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        'vue-style-loader',
        'css-loader', 'less-loader', 'postcss-loader'
      ]
    }, ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    watcherPlugin,
  ],
  devServer: {
    contentBase: path.join(cwd, 'dist'),
    open: true,
    port: 9000,
    hot: true,
    compress: false,
    inline: true,
  },
  watchOptions: {
    ignored: [path.resolve(cwd, 'dist/**/*.*'), path.resolve(cwd, 'node_modules')]
  }
});