const http = require('http');

// 组合中间件
const compose = function(middlewareList) {
    return function(ctx) {

        return (function dispatch(i) {
            const fn = middlewareList[i];
            try {
                return Promise.resolve(
                    fn (ctx, dispatch.bind(null, i + 1)) // next
                );
            } catch (e) {
                return Promise.reject(e);
            }
        })(0);
    };
};

class FKoa2 {
    constructor() {
        this.middlewareList = []; // app.use 注册的中间件
    }

    use(fn) {
        this.middlewareList.push(fn);
        return this; // 返回实例后可以进行链式调用
    }

    createContext(req, res) {
        const ctx = {
            req,
            res
        };
        return ctx;
    }

    handleRequest(ctx, fn) {
        return fn(ctx);
    }

    serverHandler() {
        const fn = compose(this.middlewareList);
        return (req, res) => {
            const ctx = this.createContext(req, res);
            return this.handleRequest(ctx, fn);
        };
    }

    listen(...args) {
        const server = http.createServer(this.serverHandler());
        server.listen(...args);
    }
}

module.exports = FKoa2;