import { reactive, effect } from "vue";

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

function fn1() {
  console.log("fn1");
  // state.c;
  for (const key in state) {
  }
}

effect(fn1);

state.c = 2;
