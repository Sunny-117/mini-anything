'use strict';

var http = require('http');
var url = require('url');

// @ts-nocheck
let proto = {};
// proto.url = proto.request.url
function defineGetter(property, name) {
    // 自定义获取器 代理
    //proto.url = proto.request.url
    proto.__defineGetter__(name, function () {
        return this[property][name];
    });
}
function defineSetter(property, name) {
    proto.__defineSetter__(name, function (value) {
        this[property][name] = value;
    });
}
defineGetter('request', 'url');
defineGetter('request', 'path');
defineGetter('response', 'body');
defineSetter('response', 'body');

// @ts-nocheck
let request = {
    get url() {
        return this.req.url;
    },
    get path() {
        return url.parse(this.req.url).pathname;
    }
};

// @ts-nocheck
let response = {
    set body(value) {
        this.res.statusCode = 200; //只要调用了ctx.body="xxx"就会成功
        this._body = value;
    },
    get body() {
        return this._body;
    }
};

class Koa {
    constructor() {
        this.callbackFn;
        this.middlewares = [];
        this.context = proto;
        this.request = request;
        this.response = response;
    }
    use(cb) {
        this.middlewares.push(cb);
    }
    createContext(req, res) {
        //  Object.create方法的作用
        let ctx = Object.create(this.context); // 希望ctx可以拿到context的属性，但是不修改context
        ctx.request = Object.create(this.request);
        ctx.req = ctx.request.req = req;
        ctx.response = Object.create(this.response);
        ctx.res = ctx.response.res = res;
        return ctx; // 返回上下文对象
    }
    compose(ctx, middlewares) {
        function dispatch(index) {
            // 越界说明都执行完毕了
            if (index === middlewares.length)
                return Promise.resolve();
            let middleware = middlewares[index];
            // 递归创建 套起来的promise
            return Promise.resolve(middleware(ctx, () => dispatch(index + 1)));
        }
        return dispatch(0);
    }
    handleRequest(req, res) {
        res.statusCode = 404; // 默认页面找不到
        let ctx = this.createContext(req, res);
        let composeMiddleware = this.compose(ctx, this.middlewares);
        // 当回调函数执行后，ctx.body值就会发生变化
        // 当此promise执行完后 在去res.end();
        composeMiddleware.then(() => {
            let body = ctx.body;
            if (typeof body === 'undefined') {
                res.end(`Not Found`);
            }
            else if (typeof body === 'string') {
                res.end(body);
            }
        });
    }
    listen() {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments);
    }
}

module.exports = Koa;
