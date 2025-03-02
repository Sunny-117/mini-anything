import { TrackOpTypes, TriggerOpTypes } from "./operations";

const targetMap = new WeakMap();

const ITERATE_KEY = Symbol("iterate"); // 对于for in循环 没有对应的属性
let activeEffect;
const effectStack: Function[] = [];

let shouldTrack = true; // 默认开启

export function pauseTracking() {
  shouldTrack = false;
}
export function resumeTracking() {
  shouldTrack = true;
}

// vue实现：targetMap -> propMap -> dep
// 本实现：targetMap -> propMap -> typeMap -> dep

export function track(target, type, key?) {
  if (!shouldTrack || !activeEffect) {
    return;
  }
  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }
  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_KEY;
  }
  let typeMap = propMap.get(key);
  if (!typeMap) {
    typeMap = new Map();
    propMap.set(key, typeMap);
  }
  let depSet = typeMap.get(type);
  if (!depSet) {
    depSet = new Set();
    typeMap.set(type, depSet);
  }
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect);
    activeEffect.deps.push(depSet);
  }
  console.log("targetMap->", key ,targetMap);
  // console.log(activeEffect);
  // if (type === TrackOpTypes.ITERATE) {
  //   console.log("依赖收集", type);
  //   return;
  // }
  // console.log("依赖收集", type, key);
}

export function trigger(target, type, key) {
  // console.log("派发更新", type, key);
  const effectFns = getEffectFns(target, type, key);
  if (effectFns) {
    for (const effectFn of effectFns) {
      if (effectFn === activeEffect) {
        // 依赖收集的过程中不触发
        continue;
      }
      // @ts-ignore
      if (effectFn?.options?.scheduler) {
        // @ts-ignore
        effectFn.options.scheduler(effectFn);
      } else {
        effectFn();
      }
    }
  }
}

function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target);
  // console.log("propMap", propMap);
  if (!propMap) {
    return;
  }
  /**
   * 为什么要建立keys数组?
function fn3() {
  state.c;
  for (const key in state) {
  }
}
effect(fn2)
state.c = 4;

c: get [fn2]
iter: iter [fn2]
当state.c=4的时候属性c和属性iter都应该被读取
所以获取typeMap的时候不是针对某一个属性拿，而是可能有多个属性
   */
  const keys = [key];
  if (type === TriggerOpTypes.ADD || type == TriggerOpTypes.DELETE) {
    // 新增或者删除，对应的属性还要加上ITERATE_KEY
    keys.push(ITERATE_KEY);
  }
  const effectFns = new Set<Function>();
  const triggerTypeMap = {
    [TriggerOpTypes.SET]: [TrackOpTypes.Get],
    [TriggerOpTypes.ADD]: [
      TrackOpTypes.Get,
      TrackOpTypes.ITERATE,
      TrackOpTypes.HAS,
    ],
    [TriggerOpTypes.DELETE]: [
      TrackOpTypes.Get,
      TrackOpTypes.ITERATE,
      TrackOpTypes.HAS,
    ],
  };
  for (const key of keys) {
    const typeMap = propMap.get(key);
    if (!typeMap) {
      continue;
    }
    const trackTypes = triggerTypeMap[type];
    for (const trackType of trackTypes) {
      const dep = typeMap.get(trackType);
      if (!dep) {
        continue;
      }
      for (const effectFn of dep) {
        effectFns.add(effectFn);
      }
    }
  }
  return effectFns;
}

export function effect(
  fn,
  options?: {
    lazy?: boolean;
    scheduler?: (fn: Function) => void;
  }
) {
  const { lazy = false } = options || {};
  const effectFn = () => {
    try {
      activeEffect = effectFn; // 收集的是effectFn，将来重新执行的是effectFn，达到重新收集依赖的目的
      effectStack.push(effectFn);
      cleanup(effectFn);
      return fn(); // 可以保证fn运行期间activeEffect有值
    } finally {
      // 在finally里面清除effect，防止fn运行期间报错无法清除effect
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1]; // 指向栈顶
    }
  };
  effectFn.deps = [];
  effectFn.options = options;
  if (!lazy) {
    effectFn();
  }
  return effectFn;
}

export function cleanup(effectFn) {
  const { deps } = effectFn;
  if (!deps.length) {
    return;
  }
  for (const dep of deps) {
    dep.delete(effectFn);
  }
  deps.length = 0;
}
