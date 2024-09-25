// import { atom, selector } from "recoil";
import { atom } from "../recoil/atom";
import { selector } from "../recoil/selector";

// 定义两个原子状态
const counter1 = atom({
  key: "counter1",
  default: 0,
});

const counter2 = atom({
  key: "counter2",
  default: 0,
});

// 再来定义一个计算状态，用于计算两个原子状态的和
const sum = selector({
  key: "sum",
  get: ({ get }) => {
    const counter1Value = get(counter1);
    const counter2Value = get(counter2);
    return counter1Value + counter2Value;
  },
});

export { counter1, counter2, sum };

