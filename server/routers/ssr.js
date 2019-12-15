const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./render')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const bundle = require('../../server-build/server-entry').default

// const renderer = VueServerRenderer.createBundleRenderer(
//   path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
//   { inject: false, clientManifest }
// )

const renderer = VueServerRenderer.createRenderer({
  inject: false,
  clientManifest
})

const template = fs.readFileSync(path.join(__dirname, '../template.ejs'), 'utf-8')

const pageRouter = new Router()
pageRouter.get('*', async ctx => {
  // await serverRender(ctx, renderer, template)
  await serverRender(ctx, renderer, template, bundle)
})

module.exports = pageRouter
