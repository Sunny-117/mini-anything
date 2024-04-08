import { isReactive, isRef, toRaw, toRef } from "vue";

export { createPinia } from "./createStore";
export { defineStore } from "./store";

export function storeToRefs(store: any) {
  store = toRaw(store);
  const res: any = {};
  for (const key in store) {
    let value = store[key];
    if (isRef(value) || isReactive(value)) {
      // 说明不是不是方法
      res[key] = toRef(store, key);
    }
  }
  return res;
}
