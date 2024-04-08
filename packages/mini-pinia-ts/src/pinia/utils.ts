export function callSetup(id, setup, store, pinia) {
  function wrapAction(action) {
    return function (...args: any) {
      // 将函数的this永远指向store
      action.call(store, ...args);
    };
  }
  const setupStore = setup();
  for (const prop in setupStore) {
    const value = setupStore[prop];
    if (typeof value === "function") {
      setupStore[prop] = wrapAction(value);
    }
  }
  Object.assign(store, setupStore);
  pinia._p.forEach((plugin) => {
    plugin({ store, id });
  });
  pinia._s.set(id, store);
}
