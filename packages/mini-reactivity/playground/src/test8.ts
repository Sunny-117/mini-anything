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

// state.c = 2;
// 对比
state.a = 2;

//为啥state.a不重新运行fn1，因为：state.a = 2，只是修改了a的值，并没有新增、删除属性
// if (type === TriggerOpTypes.ADD || type == TriggerOpTypes.DELETE) {
//     // 新增或者删除，对应的属性还要加上ITERATE_KEY
//     keys.push(ITERATE_KEY);
// }
// const triggerTypeMap = {
//     [TriggerOpTypes.SET]: [TrackOpTypes.Get],
//     [TriggerOpTypes.ADD]: [
//       TrackOpTypes.Get,
//       TrackOpTypes.ITERATE,
//       TrackOpTypes.HAS,
//     ],
//     [TriggerOpTypes.DELETE]: [
//       TrackOpTypes.Get,
//       TrackOpTypes.ITERATE,
//       TrackOpTypes.HAS,
//     ],
//   };