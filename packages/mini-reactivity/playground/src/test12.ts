import { reactive, effect } from "vue";

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

function fn1() {
  console.log("fn1");
  state.a;
}

let isRun = false;
const effectFn = effect(fn1, {
  lazy: true,
  scheduler: (effect: Function) => {
    // console.log("scheduler");
    Promise.resolve().then(() => {
      if (!isRun) {
        isRun = true;
        effect();
      }
    });
  },
});

effectFn();

state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
