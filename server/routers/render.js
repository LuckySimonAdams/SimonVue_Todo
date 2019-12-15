const ejs = require('ejs')

// module.exports = async (ctx, renderer, template) => {
module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = {
    url: ctx.path,
    user: ctx.session.user
  }

  try {
    // const appString = await renderer.renderToString(context)
    const app = await bundle(context)

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const appString = await renderer.renderToString(app, context)

    const { title } = context.meta.inject()
    const html = ejs.render(template, {
      dom: appString,
      style: context.renderStyles(),
      script: context.renderScripts(),
      title: title.text(),
      initialState: context.renderState()
    })
    ctx.body = html
  } catch (err) {
    console.error('render error: ', err)
    throw err
  }
}
