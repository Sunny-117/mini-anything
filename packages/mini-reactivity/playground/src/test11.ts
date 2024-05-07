import { reactive, effect } from "vue";

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

function fn1() {
  console.log("fn1");
  state.a++;
}

effect(fn1);

function fn() {
  console.log("fn");
}

const effectFn = effect(fn, {
  lazy: true,
});

setTimeout(() => {
  effectFn();
}, 1000);
