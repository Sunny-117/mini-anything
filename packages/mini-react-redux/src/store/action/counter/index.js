export const actionTypes = {
    increase: Symbol("increase"),
    decrease: Symbol("decrease"),
    asyncIncrease: Symbol("async-increase"), //异步增加
    asyncDecrease: Symbol("async-decrease")
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