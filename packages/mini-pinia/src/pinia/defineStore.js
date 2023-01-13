import { reactive, inject } from 'vue';

import {
  createState,
  createActions,
  createGetters
} from './options';

export default (
  name,
  {
    state, // function
    getters,
    actions
  }
) => {
  const store = {};

  state && typeof state === 'function' && createState(store, state);
  actions && Object.keys(actions).length > 0 && createActions(store, actions);
  getters && Object.keys(getters).length > 0 && createGetters(store, getters);

  return () => {
    const setSubStore = inject('setSubStore');
    const piniaStore = setSubStore(name, reactive(store));

    return piniaStore[name];
  }
}