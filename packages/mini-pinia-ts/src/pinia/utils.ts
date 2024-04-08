import { isObject } from "lodash-es";
import { isRef } from "vue";

export function callSetup(id, setup, store, pinia, isSetupStore: boolean) {
  function wrapAction(action) {
    return function (...args: any) {
      // 将函数的this永远指向store
      action.call(store, ...args);
    };
  }
  if (isSetupStore) {
    pinia.state.value[id] = {}; // 用户存放setupStore的id对应的状态
  }
  const setupStore = setup();
  for (const prop in setupStore) {
    const value = setupStore[prop];
    if (typeof value === "function") {
      setupStore[prop] = wrapAction(value);
    } else if (isSetupStore) {
      pinia.state.value[id][prop] = value;
    }
  }
  Object.assign(store, setupStore);
  pinia._p.forEach((plugin) => {
    plugin({ store, id });
  });
  pinia._s.set(id, store);
}

export function merge(target, partialState) {
  for (const key in partialState) {
    if (!partialState.hasOwnProperty(key)) continue;
    const targetValue = target[key];
    const subPatch = partialState[key];
    if (isObject(targetValue) && isObject(subPatch) && !isRef(subPatch)) {
      target[key] = merge(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
