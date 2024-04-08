export function persitisPlugin() {
  return ({ store, id }) => {
    const oldState = JSON.parse(localStorage.getItem(id) || "{}");
    console.log(oldState, "oldState");
    // 注意：计算属性不能赋值
    // 方法1
    // store.$patch(oldState); // utils.ts:73 Uncaught (in promise) TypeError: 'set' on proxy: trap returned falsish for property 'double'
    // 方法2
    store.$state = oldState;
    // 所有的store都会执行此方法
    store.$subscribe((mutation, state) => {
      localStorage.setItem(id, JSON.stringify(state));
    });
  };
}
