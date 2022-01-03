var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session); // 拿到对应指定session的RedisStore类
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express(); // init app instance

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  // 开发环境 或 测试环境
  app.use(logger('dev', {
    stream: process.stdout
  }));
} else {
  // 线上环境(production)
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  });
  app.use(logger('combined', {
    stream: writeStream
  }));
}


app.use(express.json());
app.use(express.urlencoded({ extended: false })); // postman x-www-form-urlencode test
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
});

app.use(session({
  secret: 'cwluvani_123',
  cookie: {
    // path: '/', // default
    // httpOnly: true, // default
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore // session 存在 redis中
}));

// init root
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // 对比vue的路由守卫
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
