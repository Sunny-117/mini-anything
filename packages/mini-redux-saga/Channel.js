/**
 * 订阅频道
 */
export class Channel {
    listeners = {};

    /**
     * 添加一个订阅者
     * @param {*} prop 属性名
     * @param {*} func 订阅函数
     */
    take(prop, func) {
        if (this.listeners[prop]) {
            this.listeners[prop].push(func); //添加监听函数
        }
        else {
            this.listeners[prop] = [func];
        }
    }

    /**
     * 发布一个订阅：触发监听函数
     * @param {*} prop 触发的属性名
     * @param  {...any} args 额外的参数
     */
    put(prop, ...args) {
        if (this.listeners[prop]) {
            var funcs = this.listeners[prop]; //订阅函数的数组
            //注意：需要先删除订阅，然后再调用函数。保证运行函数过程中如果加了订阅者，就可以监听
            delete this.listeners[prop]; //移除订阅
            funcs.forEach(func => {
                func(...args);
            })
        }
    }
}