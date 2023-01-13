import { createEffect, effectTypes } from "../effectHelper"


export function cancel(task) {
    return createEffect(effectTypes.CANCEL, {
        task
    })
}

export function runCancelEffect(env, effect, next) {
    // 注意区分两个next
    effect.payload.task.cancel(); // cancel中的next指向的它对应的任务的next
    next(); // 这里的next是当前的next
}