const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const BitorPlugin = require('bitorjs-watcher');
const base = require('./webpack.base');
var config = require('../config/watcher')
console.log(config)

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
    new BitorPlugin({
      root: process.cwd() + '/app',
      cachefile: '.classloader.js',
      rules: {
        // 自动生成
        components: ["components/**/*.vue"],
        controllers: "controllers/**/*.js",
      },
      normalize(data) {
        let import_packages = "";
        let export_packages = {}
        let count = 0;
        for (const p in data) {
          if (data.hasOwnProperty(p)) {
            export_packages[p] = {};
            const arr = data[p];
            arr.forEach(filepath => {
              import_packages += `import x_${count} from '${filepath}';\r\n`;
              export_packages[p][`${p}_${path.basename(filepath).split('.')[0]}`] = `{x_${count}{`;
              ++count;
            });
          }
        }

        return `${import_packages} \r\n\r\nexport default ${JSON.stringify(export_packages, null, 4).replace(/"{|{"/g,'')}`;
      },
      ...config
    }),
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