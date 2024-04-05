import { computed, reactive, toRefs } from "vue";
import { callSetup } from "../utils";

export function createOptionStore(id: string, options, pinia) {
  const { state, actions, getters = {} } = options;
  const store = reactive({});
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
  callSetup(id, setup, store, pinia);
  return store;
}
