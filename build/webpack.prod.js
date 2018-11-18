const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require('path');
const cwd = process.cwd();

module.exports = WebpackMerge(base, {
  mode: 'production',
  entry: './app.js',
  output: {
    filename: 'build.min.js',
    path: path.resolve(cwd, 'dist'),
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', 'less-loader', 'postcss-loader'
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.min.css'
    })
  ]
})