import { reactive } from 'vue'

const obj = reactive({
    a: 1,
    b: 2,
    get c() {
        console.log(this);
        return this.a + this.b;
    },
    d: {
        e: 1,
    },
});
function fn() {
    // obj.c; // 用target[key] 只会捕获到c。原因是this指向的是obj，并不是代理对象
    // 需要改变this指向
    // obj.d.e;
    "z" in obj;
}
fn();
