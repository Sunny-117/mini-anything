import { reactive } from "vue";
const obj = {}
const arr = [1, obj, 3]
const state1 = reactive(arr)

function fn() {
    const i = state1.indexOf(obj)
    console.log(i) // 应该是1
}
console.log(state1[1], arr[1])
fn()

// 1.传入的原始对象转换为代理对象
// 2.当无法在代理对象中找到时,去原始数组中重新找一次(问题：遍历了全部长度，会多收集依赖)
