const Koa = require('koa')
const send = require('koa-send')
// const koaBody = require('koa-body')
// const koaSession = require('koa-session')
const path = require('path')

// const staticRouter = require('./routers/static')

const isDev = process.env.NODE_ENV === 'development'

const app = new Koa()

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
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {
      root: path.join(__dirname, '../')
    })
  } else {
    await next()
  }
})

// app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

const pageRouter = isDev ? require('./routers/ssr-dev') : require('./routers/ssr')
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
