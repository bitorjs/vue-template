var vConsolePlugin = require('vconsole-webpack-plugin');
const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');

const fs = require('fs');
var path = require('path');
const cwd = process.cwd();

const postcss = require(path.join(cwd, 'postcss.config'));

module.exports = WebpackMerge(base, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: postcss
        },
        {
          loader: 'less-loader',
          query: {
            sourceMap: true,
            globalVars: {
              "boxWidth": '200px'
            },
            modifyVars: {
              "boxHeight": '200px'
            }
          }
        }
      ]
    }, {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader', // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        {
          loader: 'postcss-loader',
          options: postcss
        },
        {
          loader: "sass-loader",
          options: {
            data: ""
          }
        } // compiles Sass to CSS, using Node Sass by default
      ]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        IS_DEV: true,
      },
    }),
    new vConsolePlugin({
      filter: [], // 需要过滤的入口文件
      enable: false // 发布代码前记得改回 false
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(cwd, 'dist'),
    open: true,
    host: '0.0.0.0',
    port: 9021,
    hot: true,
    compress: false,
    inline: true,
    proxy: {
      '/xxxx/*': {
        target: 'http://xxx.xxx.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/yyyy': '/'
        }
      },
    }
  },
  watchOptions: {
    ignored: [path.resolve(cwd, 'dist/**/*.*'), path.resolve(cwd, 'node_modules')]
  }
});