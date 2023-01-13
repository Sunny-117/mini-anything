export const actionTypes = {
    increase: Symbol("increase"),
    decrease: Symbol("decrease"),
    asyncIncrease: Symbol("async-increase"), //异步增加
    asyncDecrease: Symbol("async-decrease"),
    autoIncrease: Symbol("auto-increase"), //自动增加
    stopAutoIncrease: Symbol("stop-auto-increase") //停止自动增加
}

export function increase() {
    return { type: actionTypes.increase }
}

export function decrease() {
    return { type: actionTypes.decrease }
}

export function asyncIncrease() {
    return { type: actionTypes.asyncIncrease }
}

export function asyncDecrease() {
    return { type: actionTypes.asyncDecrease }
}

export function autoIncrease() {
    return { type: actionTypes.autoIncrease }
}

export function stopAutoIncrease() {
    return { type: actionTypes.stopAutoIncrease }
}