import { createEffect, effectTypes } from "../effectHelper"
import runSaga from "../runSaga"

export function fork(generatorFunc, ...args) {
    return createEffect(effectTypes.FORK, {
        fn: generatorFunc,
        args
    })
}

export function runForkEffect(env, effect, next) {
    //启动一个新的任务
    var task = runSaga(env, effect.payload.fn, ...effect.payload.args);
    next(task) //当前任务不会阻塞
}