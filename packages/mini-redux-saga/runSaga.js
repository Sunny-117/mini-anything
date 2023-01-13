import { Task } from "./Task";
import isGenerator from "is-generator";
import { isEffect } from "./effectHelper"
import isPromise from "is-promise"
import runEffect from "./runEffect"

/**
 * 开启一个新任务
 * @param {*} env 全局环境的数据，被saga执行期共享的数据
 * @param {*} generatorFunc 生成器函数
 * @param {*} args 生成器函数的参数
 */
export default function (env, generatorFunc, ...args) {
    const iterator = generatorFunc(...args);
    if (isGenerator(iterator)) {
        return proc(env, iterator);
    }
    else {
        console.log("一个普通函数")
    }
}

/**
 * 执行一个generator（iterator） 
 */
export function proc(env, iterator) {
    var cbObj = {//回调函数对象
        callback: null
    }
    next(); //启动任务
    /**
         * 
         * @param {*} nextValue 正常调用iterator.next时，传递的值
         * @param {*} err 错误对象
         * @param {boolean} isOver 是否结束
         */
    function next(nextValue, err, isOver) {
        let result; //记录迭代的结果 {value: xxx, done: false}
        if (err) {
            result = iterator.throw(err)
        }
        else if (isOver) {
            result = iterator.return(); //结束整个迭代
            //调用一个回调函数
            cbObj.callback && cbObj.callback();
        }
        else {
            result = iterator.next(nextValue);
        }
        //解构出value和done
        const { value, done } = result;
        if (done) {
            //迭代结束了
            cbObj.callback && cbObj.callback();
            return;
        }

        //没有结束
        if (isEffect(value)) {
            //情况1：是一个effect对象
            runEffect(env, value, next)
        }
        else if (isPromise(value)) {
            //情况2：value是一个promise______yield后面是一个promise
            value.then(r => next(r))
                .catch(err => next(null, err))
        }
        else {
            //情况3：其他
            next(value); //直接进行下一步
        }
    }

    return new Task(next, cbObj);
}