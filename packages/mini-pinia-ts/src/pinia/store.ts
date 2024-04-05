import { computed, getCurrentInstance, inject, reactive, toRefs } from "vue";
import { PiniaSymbol } from "./rootState";

function createOptionStore(id, options, pinia) {
  const { state, actions, getters = {} } = options;
  const store = reactive({});
  function wrapAction(action) {
    return function (...args: any) {
      // 将函数的this永远指向store
      action.call(store, ...args);
    };
  }
  function setup() {
    pinia.state.value[id] = state ? state() : {};
    const localState = toRefs(pinia.state.value[id]); // 解构出来依旧是响应式数据
    const setupStore = Object.assign(
      localState,
      actions,
      Object.keys(getters).reduce((computeds, getterKey) => {
        computeds[getterKey] = computed(() => {
          return getters[getterKey].call(store);
        });
        return computeds;
      }, {})
    );
    return setupStore;
  }
  const setupStore = setup();
  for (const prop in setupStore) {
    const value = setupStore[prop];
    if (typeof value === "function") {
      setupStore[prop] = wrapAction(value);
    }
  }
  Object.assign(store, setupStore);
  pinia._s.set(id, store);
  return store;
}
export function defineStore(idOrOptions, setup) {
  let id;
  let options;

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
    console.log(pinia);
    if (!pinia._s.has(id)) {
      createOptionStore(id, options, pinia);
    }
    const store = pinia._s.get(id);
    return store;
  }
  return useStore;
}
