const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.css', '.styl']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
  },
  plugins: [
    new HtmlPlugin({
      title: 'SimonTodo'
    }),
    new VueLoaderPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl/, // 注意结尾不能加 $
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
  config.devtool = 'cheap-module-eval-source-map'
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    port: 8000,
    hot: true,
    overlay: {
      errors: true
    }
  }
} else {
  config.output.filename = 'bundle.min.js'
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'stylus-loader'
    ]
  })
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  )
  config.optimization = {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true // 删除js代码中的console
          }
        },
        extractComments: false
      }),
      new OptimizeCssPlugin()
    ]
    // splitChunks: {
    //   chunks: 'all'
    // },
    // runtimeChunk: true
    // runtimeChunk: {
    //   name: 'runtime.[hash:8]'
    // }
  }
}

module.exports = config
