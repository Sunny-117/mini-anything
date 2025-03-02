import { reactive, effect } from "vue";

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

function fn1() {
  console.log("fn1");
  effect(() => {
    console.log("inner");
    state.a;
  });
  state.b;
}

effect(fn1);
state.a = 3;
state.b = 3;

// 如果不用stack：[执行栈的问题，执行逻辑和执行栈的执行逻辑失调]
// activeEffect: null -> fn1 -> inner fn -> null 所以state.b的依赖就收集不到了
// 所以需要使用stack