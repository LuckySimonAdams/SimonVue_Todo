const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
// const HtmlTagsPlugin = require('html-webpack-tags-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new HtmlPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  // 使用第三方库
  // new CopyPlugin([
  //   { from: path.join(__dirname, '../third'), to: 'third' }
  // ]),
  // new HtmlTagsPlugin({
  //   append: false, // 加载到index.js之前
  //   tags: [
  //     'third/cesium_1.61/Widgets/widgets.css',
  //     'third/cesium_1.61/Cesium.js',
  //     'third/three_r111/three.min.js'
  //   ]
  // }),
  // new webpack.DefinePlugin({
  //   CESIUM_BASE_URL: JSON.stringify('third/cesium_1.61')
  // }),
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
        chunks: 'all',
        name: 'vendor'
      },
      runtimeChunk: true
    },
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'cheap-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, '../dist'),
      port: 8000,
      hot: true,
      open: true,
      historyApiFallback: {
        index: 'index.html'
      }
      // overlay: {
      //   errors: true
      // }
    }
  })
} else {
  config = merge(baseConfig, {
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2'
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
        filename: '[name].css'
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
        chunks: 'all',
        name: 'vendor'
      }
      // runtimeChunk: true
    }
  })
}

module.exports = config
