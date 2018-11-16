const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BitorPlugin = require('../application/webpack-watcher');

var path = require('path');

module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new htmlPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new BitorPlugin({
      root: process.cwd() + '/app',
      cachefile: '.classloader.js',
      rules: {
        // 自动生成
        components: ["components/**/*.vue"],
        controllers: "controllers/**/*.js",
      },
      onAddCallback: function (ns, path) {
        console.log('add', ns, path)
      },
      onUnlinkCallback: function (ns, path) {
        console.log('del', ns, path)
      },
      onChangeCallback: function (ns) {
        console.log('change', ns)
      },
      onCacheChange(files) {
        console.log(files)
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
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    port: 9001,
    hot: true,
    compress: false,
    inline: true,
  },
  watchOptions: {
    ignored: [require('path').resolve(__dirname, './dist/**/*.*'), 'node_modules']
  },
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
        test: /\.css$/,
        use: ['css-loader', 'less-loader']
      }, {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}