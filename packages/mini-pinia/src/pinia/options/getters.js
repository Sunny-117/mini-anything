import { computed } from 'vue';

export function createGetters (store, getters) {
  for (let getter in getters) {
    store[getter] = computed(getters[getter].bind(store.$state, store.$state));
    store.$state[getter] = store[getter];
  }
}