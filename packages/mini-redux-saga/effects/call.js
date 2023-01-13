import { createEffect, effectTypes } from "../effectHelper"
import isPromise from "is-promise"
//1. 提供了call函数，用于产生call effect
export function call(fn, ...args) {
    var context = null, //this指向
        func = fn;  //要运行的函数,默认fn
    /**
     * 兼容不同的传参方式
     */
    if (Array.isArray(fn)) {
        context = fn[0]; //this指向数组的第一项
        func = fn[1];//运行的函数指向数组的第二项
    }
    return createEffect(effectTypes.CALL, {
        context,
        fn: func,
        args
    });
}

//2. 处理call effect
export function runCallEffect(env, effect, next) {
    const { context, fn, args } = effect.payload;
    //调用函数，得到函数的返回结果
    const result = fn.call(context, ...args);
    if (isPromise(result)) {
        result.then(v => next(v))
            .catch(err => next(null, err));
    } else {
        next(result);
    }
}   