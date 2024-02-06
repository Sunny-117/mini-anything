
# vue3源码结构

![](../public/vue3.png)

- `@vue/compiler-sfc`：专门解析`sfc`，转成纯 `js` 文件浏览器才可以运行(需要用到`@vue/compiler-dom`和`@vue/compiler-core`)
- `@vue/compiler-dom和@vue/compiler-core`：结合起来专门处理`template`，把`template`处理成`render`函数
- `@vue/runtime-dom`：专门处理 `dom` 节点上的东西，底层依赖于 `@vue/runtime-core`
- `@vue/reactivity`：实现 `vue` 响应式

## 一句话概括

`@vue/compiler-sfc`依赖`@vue/compiler-dom`和`@vue/compiler-core`解析`template`，转换成`render`函数，后面的东西交给运行时来执行