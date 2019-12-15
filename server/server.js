const Koa = require('koa')
const send = require('koa-send')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const path = require('path')

const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const createDb = require('./routers/db')
const appConfig = require('../app.config')

const isDev = process.env.NODE_ENV === 'development'

const db = createDb(appConfig.apiCloud.appId, appConfig.apiCloud.appKey)

const app = new Koa()

app.keys = ['vue ssr todo']
app.use(koaSession({
  key: 'v-ssr-id', // 用于cookie验证
  maxAge: 2 * 60 * 60 * 1000 // 过期时间(2h)，以毫秒为单位
}, app))

app.use(async (ctx, next) => {
  try {
    console.log(`request with path: ${ctx.path}`)
    await next()
  } catch (err) {
    console.error(err)
    ctx.status = 500
    isDev ? ctx.body = err.message : ctx.body = 'please try again later'
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(koaBody())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

const pageRouter = isDev ? require('./routers/ssr-dev') : require('./routers/ssr')
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
