const Koa = require('./like');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('1 - start');
  await next();
  const ms = Date.now() - start;
  ctx['X-Response-Time'] = `${ms}ms`;
  console.log('1 - end')
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('2 - start');
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.req.method} ${ctx.req.url} - ${ms}`);
  console.log('2 - end');
});

// response

app.use(async ctx => {
    ctx.res.end('koa2 imitation...');
});

app.listen(8000);