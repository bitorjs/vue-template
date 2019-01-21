const htmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const autoprefixer = require('autoprefixer');
var path = require('path');
const cwd = process.cwd();
const babel = require(path.join(cwd, '.babelrc.js'));

module.exports = {
  entry: {
    app: './app.js',
    normalize: 'normalize.css',
  },
  externals: [{
    ui: './packages'
  }],
  output: {
    filename: '[name].build.js',
    path: path.resolve(cwd, 'dist'),
    chunkFilename: '[chunkhash].chunk.js'
  },
  plugins: [
    new htmlPlugin({
      filename: 'index.html',
      template: path.resolve(cwd, 'index.html'),
      title: "app",
      chunks: ['app']
    }),
    new VueLoaderPlugin(),
    autoprefixer
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
        options: babel
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            outputPath: 'assets/' // 图片打包后存放的目录
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      }
    ]
  }
}