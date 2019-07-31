const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const session = require('koa-session')

const app = new Koa()

// https://github.com/koajs/session#example
const CONFIG = {
  key: 'koa:session',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false
}
app.keys = ['some session']
app.use(session(CONFIG, app))

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    // ctx.status = 200
    // ctx.respond = false // Bypass Koa's built-in response handling
    // ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    // // 设置session，自己添加；之后可以在 req 上拿到
    // ctx.req.session = ctx.session
    // // 用 Nuxt.js 渲染每个路由
    // // 建议把 nuxt.render 放到中间件列表的最后面，因为它不会再调用 next() 方法，而是直接处理你 web 应用的页面渲染。
    // nuxt.render(ctx.req, ctx.res)

    // ignore favicon
    // if (ctx.path === '/favicon.ico') return;
    //
    // let n = ctx.session.views || 0;
    // ctx.session.views = ++n;
    // ctx.body = n + ' views';

    ctx.session.user = {
      name: 'jeff',
      age: 30
    }
    ctx.req.session = ctx.session
    ctx.body = ctx
    console.log(ctx.session)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
