import { reactive } from "vue";

const obj = {};
const arr = [1, obj, 3];
// const arr = [, obj, 3];

const state1 = reactive(arr);

// state1[0] = 3;
// state1[5] = 3; // 派发更新 add 5
// 问题分析：不完整，length也变了
// 内部是通过Object.deleteProperty隐式设置的length。所以监听不到
// 条件：
// 1. 设置的对象是数组
// 2. 设置前后length变化了
// 3. 设置的不是length属性

// state1.length = 10; // 长度变大

const state2 = reactive(arr);
// state2.length = 1; // 数组长度减少了 属性应该也减少了

state2.push(7); // 读和写 体现的是开发者的意志。所以这里不能收集length
// 所以应该对数组的方法进行处理
// 1. 把那些会对数组产生改动的方法全部重写
// 2. 暂停依赖收集（vue源码）
