import { effect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";

export function computed(getterOrOptions) {
  const { getter, setter } = normalizeGetter(getterOrOptions);
  let value,
    dirty = true;
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
      // effectFn() 数据变了，不需要执行，只有用到这个数据的时候才需要执行
      trigger(obj, TriggerOpTypes.SET, "value");
    },
  });
  const obj = {
    get value() {
      track(obj, TrackOpTypes.Get, "value");
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      return value;
    },
    set value(newValue) {
        setter(newValue)
    }
  };
  return obj;
}
function normalizeGetter(getterOrOptions) {
  let getter, setter;

  // 判断是否是函数
  if (typeof getterOrOptions === "function") {
    getter = getterOrOptions;
    setter = () => {
      console.warn("write operation is not supported");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return { getter, setter };
}