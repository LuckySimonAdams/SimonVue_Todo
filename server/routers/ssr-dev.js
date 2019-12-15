const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./render')
const serverConfig = require('../../build/webpack.server')

const mfs = new MemoryFS()
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = 'bundle未生成，请稍后'
    return
  }

  const clientManifestResp = await axios.get('http://127.0.0.1:8000/dist/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResp.data

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
  const template = fs.readFileSync(path.join(__dirname, '../template.ejs'), 'utf-8')

  await serverRender(ctx, renderer, template)
}

const pageRouter = new Router()
pageRouter.get('*', handleSSR)

module.exports = pageRouter
