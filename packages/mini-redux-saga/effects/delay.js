import { call } from "./call"

export function delay(duration) {
    return call(function () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, duration);
        })
    })
}