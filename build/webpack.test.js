const WebpackMerge = require('webpack-merge');
const prod = require('./webpack.prod');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = WebpackMerge(prod, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})