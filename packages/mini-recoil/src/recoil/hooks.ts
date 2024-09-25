// hooks 的使用
// hooks 有三个，使用方法如下：
// const [count1, setCount1] = useRecoilState(counter1);
// const count2 = useRecoilValue(counter2);
// const setCount2 = useSetRecoilState(counter2);

import { useState, useEffect } from "react";
import type { RecoilState } from "./types";

// 这里我们声明了一个 useUpdateHooks 方法，该方法接收一个 recoilState 参数
// 主要作用是触发组件重新渲染
const useUpdateHooks = <T>(recoilState: RecoilState<T>) => {
  // 在这里我们来维护一个空状态，该空状态不需要向外部暴露
  // 它是用来触发组件重新渲染的
  const [, updateState] = useState({});

  // 然后再来一个副作用
  useEffect(() => {
    // 在这里面我们需要订阅状态的变化
    // 当状态发生变化的时候，我们需要触发组件重新渲染
    const { unsubscribe } = recoilState.subscribe(() => {
      updateState({});
    });
    return () => unsubscribe();
  }, [recoilState]);
};

export const useRecoilValue = <T>(recoilState: RecoilState<T>) => {
  // 在获取最新的状态值的时候，还有一件事情需要做，每当状态发生改变的时候，我们需要通知组件重新渲染
  useUpdateHooks(recoilState);
  return recoilState.getter();
};

export const useSetRecoilState = <T>(recoilState: RecoilState<T>) => {
  return recoilState.setter;
};

// useRecoilState 是最简单的，实际上内部就是调用了 useRecoilValue 和 useSetRecoilState
export const useRecoilState = <T>(
  recoilState: RecoilState<T>
): [T, (newValue: T) => void] => {
  return [useRecoilValue(recoilState), useSetRecoilState(recoilState)];
};

