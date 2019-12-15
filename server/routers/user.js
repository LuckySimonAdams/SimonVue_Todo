const Router = require('koa-router')

const userRouter = new Router({
  prefix: '/user'
})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'simon' && user.password === '1123') {
    ctx.session.user = {
      username: 'simon'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'simon'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: '用户名或密码错误'
    }
  }
})

module.exports = userRouter
