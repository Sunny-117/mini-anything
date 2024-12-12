# 手撕源码版

- new Function
- HookCodeFactory
- interceptor
● 所有钩子都提供额外的拦截器API
  ○ call:(...args) => void当你的钩子触发之前,(就是call()之前),就会触发这个函数,你可以访问钩子的参数.多个钩子执行一次
  ○ tap: (tap: Tap) => void 每个钩子执行之前(多个钩子执行多个),就会触发这个函数
  ○ register:(tap: Tap) => Tap | undefined 每添加一个Tap都会触发 你interceptor上的register,你下一个拦截器的register 函数得到的参数 取决于你上一个register返回的值,所以你最好返回一个 tap 钩子.
● Context(上下文) 插件和拦截器都可以选择加入一个可选的 context对象, 这个可以被用于传递随意的值到队列中的插件和拦截器
- stage
- HookMap: A HookMap is a helper class for a Map with Hooks
- before
- Context:可以指定循环时候的上下文，循环的上下文在多次循环之间保持不变