import { createEffect, effectTypes } from "../effectHelper"
import { proc } from "../runSaga"

export function all(generators) {
    return createEffect(effectTypes.ALL, {
        generators: generators || []
    })
}
export function runAllEffect(env, effect, next) {
    const generators = effect.payload.generators;
    const tasks = generators.map(g => proc(env, g));
    // 等待所有的tasks全部完成之后，再调用next
    // 得到一个promise的数组
    const proms = tasks.map(t => t.toPromise())
    Promise.all(proms).then(v => next());
}