const express = require('express');

// 本次http请求instance
const app = express();

app.use((req, res, next) => {
    console.log('start req...', req.method, req.url);
    next();
});

app.use((req, res, next) => {
    // 处理 cookie
    req.cookie = {
        userId: 'abc123'
    };
    next();
});

app.use((req, res, next) => {
    // 假设处理post data
    // 异步
    setTimeout(() => {
        req.body = {
            a: 1,
            b: 2
        };
        next();
    }, 0);
});

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由');
    next();
});

app.get('/api', (req, res, next) => {
    console.log('get /api 路由');
    next();
});

app.post('/api', (req, res, next) => {
    console.log('post /api 路由');
    next();
});

const loginCheck = function(req, res, next) { // express 中间件将各个功能解耦、拆分
    console.log('模拟登陆失败');
    setTimeout(() => {
        res.json({
            errno: -1,
            msg: '登录失败'
        });
        // console.log('模拟登陆成功');
        // next();   ->  执行next代表操作成功
    });
};

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie');
    res.json({
        errno: 0,
        data: req.cookie
    });
});

app.post('/api/get-post-data', (req, res, next) => {
    console.log('post /api/get-post-data');
    res.json({
        errno: 0,
        data: req.body
    });
});

app.use((req, res, next) => {
    console.log('处理 404');
    res.json({
        errno: -1,
        msg: '404 Not Found'
    });
});

app.listen(8005, () => {
    console.log('server is running on port 8005...');
});