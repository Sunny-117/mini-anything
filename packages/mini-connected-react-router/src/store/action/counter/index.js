export const actionTypes = {
    increase: "INCREASE",
    decrease: "DECREASE",
    asyncIncrease: "ASYNC_INCREASE", //异步增加
    asyncDecrease: "ASYNC_DECREASE"
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