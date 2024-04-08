import {
  computed,
  getCurrentInstance,
  inject,
  reactive,
  toRefs,
  watch,
} from "vue";
import { PiniaSymbol } from "./rootState";
import { callSetup, merge } from "./utils";

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
    const pinia: any = currentInstance && inject(PiniaSymbol);
    if (!pinia._s.has(id)) {
      function $patch(partialStateOrMutator: any) {
        // 部分状态: partialStateOrMutator
        // 当前store中的全部状态 pinia.state.value[id]
        if (typeof partialStateOrMutator !== "function") {
          merge(pinia.state.value[id], partialStateOrMutator);
        } else {
          partialStateOrMutator(pinia.state.value[id]);
        }
      }
      function $subscribe(callback) {
        // 默认vue3中watch一个响应式数据深度监控的可以直接放一个响应式对象
        watch(pinia.state.value[id], (state) => {
          callback({ id }, state);
        });
      }
      const partialStore = {
        $patch,
        $subscribe,
      };
      if (isSetupStore) {
        createSetupStore(id, setup, pinia, isSetupStore, partialStore);
      } else {
        createOptionStore(id, options, pinia, isSetupStore, partialStore);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  return useStore;
}

export function createOptionStore(
  id: string,
  options,
  pinia,
  isSetupStore: boolean,
  partialStore
) {
  const { state, actions, getters = {} } = options;
  partialStore.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(newState);
  };
  const store = reactive(partialStore);
  function setup() {
    pinia.state.value[id] = state ? state() : {};
    const localState = toRefs(pinia.state.value[id]); // 解构出来依旧是响应式数据
    const setupStore = Object.assign(
      localState,
      actions,
      Object.keys(getters).reduce((computeds, getterKey) => {
        computeds[getterKey] = computed(() => {
          const store = pinia._s.get(id);
          return getters[getterKey].call(store);
        });
        return computeds;
      }, {})
    );
    return setupStore;
  }
  callSetup(id, setup, store, pinia, isSetupStore);
  return store;
}

export function createSetupStore(
  id: string,
  setup,
  pinia,
  isSetupStore?: boolean,
  partialStore
) {
  const store = reactive(partialStore);
  callSetup(id, setup, store, pinia, isSetupStore);
}
