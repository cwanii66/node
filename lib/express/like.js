// const http = require('http');

// const LikeExpress= (function() {

//     const register = function(...args) { // register抽离 类里面的参数处理逻辑封装
//                                                 // 解析参数 得到更清晰的数据模型供注册方法使用
//             const info = {};
//             if (typeof path === 'string') {
//                 info.path = path;
//                 info.stack = args.slice(1); // 取出所有path后的中间件存入 stack
//             } else {
//                 info.path = '/';
//                 info.stack = args;
//             }
//             return info;
//     };

//     const match = function(method, url) {
//         let stack = [];
//         if (url === '/favicon.ico') {
//             return stack;
//         }
//         // 获取routes, 找到已经注册的可用中间件
//         let curRoutes = [];
//         curRoutes = curRoutes.concat(this.routes.all);
//         curRoutes = curRoutes.concat(this.routes[method]);

//         for (let routeInfo of curRoutes) {
//             if (url.includes(routeInfo.path)) {
//                 stack = stack.concat(routeInfo.stack);
//             }
//         }
//         return stack;
//     };

//     // 核心 next 机制
//     const handle = function(req, res, resultList) {
//         const next = () => {
//             const middleware = resultList.shift(); // 拿到第一个匹配中间件
//             if (middleware) {
//                 // 执行中间件函数
//                 middleware(req, res, next);
//             }
//         };
//         next();
//     };

//     const httpCb = (function() { // serverhandler
//         return function(req, res) {
//             res.json = (data) => { // 封装 res 返回模型
//                 res.setHeader('Content-type', 'application/json');
//                 res.end(
//                     JSON.stringify(data)
//                 );
//             }
//             const url = req.url,
//                 method = req.method.toLowerCase(),

//                 resultList = this.match(method, url);
//             this.handle(req, res, resultList);
//         }
//     })();

//     return class {
//         constructor() {
//             // 存放中间件列表
//             this.routes = {
//                 all: [], // app.use
//                 get: [], // app.get
//                 post: [], // app.post
//             }
//             this.match = match;
//             this.httpCb = httpCb;
//             this.handle = handle;
//             this.register = register;
//         }

//         use(...args) {
//             const info = this.register(...args);
//             this.routes.all.push(info);
//         }
//         post(...args) {
//             const info = this.register(...args);
//             this.routes.post.push(info);
//         }
//         get(...args) {
//             const info = this.register(...args);
//             this.routes.get.push(info);
//         }

//         listen(...args) {
//             const server = http.createServer(this.httpCb);
//             server.listen(...args);
//         } // 开始监听请求，注册代码开始执行
//     };

// })();

// // Factory
// module.exports = function() {
//     return new LikeExpress();
// };

const http = require('http');
class FExpress {
    constructor() {
        this.routes = { // 注册堆栈 => 类似于发布订阅模式的clientList
            use: [], // app.use ...
            get: [], // app.get ...
            post: [] // app.post ...
        }
    }

    register(...args) { // 分离 处理参数逻辑 和 注册逻辑
        const path = args[0];
        const registerInfo = {};

        if (typeof path === 'string') {
            registerInfo.path = path;
            registerInfo.middlewareStack = args.slice(1);
        } else {
            registerInfo.path = '/';
            registerInfo.middlewareStack = args;
        }
        return registerInfo;
    }

    match(method, url) {
        let workStack = [],
            curRoutes = [];

        if (url === '/favicon.ico') {
            return workStack;
        }
        curRoutes = curRoutes.concat(this.routes.use);
        curRoutes = curRoutes.concat(this.routes[method]);
        
        curRoutes.forEach((route) => {
            if (url.includes(route.path)) {
                workStack.push(...route.middlewareStack);
            }
        });
        return workStack;
    }

    handle(req, res, middlewareList) {
        const next = () => {
            const middleware = middlewareList.shift();
            if (middleware) {
                middleware(req, res, next);
            }
        };
        next();
    }

    httpCb() { // serverhandler
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json');
                res.end(
                    JSON.stringify(data)
                );
            };
            const url = req.url,
                method = req.method.toLowerCase();

            const middlewareList = this.match(method, url);
            this.handle(req, res, middlewareList);
        };
    }

    use(...args) {
        const useRegisterInfo = this.register(...args);
        this.routes.use.push(useRegisterInfo);
    }
    get(...args) {
        const getRegisterInfo = this.register(...args);
        this.routes.get.push(getRegisterInfo);
    }
    post(...args) {
        const postRegisterInfo = this.register(...args);
        this.routes.post.push(postRegisterInfo);
    }

    listen(...args) { // global trigger
        const server = http.createServer(this.httpCb());
        server.listen(...args);
    }
}

// FExpress instance Factory
module.exports = function() {
    return new FExpress(); 
};

// const http = require('http')
// const slice = Array.prototype.slice

// class LikeExpress {
//     constructor() {
//         // 存放中间件的列表
//         this.routes = {
//             all: [],   // app.use(...)
//             get: [],   // app.get(...)
//             post: []   // app.post(...)
//         }
//     }

//     register(path) {
//         const info = {}
//         if (typeof path === 'string') {
//             info.path = path
//             // 从第二个参数开始，转换为数组，存入 stack
//             info.stack = slice.call(arguments, 1)
//         } else {
//             info.path = '/'
//             // 从第一个参数开始，转换为数组，存入 stack
//             info.stack = slice.call(arguments, 0)
//         }
//         return info
//     }

//     use() {
//         const info = this.register.apply(this, arguments)
//         this.routes.all.push(info)
//     }

//     get() {
//         const info = this.register.apply(this, arguments)
//         this.routes.get.push(info)
//     }

//     post() {
//         const info = this.register.apply(this, arguments)
//         this.routes.post.push(info)
//     }

//     match(method, url) {
//         let stack = []
//         if (url === '/favicon.ico') {
//             return stack
//         }

//         // 获取 routes
//         let curRoutes = []
//         curRoutes = curRoutes.concat(this.routes.all)
//         curRoutes = curRoutes.concat(this.routes[method])

//         curRoutes.forEach(routeInfo => {
//             if (url.indexOf(routeInfo.path) === 0) {
//                 // url === '/api/get-cookie' 且 routeInfo.path === '/'
//                 // url === '/api/get-cookie' 且 routeInfo.path === '/api'
//                 // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie'
//                 stack = stack.concat(routeInfo.stack)
//             }
//         })
//         return stack
//     }

//     // 核心的 next 机制
//     handle(req, res, stack) {
//         const next = () => {
//             // 拿到第一个匹配的中间件
//             const middleware = stack.shift()
//             if (middleware) {
//                 // 执行中间件函数
//                 middleware(req, res, next)
//             }
//         }
//         next()
//     }

//     callback() {
//         return (req, res) => {
//             res.json = (data) => {
//                 res.setHeader('Content-type', 'application/json')
//                 res.end(
//                     JSON.stringify(data)
//                 )
//             }
//             const url = req.url
//             const method = req.method.toLowerCase()

//             const resultList = this.match(method, url)
//             this.handle(req, res, resultList)
//         }
//     }

//     listen(...args) {
//         const server = http.createServer(this.callback())
//         server.listen(...args)
//     }
// }

// // 工厂函数
// module.exports = () => {
//     return new LikeExpress()
// }
