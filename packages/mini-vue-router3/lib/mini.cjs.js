'use strict';

// 为了保证VueRouter内部不需要依赖于Vue,用户在使用插件时可以传入
const install = function (Vue) {
    // install的作用就是将我们的router实例共享给每个组件
    // 把所有的方法都和组件初始化的时候进行混合
    // 只是将这个router挂载到了每个组件上
    Vue.mixin({
        beforeCreate() {
            console.log('[ this ] >', this);
            // console.log('beforeCreate', this.$options.name);
            // 区分父子关系
            // 先找到父亲,儿子找父亲的属性,孙子找父亲的
            // 组件的生命周期调用顺序 先父后子
            if (this.$options.router) {
                // 讲根实例放到了 _routerRoot上
                this._routerRoot = this;
                this._router = this.$options.router;
                this._router.init(this);
            }
            else {
                // 将根属性全部增加到了每个组件上的_routerRoot上
                // 所有的组件都可以获取_routerRoot._router获取路由的实例
                this._routerRoot = this.$options && this.$parent._routerRoot;
            }
        },
    });
};

function createRouteMap(routes, oldPathMap) {
    console.log('%c [  ]-3', 'font-size:13px; background:pink; color:#bf2c9f;', routes);
    let pathMap = oldPathMap || Object.create(null); // 没有原型链
    routes.forEach((route) => {
        addRouteRecord(route, pathMap);
    });
    return {
        pathMap,
    };
}
function addRouteRecord(route, pathMap, parent) {
    let path = parent ? `${parent.path}/${route.path}` : route.path;
    let record = {
        path,
        name: route.name,
        component: route.component,
    };
    // 根据路径匹配记录
    pathMap[path] = record;
    // 如果有儿子就递归
    if (route.children) {
        route.children.forEach((r) => {
            addRouteRecord(r, pathMap, record);
        });
    }
}

function createMatcher(routes) {
    console.log(routes);
    // matcher 有两个功能
    // 1. 添加路由 在原有的路由的基础上动态添加路由
    // 2. 匹配,根据路径匹配路由
    let { pathMap } = createRouteMap(routes);
    console.log('================================', pathMap); // 一个路径对应一条记录
    function addRoutes(routes) {
        createRouteMap(routes, pathMap);
    }
    function match(path) {
        console.log(path);
    }
    return {
        addRoutes,
        match,
    };
}

class Base {
    constructor(router) {
        // @ts-ignore
        this.router = router;
    }
    transitionTo(location, handler) {
        // 根据路径match出对应的记录
        console.log(location);
        handler && handler();
    }
}

// 确保有hash值
function ensureSlash() {
    if (window.location.hash) {
        // 取hash有兼容问题
        return;
    }
    window.location.hash = '/';
}
class Hash extends Base {
    constructor(router) {
        super(router);
        ensureSlash();
    }
    getCurrentLocation() {
        return window.location.hash.slice(1);
    }
    setupListener() {
        // hash值就是监控hash的变化
        window.addEventListener('hashchange', () => {
            console.log(this.getCurrentLocation());
            this.transitionTo(this.getCurrentLocation(), () => {
                console.log('[ 111111 ] >', 111111);
            });
        });
    }
}

class Html5 extends Base {
    constructor(router) {
        super(router);
    }
    setupListener() {
        return window.location.pathname;
    }
    getCurrentLocation() {
        // 监控浏览器 前进后退变化
        window.addEventListener('popstate', () => {
            this.transitionTo(this.getCurrentLocation(), () => {
                console.log('[ history ] 触发>', history);
            });
        });
    }
}

// @ts-nocheck
class VueRouter {
    constructor(options) {
        this.mode = options.mode;
        // 根据路径对应映射关系
        // 需要创建一个匹配器 (核心 1. 匹配 2. 动态添加)
        this.matcher = createMatcher(options.routes || []);
        console.log('[ this.matcher ] >', this.matcher);
        switch (this.mode) {
            case 'hash':
                this.history = new Hash(this); // this是router实例
                break;
            case 'history':
                this.history = new Html5(this);
                break;
        }
    }
    // 路由的初始化
    init(app) {
        console.log(app);
        // 我们希望根据路径来跳转对应的组件
        const history = this.history;
        const setupListener = () => {
            history.setupListener(); // 每种方法监控的方式不一样
        };
        // 此方法应该属于 base
        this.history.transitionTo(history.getCurrentLocation(), setupListener);
    }
}
VueRouter.install = install;

module.exports = VueRouter;
