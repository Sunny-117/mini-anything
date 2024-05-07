import { reactive, effect } from "vue";

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

function fn1() {
  console.log("fn1");
  if (state.a === 1) {
    state.b;
  } else {
    state.c;
  }
}

effect(fn1);

state.a = 2;
// state.b = 3; // 期望不触发fn1
// state.c = 3; // 会触发fn
