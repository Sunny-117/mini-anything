import { reactive } from 'vue';
import { patch } from './apis';

export default () => {

  const piniaStore = reactive({});
  
  function setSubStore (name, store) {
    if (!piniaStore[name]) {
      piniaStore[name] = store;
      piniaStore[name].$patch = patch;
    }

    return piniaStore;
  }

  function install (app) {
    app.provide('setSubStore', setSubStore); 
  }

  return {
    install
  }
}

/**
 * {
 *   install (app) {}
 * }
 * 
 * 
 */