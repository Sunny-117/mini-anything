import { CALL_HISTORY_METHOD, LOCATION_CHANGE } from "./actionTypes"

/**
 * 创建一个用于地址变化后改变仓库的action
 * @param {*} action 
 * @param {*} location 
 */
export function createLocationChangeAction(action, location) {
    return {
        type: LOCATION_CHANGE,
        payload: {
            action,
            location
        }
    }
}

export function push(...args) {
    return {
        type: CALL_HISTORY_METHOD,
        payload: {
            method: "push",
            args
        }
    }
}

export function replace(...args) {
    return {
        type: CALL_HISTORY_METHOD,
        payload: {
            method: "replace",
            args
        }
    }
}