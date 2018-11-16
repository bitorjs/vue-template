const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const watcherPlugin = require('./watcher.config');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var path = require('path');
const cwd = process.cwd();

module.exports = WebpackMerge(base, {
  mode: 'production',
  entry: './app.js',
  output: {
    filename: 'build.min.js',
    path: path.resolve(cwd, 'dist'),
  },
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true
      // }),
      new OptimizeCSSAssetsPlugin({}) // use OptimizeCSSAssetsPlugin
    ]
  },
  plugins: [
    // watcherPlugin,
    new MiniCssExtractPlugin({
      filename: 'app.min.css'
    })
  ]
})