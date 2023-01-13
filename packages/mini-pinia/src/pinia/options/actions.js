export function createActions (store, actions) {
  for (let method in actions) {
    store[method] = actions[method];
  }
}