import { getCurrentInstance, inject } from "vue";
import { PiniaSymbol } from "./rootState";
import { createOptionStore } from "./adaptor/options";
import { createSetupStore } from "./adaptor/setup";

export function defineStore(idOrOptions: string, setup: Function) {
  let id: string;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore() {
    // 只能在组件中使用
    const currentInstance = getCurrentInstance();
    const pinia = currentInstance && inject(PiniaSymbol);
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, pinia);
      } else {
        createOptionStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  return useStore;
}
