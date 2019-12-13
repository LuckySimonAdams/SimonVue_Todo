const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new HtmlPlugin({
    title: 'SimonTodo'
  }),
  new VueLoaderPlugin()
]

let config

if (isDev) {
  config = merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ]),
    optimization: {
      minimize: false,
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, '../dist'),
      port: 8000,
      hot: true,
      open: true
      // overlay: {
      //   errors: true
      // }
    }
  })
} else {
  config = merge(baseConfig, {
    output: {
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'main.css'
      })
    ]),
    optimization: {
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
      ],
      splitChunks: {
        chunks: 'all'
      }
      // runtimeChunk: true
    }
  })
}

module.exports = config
