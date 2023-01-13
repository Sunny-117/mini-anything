import { createEffect, effectTypes } from "../effectHelper"
export function put(action) {
    return createEffect(effectTypes.PUT, {
        action
    })
}

export function runPutEffect(env, effect, next) {
    const action = effect.payload.action;
    const result = env.store.dispatch(action);
    next(result);
}
