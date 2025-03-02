import { reactive } from "vue";

const arr = [1, 2, 3]
const state1 = reactive(arr)
// 以下case依赖收集都很完美
function fn() {
    state1[0]
    state1.length
    for (let i = 0; i < state1.length; i++) {
        state1[i];
    }
    for (const item of state1) { // 调用对象的Iterator方法
    }
    // 要不要收集：将来这个信息变化后 要不要重新运行
    state1.includes(1)
    state1.lastIndexOf(undefined) // 要经过has方法 因为稀疏数组[1,2,,,].lastIndexOf(undefined)=-1
    state1.indexOf(2)
}
fn()