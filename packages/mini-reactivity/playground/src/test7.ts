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
