// const http = require('http');

// // 组合中间件
// const compose = function(middlewareList) {
//     return function(ctx) {

//         return (function dispatch(i) {
//             const fn = middlewareList[i];
//             try {
//                 return Promise.resolve(
//                     fn (ctx, dispatch.bind(null, i + 1)) // next
//                 );
//             } catch (e) {
//                 return Promise.reject(e);
//             }
//         })(0);
//     };
// };

// class FKoa2 {
//     constructor() {
//         this.middlewareList = []; // app.use 注册的中间件
//     }

//     use(fn) {
//         this.middlewareList.push(fn);
//         return this; // 返回实例后可以进行链式调用
//     }

//     createContext(req, res) {
//         const ctx = {
//             req,
//             res
//         };
//         return ctx;
//     }

//     handleRequest(ctx, fn) {
//         return fn(ctx);
//     }

//     serverHandler() {
//         const fn = compose(this.middlewareList);
//         return (req, res) => {
//             const ctx = this.createContext(req, res);
//             return this.handleRequest(ctx, fn);
//         };
//     }

//     listen(...args) {
//         const server = http.createServer(this.serverHandler());
//         server.listen(...args);
//     }
// }

// module.exports = FKoa2;


const http = require('http');

const compose = function(middlewareList) { // 执行堆栈里的middleware
    return function(ctx) { // next logic
        return (function (i) {
            const middleware = middlewareList[i];
            const self = arguments.callee;
            try {
                return Promise.resolve(
                    middleware(ctx, self.bind(null, i + 1))
                );
            } catch (e) {
                return Promise.reject(e);
            }
        })(0)
    };
}
class FKoa2 {
    constructor() {
        this.middlewareList = []; // signed middleware
    }

    use(fn) {
        this.middlewareList.push(fn);
        return this;
    }

    createCtx(req, res) {
        const ctx = {
            req, 
            res
        };
        return ctx;
    }

    paramHandler(ctx, fn) {
        return fn(ctx);
    }

    callback() {
        const composedFn = compose(this.middlewareList);
        return (req, res) => {
            const ctx = this.createCtx(req, res);
            this.paramHandler(ctx, composedFn);
        };
    }

    listen(...args) {
        const server = http.createServer(this.callback());
        server.listen(...args);
    }
}

module.exports = FKoa2;