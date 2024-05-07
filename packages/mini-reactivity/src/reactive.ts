import { isObject } from "./utils";
import { handlers } from "./handlers";

const targetMap = new WeakMap();

export function reactive(target) {
  if (!isObject(target)) {
    return target;
  }
  if (targetMap.has(target)) {
    return targetMap.get(target);
  }
  const proxy = new Proxy(target, handlers);
  targetMap.set(target, proxy);
  return proxy;
}
