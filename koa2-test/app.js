const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');

// const index = require('./routes/index')
// const users = require('./routes/users')
const blog = require('./routes/blog');
const user = require('./routes/user');

const { REDIS_CONFIG } = require('./config/db');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({ // 协助解析中间件
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start // 耗时
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session 配置
app.keys = ['fads_da23a83'];
app.use(session({
  // 配置cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置redis
  store: redisStore({
    // all: '127.0.0.1:6379' // 写死本地redis
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
})); // session => 符合koa2规范的中间件函数 => 类似于原始版本的简易session封装，session() return 的 function 也为我们封装对应的session模型

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
