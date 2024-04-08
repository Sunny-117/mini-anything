import { isObject } from "lodash-es";
import { isRef } from "vue";
import { triggerSusbscriptions } from "./sub";

export function callSetup(
  id,
  setup,
  store,
  pinia,
  isSetupStore: boolean,
  actionSubscriptions: any[]
) {
  function wrapAction(action) {
    return function (...args: any) {
      const afterCallbacks: any[] = [];
      const onErrorCallbacks: any[] = [];
      const after = (callback: Function) => {
        afterCallbacks.push(callback);
      };
      const onError = (callback: Function) => {
        onErrorCallbacks.push(callback);
      };
      triggerSusbscriptions(actionSubscriptions, { after, onError });
      let res;
      // 1. 回调的方式
      try {
        // 将函数的this永远指向store
        res = action.call(store, ...args);
        triggerSusbscriptions(afterCallbacks, res);
      } catch (error) {
        triggerSusbscriptions(onErrorCallbacks, error);
      }
      // 2. 返回值是promise
      if (res instanceof Promise) {
        return res
          .then((value) => {
            triggerSusbscriptions(afterCallbacks, value);
          })
          .catch((error: any) => {
            triggerSusbscriptions(onErrorCallbacks, error);
          });
      }
      return res;
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
      // 为什么官方没有这个api：https://github.com/vuejs/core/pull/4165/files
      if (!isComputed(value)) {
        pinia.state.value[id][prop] = value;
      }
    }
  }
  Object.assign(store, setupStore);
  Object.defineProperty(store, "$state", {
    get() {
      return pinia.state.value[id];
    },
    set(newState) {
      store.$patch(newState);
    },
  });
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

function isComputed(value: any) {
  return isRef(value) && value.effect;
}
