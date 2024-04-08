class Axios {
    constructor(config) {
        this.config = config;
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager(),
        };
    }
    request(config) {
        console.log('发送 AJAX 请求 请求的类型为 ' + config.method);
        //发送请求
        let promise = Promise.resolve(config);
        let chains = [dispatchRequest, undefined]; // undefined 占位,失败的回调

        //请求拦截器 将请求拦截器的回调 压入到 chains 的前面  request.handles = []
        this.interceptors.request.handlers.forEach(item => {
            chains.unshift(item.fulfilled, item.rejected);
        });
        //响应拦截器正常push
        this.interceptors.response.handlers.forEach(item => {
            chains.push(item.fulfilled, item.rejected);
        });
        while (chains.length > 0) {
            promise = promise.then(chains.shift(), chains.shift());
        }
        //调用 then 方法指定回调
        let result = promise.then(chains[0], chains[1]);
        //返回 promise 的结果
        return result;
    }
    get(config) {
        return this.request({ method: 'GET' });
    }
    post(config) {
        return this.request({ method: 'POST' });
    }
}

export function createInstance(config) {
    let context = new Axios(config);// context.get()  context.post()  但是不能当做函数使用 context() X
    //创建请求函数
    let instance = Axios.prototype.request.bind(context);// instance 是一个函数 并且可以 instance({})  此时 instance 不能 instance.get 
    //将 Axios.prototype 对象中的方法添加到instance函数对象中
    Object.keys(Axios.prototype).forEach(key => {
        instance[key] = Axios.prototype[key].bind(context);// this.default  this.interceptors
    });
    //为 instance 函数对象添加属性 default 与 interceptors
    Object.keys(context).forEach(key => {
        instance[key] = context[key];
    });
    return instance;
}

function dispatchRequest(config) {
    //调用适配器发送请求
    return xhrAdapter(config).then(response => {
        // 为了响应的结果进行转换处理，所以加上了then回调 ...
        return response;
    }, error => {
        throw error;
    });
}
// adapter 适配器
function xhrAdapter(config) {
    return new Promise((resolve, reject) => {
        //发送 AJAX 请求
        let xhr = new XMLHttpRequest();
        //初始化
        xhr.open(config.method, config.url);
        //发送
        xhr.send();
        //绑定事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                //判断成功的条件
                if (xhr.status >= 200 && xhr.status < 300) {
                    //成功的状态
                    resolve({
                        //配置对象
                        config: config,
                        //响应体
                        data: xhr.response,
                        //响应头
                        headers: xhr.getAllResponseHeaders(), //字符串  parseHeaders
                        // xhr 请求对象
                        request: xhr,
                        //响应状态码
                        status: xhr.status,
                        //响应状态字符串
                        statusText: xhr.statusText
                    });
                } else {
                    //失败的状态
                    reject(new Error('请求失败 失败的状态码为' + xhr.status));
                }
            }
        }
    });
}

//拦截器管理器构造函数
function InterceptorManager() {
    this.handlers = [];
}
InterceptorManager.prototype.use = function (fulfilled, rejected) {
    this.handlers.push({
        fulfilled,
        rejected
    })
}