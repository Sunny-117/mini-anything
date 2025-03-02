import { reactive, effect } from "vue";

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

function fn1() {
  function fn2() {
    state.a; // 依赖那个函数呢？effect传入指定
  }
  fn2();
}

effect(fn1);
// 只要运行fn1期间用到了某个响应式数据，那么这个响应式数据要关联的函数就是fn1

// 每次派发更新都需要重新建立依赖关系，比如如下例子：
function demo() {
  if (state.a === 1) {
    state.b;
  }else{
    state.c;
  }
}
// 第一次建立依赖关系靠的事effect(fn)，第二次派发更新就没有effect(fn)执行环境了
// 所有收集依赖的时候应该收集下面三行代码：
// activeEffect = fn
// fn()
// activeEffect = null
// 达到重新收集依赖的目的
// 所以有了effectFn
// 总结本质：收集依赖，不是直接收集函数，而是运行这个函数的整个环境