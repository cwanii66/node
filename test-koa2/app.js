const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('1 - start');
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('1 - end')
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('2 - start');
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  console.log('2 - end');
});

// response

app.use(async ctx => {
    console.log('3 - start');
  ctx.body = 'Hello World';
  console.log('3 - end');
});

app.listen(3000);