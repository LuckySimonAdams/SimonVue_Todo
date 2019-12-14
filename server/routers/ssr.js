const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./render')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const renderer = VueServerRenderer.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  { inject: false, clientManifest }
)

const template = fs.readFileSync(path.join(__dirname, '../template.ejs'), 'utf-8')

const router = new Router()
router.get('*', async ctx => {
  await serverRender(ctx, renderer, template)
})

module.exports = router
