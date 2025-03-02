
export * from "./effect";
export * from "./reactive";
export * from './ref'
export * from './computed'

// 本质：函数运行过程中用到的标记数据的关联

// 建立对应关系
// 1.监听数据的读取和修改
// - 1. defineProperty: 监听范围很窄，只能监听已有属性的读取和修改，兼容性好
// - 2. Proxy：监听范围更广，可以监听新增属性、删除属性、数组索引和长度的修改，兼容性es6+
// 2.如何知晓数据对应的函数