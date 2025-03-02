import { reactive } from "vue";
const obj = {}
const arr = [1, obj, 3]
const state1 = reactive(arr)

function fn() {
    const i = state1.indexOf(obj)
    console.log(i) // 应该是1
}
console.log('代理对象：', state1[1], '；原始对象：', arr[1])
fn()
// 当从代理对象中寻找的时候不再是原始对象了，而是代理过后的对象，而要找的是原始对象，解决办法：
// 1.传入的原始对象转换为代理对象
// 2.当无法在代理对象中找到时,去原始数组中重新找一次
