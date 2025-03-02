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
    
    obj.d.e; // 需要收集到d和e的依赖-——>深度代理


    "z" in obj; // -> has内部方法，当z原来有，但是z的值变化的时候 不需要触发set，因为这种只关心key是否存在，不关心key的值
}
fn();
