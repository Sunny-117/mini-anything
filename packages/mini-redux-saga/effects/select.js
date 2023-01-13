import { createEffect, effectTypes } from "../effectHelper"

export function select(func) {
    return createEffect(effectTypes.SELECT, {
        fn: func
    })
}

export function runSelectEffect(env, effect, next) {
    var state = env.store.getState(); //得到整个仓库的数据
    if (effect.payload.fn) {
        state = effect.payload.fn(state)
    }
    next(state);
}
