const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: process.env.NODE_ENV || 'production',
  entry: {
    // app: path.join(__dirname, '../client/index.js')
    app: path.join(__dirname, '../client/client-entry.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    // chunkFilename: '[name].[chunkhash:8].chunk.js',
    path: path.join(__dirname, '../dist'),
    publicPath: 'http://127.0.0.1:8000/dist/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.css', '.styl']
  },
  // 使用第三方库
  // externals: {
  //   three: 'THREE',
  //   cesium: 'Cesium'
  // },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /dist/, /third/],
        enforce: 'pre' // 预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          preserveWhitespace: true,
          extractCSS: !isDev,
          cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true
          }
          // hotReload: isDev  // 根据环境变量生成
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
