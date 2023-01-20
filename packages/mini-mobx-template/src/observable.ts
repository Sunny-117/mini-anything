import Reaction from './reaction';
// 深度代理
function deepProxy(val, handler) {
  if (typeof val !== 'object') return val;
  for (let key in val) { // 从后往前依次实现代理的功能
    val[key] = deepProxy(val[key], handler);
  }
  return new Proxy(val, handler());
}
function createObservable(val) {
  let handler = () => {
    let reaction = new Reaction();
    return {
      get(target, key) {
        reaction.collect();
        return Reflect.get(target, key)
      },
      set(target, key, value) {
        if (key === 'length') return true
        let r = Reflect.set(target, key, value)
        reaction.run();
        return r
      }
    }
  }
  return deepProxy(val, handler)
}
function observable(target, key, descritor) {
  if (typeof key === 'string') { //是通过装饰器实现的，先把装饰的对象进行深度代理
    let v = descritor.initializer();
    v = createObservable(v);
    let reaction = new Reaction();
    return {
      enumerable: true,
      configurable: true,
      get() {
        reaction.collect();
        return v;
      },
      set(value: any) {
        v = value;
        reaction.run();
      }
    }
  }
  // 需要将这个目标对象 进行代理操作 创建成可观察对象
  return createObservable(target)
}

export default observable;