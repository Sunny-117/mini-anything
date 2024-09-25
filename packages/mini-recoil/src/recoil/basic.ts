import type { voidFn, subscribeReturn } from "./types";

// 创建了一个 Map，该 Map 的 key 对应的是 string，value 是一个 Basic 类的实例
export const NameSpace = new Map();

// 创建一个叫做 Basic 的类，该类就是一个简单的状态管理工具
// 功能类似于常见的状态管理库（Redux、Mobx）
// 允许你存储一个值，并且在这个值发生变化的时候通知所有的订阅者（本质上就是一个发布订阅模式）
export class Basic<T> {
  // 这里创建了一个集合，该集合就包含了所有订阅 value 变化的回调函数
  // 每个回调函数都接收一个 T 类型的参数，这个参数就是 value 的值
  private listeners = new Set<voidFn>();

  // 接收一个可选的参数 value，该参数的类型为泛型 T
  constructor(protected value?: T) {
    // 这里主要是为了绑定 this 的指向。
    // 在 JavaScript 中，this 的指向默认指向的是调用它的对象
    // 通过这个 bind 方法，我们可以将 this 的指向绑定到 Basic 类的实例上
    this.getter = this.getter.bind(this);
    this.setter = this.setter.bind(this);
  }

  // Basic 这个类主要有 4 个方法，分别是：

  // 获取器，用于获取 value 的值
  getter() {
    // 这里的 this.value 就是 Basic 类的实例上的 value 属性
    return this.value as T;
  }

  // 设置器，用于设置 value 的值
  setter(value: T) {
    if (this.value === value) {
      // 说明传入的新的值和旧的值是一样的，抛出一个错误
      throw new Error("value is same");
    } else {
      // 进入此分支，说明新值和旧值不同，将新值赋值给 value
      this.value = value;
      // 既然值发生了改变，我需要通知所有的订阅者
      this.emit();
    }
  }

  // 该方法用于遍历所有的订阅者，并且调用它们的回调函数，将当前的 value 作为参数传入进去
  emit() {
    for (const listener of this.listeners) {
      const value = this.getter(); // 拿到新的值
      listener(value as T); // 调用订阅者的回调函数
    }
  }

  // 该方法是订阅方法，用于将一个回调函数添加到 listeners 集合中
  subscribe(callback: voidFn): subscribeReturn {
    this.listeners.add(callback);
    // 返回一个取消订阅的方法
    return {
      unsubscribe: () => {
        this.listeners.delete(callback);
      },
    };
  }
}

