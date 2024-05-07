import { reactive } from "vue";

const obj = {
    a: 1,
    b: 2,
    c: {
        d: 4
    }
}
const state1 = reactive(obj)
function fn() {
    // for (const key in state1) {

    // }
    Object.keys(state1)
}
fn()
// state1.c = 3; // set
// state1.abc = 3; // add
// delete state1.a // delete
// delete state1.aaa // 不存在 不需要派发更新
console.log(state1)
state1.a = 1; // 值不变 不派发更新