export function persitisPlugin() {
  return ({ store, id }) => {
    // 所有的store都会执行此方法
    localStorage.setItem(id, JSON.stringify(store));
    store.$subscribe((state) => {});
  };
}
