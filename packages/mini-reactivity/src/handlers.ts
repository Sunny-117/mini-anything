import { pauseTracking, resumeTracking, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";
import { reactive } from "./reactive";
import { hasChanged, isObject } from "./utils";

const RAW = Symbol("raw");

const arrayInstrumentations = {};

["includes", "indexOf", "lastIndexOf"].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    // 1. 正常找
    const res = Array.prototype[key].apply(this, args);
    // 2. 找不到，从原始对象中找
    if (res < 0 || res === false) {
      console.log("找不到，重新再原始对象中找一遍");
      return Array.prototype[key].apply(this[RAW], args);
    }
    return res;
  };
});

["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    pauseTracking(); // 暂停依赖收集
    const res = Array.prototype[key].apply(this, args);
    resumeTracking(); // 恢复依赖收集
    return res;
  };
});

function get(target, key, receiver) {
  if (key === RAW) {
    return target; // 返回原始对象
  }
  // receiver: 即为代理对象
  track(target, TrackOpTypes.Get, key);
  if (arrayInstrumentations.hasOwnProperty(key) && Array.isArray(target)) {
    return arrayInstrumentations[key];
  }
  // 反射：直接调用内部方法，不需要经过语法层面的中转
  const res = Reflect.get(target, key, receiver);
  if (isObject(res)) {
    return reactive(res);
  }
  return res;
}

function set(target, key, value, receiver) {
  const oldValue = target[key]; // 这里不要用Reflect.set 因为他会导致嵌套对象派发更新的时候继续做依赖收集
  const oldLen = Array.isArray(target) ? target.length : undefined;
  // TODO: 这里为什么不用in判断
  const type = target.hasOwnProperty(key)
    ? TriggerOpTypes.SET
    : TriggerOpTypes.ADD;
  const res = Reflect.set(target, key, value, receiver);
  if (!res) {
    // 赋值没成功（被冻结的对象/只有getter的只读属性）
    return res;
  }
  const newLen = Array.isArray(target) ? target.length : undefined;
  // 值变了 或者 新增属性
  if (hasChanged(oldValue, value) || type === TriggerOpTypes.ADD) {
    trigger(target, type, key);
    if (Array.isArray(target) && oldLen !== newLen) {
      if (key !== "length") {
        trigger(target, TriggerOpTypes.SET, "length");
      } else {
        // 找到那些被删除的下标，依次触发派发更新
        for (let i = newLen!; i < oldLen!; i++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString());
        }
      }
    }
  }
  return res;
}

function has(target, key) {
  track(target, TrackOpTypes.HAS, key);
  return Reflect.has(target, key);
}

function ownKeys(target) {
  track(target, TrackOpTypes.ITERATE);
  return Reflect.ownKeys(target); // 返回对象的属性名
}
function deleteProperty(target, key) {
  const res = Reflect.deleteProperty(target, key); // 删除成功
  // TODO: target.hasOwnProperty 不能用in
  if (target.hasOwnProperty(key) && res) {
    // 原来有，现在没有的属性 && 删除成功 -> 触发更新
    trigger(target, TriggerOpTypes.DELETE, key);
  }
  return res;
}
export const handlers: ProxyHandler<any> = {
  get,
  set,
  has,
  ownKeys,
  deleteProperty,
};
