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

// ↓↓↓只希望触发2次fn1
state.a = 2; // 这里改成2后，收集的依赖由[a, b]->[a, c],就没有b了
state.b = 3; // 所以期望不触发fn1
// 解决：fn记录自己都处于什么集合中：fn.deps = [set1, set2]，这就可以在运行这个函数之前先找到这些集合cleanup，然后再重新收集依赖
// ↑↑↑只希望触发2次fn1




// state.c = 3; // 会触发fn
