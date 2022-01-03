const http = require('http');

const LikeExpress= (function() {

    const register = function(path, ...args) { // register抽离 类里面的参数处理逻辑封装
                                                // 解析参数 得到更清晰的数据模型供注册方法使用
            const info = {};
            if (typeof path === 'string') {
                info.path = path;
                info.stack = args.slice(1); // 取出所有path后的中间件存入 stack
            } else {
                info.path = '/';
                info.stack = args;
            }
            return info;
    };

    const match = function(method, url) {
        let stack = [];
        if (url === '/favicon.ico') {
            return stack;
        }
        // 获取routes
        let curRoutes = [];
        curRoutes = curRoutes.concat(this.routes.all);
        curRoutes = curRoutes.concat(this.routes[method]);

        for (let routeInfo of curRoutes) {
            if (url.includes(routeInfo.path)) {
                stack = stack.concat(routeInfo.stack);
            }
        }
        return stack;
    };

    // 核心 next 机制
    const handle = function(req, res, resultList) {
        const next = () => {
            const middleware = resultList.shift(); // 拿到第一个匹配中间件
            if (middleware) {
                // 执行中间件函数
                middleware(req, res, next);
            }
        };
        next();
    };

    const httpCb = function() { // serverhandler
        return function(req, res) {
            res.json = (data) => { // 封装 res 返回模型
                res.setHeader('Content-type', 'application/json');
                res.end(
                    JSON.stringify(data)
                );
            }
            const url = req.url,
                method = req.method.toLowerCase(),

                resultList = this.match(method, url);
            this.handle(req, res, resultList);
        }
    };

    return class {
        constructor() {
            // 存放中间件列表
            this.routes = {
                all: [],
                get: [],
                post: [],
            }
            this.match = match;
            this.httpCb = httpCb;
            this.handle = handle;
            this.register = register;
        }

        use(...args) {
            const info = this.register(...args);
            this.routes.all.push(info);
        }
        post(...args) {
            const info = register(...args);
            this.routes.post.push(info);
        }
        get(...args) {
            const info = register(...args);
            this.routes.get.push(info);
        }

        listen(...args) {
            const server = http.createServer(httpCb());
            server.listen(...args);
        }
    };

})();

// Factory
module.exports = function() {
    return new LikeExpress();
};


/********************************************** */
const app = new LikeExpress();
