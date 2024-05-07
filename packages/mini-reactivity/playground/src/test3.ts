import { reactive } from "vue";

const arr = [1, 2, 3]
const state1 = reactive(arr)

function fn() {
    state1[0]
    state1.length
    for (let i = 0; i < state1.length; i++) {
        state1[i];
    }
    for (const item of state1) {

    }
    要不要收集：将来这个信息变化后 要不要重新运行
    state1.includes(1) // 6min??
    state1.lastIndexOf(undefined)
    state1.indexOf(2)
}
fn()