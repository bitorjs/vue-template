const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');
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
  plugins: [
    new OptimizeCSSAssetsPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'app.min.css'
    })
  ]
})