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
