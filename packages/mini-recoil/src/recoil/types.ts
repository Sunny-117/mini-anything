// 专门用来存放类型
import { Atom } from "./atom";
import { Selector } from "./selector";

export type voidFn = <T>(value: T) => void;
export type subscribeReturn = {
  unsubscribe: VoidFunction;
};

export type AtomContext<T> = {
  key: string;
  default: T;
};

// 该类型就是 Atom 和 Selector 的联合类型
export type RecoilState<T> = Atom<T> | Selector<T>;

// 这是 get 方法所对应的类型
// 该类型是一个函数，接收一个 context 参数，返回一个 T 类型的值
// context 是一个对象，可以从中解构出 get 方法
// get 方法接收一个 dep 参数，dep 的类型是 RecoilState<T>
type SelectorGetFn<T> = (context: { get: <V>(dep: RecoilState<V>) => V }) => T;

// 这是 set 方法所对应的类型
// 该类型是一个函数，接收一个 context 参数，返回一个 T 类型的值
// context 是一个对象，可以从中解构出 get 和 set 方法
// 其中 get 的类型和上面是一样的
// set 方法接收两个参数，第一个参数是 dep，类型是 RecoilState<T>
// 第二个参数是 value，这是一个可选参数，类型是一个泛型，返回值为 void
type SelectorSetFn<T> = (context: {
  get: <V>(dep: RecoilState<V>) => V;
  set: <V>(dep: RecoilState<V>, value?: V) => void;
}) => T;

export type SelectorContext<T> = {
  key: string;
  get: SelectorGetFn<T>;
  set?: SelectorSetFn<T>;
};

