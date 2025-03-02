import { reactive, effect } from "vue";

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

// eg1: 死循环
// function fn1() {
//   console.log("fn1");
//   // fix: if (effectFn === activeEffect) { // 依赖收集的过程中不触发 continue}
//   state.a++;
// }

// effect(fn1);







// eg2: lazy

function fn() {
  console.log("fn");
}

const effectFn = effect(fn, {
  lazy: true,
});

setTimeout(() => {
  effectFn();
}, 1000);
