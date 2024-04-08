// 订阅
export function addSubscription(subscriptions: Function[], callback: Function) {
  subscriptions.push(callback);

  const removeSubcribe = () => {
    const index = subscriptions.indexOf(callback);
    if (index !== -1) {
      subscriptions.splice(index, 1);
    }
  };
  return removeSubcribe;
}

// 发布
export function triggerSusbscriptions(subscriptions: Function[], ...args: any) {
  // 要先拷贝一份，防止在订阅中添加新的订阅，死循环
  subscriptions.slice().forEach((fn) => {
    fn(...args);
  });
}
