# Pinia源码实现文章-导读

## 导读

本系列文章主要讲解Pinia的源码如何实现，同时也会教大家如何能够手动写一个pinia状态机。文章是进阶文章，所以在一些基础知识上是有需要对前端vue框架有一定的了解的。在过程中我们会涉及到pinia状态机的常规使用。只是作为对比使用。


## pinia概述

Pinia是vue的存储库（也称为状态机），vue2中我们常配置vuex作为状态机，但随着vue3的出现，我们不仅从响应式api跨域到了组件式api，状态机也从vuex升级到了pinia。我们也在多处的使用中感受到了pinia的好处，比如：

\- dev-tools的支持

\- 提供TypeScript

\- 服务器端端渲染支持

\- mutations和actions的合并



## Pinia使用vue2

```js
npm install @vue/composition-api pinia pinia-plugin-persistedstate -S
```

Vue2 版本需要用到这个 PiniaVuePlugin
Vue2版本使用pinia需要安装@vue/composition-api

还有需要有边界值的设定。这里我们不做讨论



## 学习pinia源码实现的意义

平时的开发我们只关注如何使用pinia以及调用pinia返回的数据。但如果想进一步提升自己的能力，同时也想了解一个状态机的实现原理和内部构造，那就需要去对状态的源码做一定的阅读和理解了。甚至我们还可以自己手动编写一个状态机，更有利于我们的开发和有序二次封装。

今天开始我来带领大家从0开始写一个状态机，也就是重新认识pinia，今后在使用pinia时清晰的知识覆盖

## 需要总结

**1.pinia 可以解构操作的有两个数据（createPinia）（defineStore），都是函数**

```js
export function createPinia(){
    
}

export function defineStore(){
    
}
```

**2.createPinia返回一个pinia对象**

```js
export function createPinia(){
    return pinia对象
}
```

**3.defineStore返回一个useStore()函数**

```js
export function defineStore(){
    const userStore = ()=>{}
    return userStore
}
```

**4.useStore返回store存储数据对象**

```js
export function defineStore(){
    const userStore = ()=>{
        return store对象//所有状态机的数据state函数返回，（副作用-getters和actions）
    }
    return userStore
}
```

