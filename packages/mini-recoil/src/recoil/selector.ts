// selector 是如何使用的
// const sum = selector({
//   key: "sum",
//   get: ({ get }) => {
//     const counter1Value = get(counter1);
//     const counter2Value = get(counter2);
//     return counter1Value + counter2Value;
//   },
// });

import { Basic, NameSpace } from "./basic";
import type { SelectorContext, RecoilState } from "./types";

export class Selector<T> extends Basic<T> {
  // 这是一个集合，用于存放所有的依赖项
  private registeredDeps = new Set();

  // 该方法就是用来返回一个 atom 或者 selector 的值
  // 并且在获取到最新的值之后，还需要通知所有的订阅者
  private updateSelector() {
    // 首先使用 context.get 方法获取到最新的值
    this.value = this.context.get({
      get: <T>(dep: RecoilState<T>) => dep.getter() as T,
    });
    // 调用 emit 方法来通知所有的订阅者
    this.emit();
  }

  // 该方法就是用来返回一个 atom 或者 selector 的值
  private bindAtom<V>(dep: RecoilState<V>): V {
    // 在获取值之前，其实还有事情要做
    // 我们需要订阅这个依赖项的变化，并且在依赖项变化的时候调用 updateSelector 方法
    dep.subscribe(() => this.updateSelector());
    this.registeredDeps.add(dep);
    return dep.getter() as V;
  }

  constructor(private readonly context: SelectorContext<T>) {
    super();
    // 接下来修改 value 值
    this.value = context.get({
      // 下面的 get 方法需要返回 atom 或者 selector 的值
      get: <T>(dep: RecoilState<T>) => this.bindAtom(dep),
    });
  }

  // setter 方法
  // 主要用于设置 Selector 的值
  setter() {
    if (this.context.set) {
      // 如果开发者在调用 selector 的时候传入了 set 方法
      // 那么就调用 set 方法
      this.context.set({
        get: <T>(dep: RecoilState<T>) => dep.getter() as T,
        set: <V>(dep: RecoilState<V>, value?: V) => dep.setter(value as V),
      });
    } else {
      // 说明开发者没有传递 set 方法
      throw new Error(`Selector ${this.context.key} has no setter`);
    }
  }
}

export const selector = <T>(context: SelectorContext<T>) => {
  if (NameSpace.has(context.key)) {
    // 如果已经存在了，就抛出错误
    throw new Error(`Atom ${context.key} is already defined`);
  } else {
    // 进入此分支，说明还没有定义过
    // 我们就需要先创建一个 Selector 的实例对象，然后把它放到 NameSpace 中
    const defaultValue = new Selector(context);
    // 将 defaultValue 添加到 NameSpace 中
    NameSpace.set(context.key, defaultValue);
    // 向外界返回这个 Selector 的实例对象
    return defaultValue;
  }
};

