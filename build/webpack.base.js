const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

var path = require('path');
const cwd = process.cwd();

module.exports = {
  plugins: [
    new htmlPlugin({
      filename: 'index.html',
      template: path.resolve(cwd, 'index.html'),
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: './assets',
      to: './assets'
    }]),
  ],

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(le|c)ss$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}