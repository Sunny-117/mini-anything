import { reactive, toRef } from 'vue';

export function createState (store, state) {
  const _state = state();
  store.$state = reactive(_state);

  for (let key in _state) {
    store[key] = toRef(store.$state, key);
  }
}