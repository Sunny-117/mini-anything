// import { call } from "redux-saga/effects"

function test() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve("完成")
            }
            else {
                reject("失败")
            }
        }, 2000);
    })
}

/**
* saga任务
*/
export default function* (a, b, c) {
    console.log("saga 开始", a, b, c)
    try {
        let result = yield test();
        console.log(result)
        result = yield 123
        console.log(result)
    }
    catch (err) {
        console.log(err)
        const result = yield 456
        console.log(result)
    }
}
