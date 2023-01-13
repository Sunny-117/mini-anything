import { createEffect, effectTypes } from "../effectHelper"
export function take(actionType) {
    return createEffect(effectTypes.TAKE, {
        actionType
    })
}

export function runTakeEffect(env, effect, next) {
    const actionType = effect.payload.actionType;
    env.channel.take(actionType, action => {
        //订阅函数，当action发生的时候要运行的函数
        next(action)
    })
}