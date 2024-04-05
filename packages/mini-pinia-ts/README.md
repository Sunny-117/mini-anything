# vuex 和 pinia 区别

- Pinia 的特点就是采用 ts 来进行编写的,类型提示友好,体只小,使用简单 -去除 mutations,state,getters,actions(包含了同步和异步)
Pinia 优势支持 compositionApi 同时也兼容 optionsApi(this 指向)可以无痛将 vue3 的代码直接迁移到 pinia 中
- Vuex 中需要使用 module 来定义模块(嵌套问题),树结构,vuex 中命名空间的概念(namespaced)。整个数据定义树
的结构$store.state.a.b.c.xxx(createNamespaceHelperrs()),所有的模块的状态会定义到根模块上。所以会出
现模块覆盖根状态。
- vuex 中允许程序有一个 store.
- Pinia 可以采用多个 store,store 之间可以互相调用
(扁平化),不用担心命名冲突问题
