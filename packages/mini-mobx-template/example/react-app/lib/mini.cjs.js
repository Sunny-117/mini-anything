'use strict';

let nowFn = null; // nowFn当前的autorun方法
let counter = 0;
class Reaction {
    constructor() {
        this.id = ++counter;
        this.store = {}; // 存储当前可观察对象对应的nowFn {id:[nowFn]}
    }
    run() {
        if (this.store[this.id]) {
            this.store[this.id].forEach(w => {
                w();
            });
        }
    }
    collect() {
        // 当前有需要绑定的函数 才进行绑定 没有的话 我就先不理他
        if (nowFn) {
            this.store[this.id] = this.store[this.id] || [];
            this.store[this.id].push(nowFn);
        }
    }
    static start(handler) {
        nowFn = handler;
    }
    static end() {
        nowFn = null;
    }
}

let autorun = (handler) => {
    Reaction.start(handler); // 先保存了这个函数
    handler(); // 调用这个方法会触发get属性 
    Reaction.end();
};

// 深度代理
function deepProxy(val, handler) {
    if (typeof val !== 'object')
        return val;
    for (let key in val) { // 从后往前依次实现代理的功能
        val[key] = deepProxy(val[key], handler);
    }
    return new Proxy(val, handler());
}
function createObservable(val) {
    let handler = () => {
        let reaction = new Reaction();
        return {
            get(target, key) {
                reaction.collect();
                return Reflect.get(target, key);
            },
            set(target, key, value) {
                if (key === 'length')
                    return true;
                let r = Reflect.set(target, key, value);
                reaction.run();
                return r;
            }
        };
    };
    return deepProxy(val, handler);
}
function observable(target, key, descritor) {
    if (typeof key === 'string') { //是通过装饰器实现的，先把装饰的对象进行深度代理
        let v = descritor.initializer();
        v = createObservable(v);
        let reaction = new Reaction();
        return {
            enumerable: true,
            configurable: true,
            get() {
                reaction.collect();
                return v;
            },
            set(value) {
                v = value;
                reaction.run();
            }
        };
    }
    // 需要将这个目标对象 进行代理操作 创建成可观察对象
    return createObservable(target);
}

function observer(target) {
    let cwm = target.prototype.componentWillMount;
    target.prototype.componentWillMount = function () {
        cwm && cwm.call(this);
        autorun(() => {
            this.render();
            this.forceUpdate();
        });
    };
}

exports.autorun = autorun;
exports.observable = observable;
exports.observer = observer;
