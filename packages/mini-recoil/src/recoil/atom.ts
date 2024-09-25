// atom 是如何使用的
// const counter1 = atom({
//   key: "counter1",
//   default: 0,
// });
import type { AtomContext } from "./types";
import { Basic, NameSpace } from "./basic";

export class Atom<T> extends Basic<T> {
  value: T;

  // Atom 类的构造函数接收一个 AtomContext 类型的参数
  // 该参数是一个对象，包含了 key 和 default 两个属性
  // key 是一个 string 类型的值，default 是一个泛型 T 类型的值
  // 最终将对应的 context.default 赋值给 this.value
  constructor(context: AtomContext<T>) {
    super();
    this.value = context.default;
  }
}

export const atom = <T>(value: AtomContext<T>) => {
  // 首先我们需要判断传入的值的 key 是否已经存在
  if (NameSpace.has(value.key)) {
    // 进入此分支，说明当前的 NameSpace 中已经存在了该 key
    // 这里可以抛出一个错误
    throw new Error(`${value.key} is exist`);
  } else {
    // 说明不存在，那么这里就可以创建一个 Atom 的实例对象，然后添加到 NameSpace 中
    // defaultValue 就是一个 Atom 的实例对象
    const defaultValue = new Atom(value);
    // 将 defaultValue 添加到 NameSpace 中
    // NameSpace 是一个 Map，它的 key 是 string 类型，value 是 Atom 类的实例
    NameSpace.set(value.key, defaultValue);
    // 向外部返回 Atom 的实例对象
    return defaultValue;
  }
};

