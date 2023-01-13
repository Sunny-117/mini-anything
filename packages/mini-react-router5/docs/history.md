
# history对象

> 版本："history": "^4.9.0",

该对象提供了一些方法，用于控制或监听地址的变化。

该对象**不是**window.history，而是一个抽离的对象，它提供统一的API接口，封装了具体的实现

- createBrowserHistory  产生的控制浏览器真实地址的history对象
- createHashHistory  产生的控制浏览器hash的history对象
- createMemoryHistory  产生的控制内存中地址数组的history对象

history对象共同的特点：维护了一个地址栈

第三方库：history

**以下三个函数，虽然名称和参数不同，但返回的对象结构(history)完全一致**

## history对象

- action(没啥用)：当前地址栈，最后一次操作的类型
  - 如果是通过createXXXHistory函数新创建的history对象，action固定为POP
  - 如果调用了history的push方法，action变为PUSH
  - 如果调用了history的replace方法，action变为REPLACE
- push：向当前地址栈指针位置，入栈一个地址
- replace：替换指针指向的地址
- go：控制当前地址栈指针偏移，如果是0，地址不变；如果是负数，则后退指定的步数；如果是正数，则前进指定的步数；
- length：当前栈中的地址数量
- goBack：相当于go(-1)
- goForward：相当于go(1)
- location：表达当前地址中的信息
- **listen：函数，用于监听地址栈指针的变化**
  - 该函数接收一个函数作为参数，该参数表示地址变化后要做的事情
    - 参数函数接收两个参数
    - location：记录了新的地址
    - action：进入新地址的方式
      - POP：指针移动，调用go、goBack、goForward、用户点击浏览器后退按钮    
      - PUSH：调用history.push
      - REPLACE：调用history.replace
  - 该函数有一个返回值，返回的是一个函数，用于取消监听
- block：用于设置一个阻塞，当页面发生跳转时，会将指定的消息传递到getUserConfirmation，并调用getUserConfirmation函数
  - 该函数接收一个字符串作为参数，表示消息内容，也可以接收一个函数作为参数，函数的返回值是消息内容
  - 该函数返回一个取消函数，调用取消函数可以解除阻塞
- createHref：basename+url

## createBrowserHistory

创建一个使用浏览器History Api的history对象

配置对象：

- basename：设置根路径
- forceRefresh：地址改变时是否强制刷新页面
- keyLength：location对象使用的key值长度
  - 地址栈中记录的并非字符串，而是一个location对象，为了防止出现相同location的对象，生成的key
- getUserConfirmation：一个函数，该函数当调用history对象block函数后，发生页面跳转时运行

## createHashHistory

创建一个使用浏览器hash的history对象

配置对象：

- hashType：#号后给定的路径格式
  - hashbang：被chrome弃用，#!路径
  - noslash：#a/b/c
  - slash：#/a/b/c

## createMemoryHistory

创建一个使用内存中的地址栈的history对象，一般用于没有地址栏的环境

配置对象：详见memoryHistory.js


# 手写createBrowserHistory

## 创建location

利用浏览器的地址栈

```js

/**
 * 创建一个location对象
 * location={
 *  hash
 *  search
 *  pathname 需要简单处理
 *  state 需要处理
 * }
 */
function createLocation(basename = "") {
    // window.location 
    let pathname = window.location.pathname;
    // 处理basename的情况;
    const reg = new RegExp(`^${basename}`);
    pathname = pathname.replace(reg, "");// 忽略 basename
    const location = {
        hash: window.location.hash,
        search: window.location.search,
        pathname
    };
    //处理state
    let state, historyState = window.history.state;
    if (historyState === null) {
        state = undefined;
    }
    else if (typeof historyState !== "object") {
        state = historyState;
    }
    else {
        if ("key" in historyState) {
            location.key = historyState.key;
            state = historyState.state;
        }
        else {
            state = historyState;
        }
    }
    location.state = state;
    return location;
}
```

state处理：

```js
var historyState = window.history.state;
```

1. 如果historyState没有值，则state为undefined
2. 如果historyState有值
   1. 如果值的类型不是对象：直接赋值
   2. 是对象
      1. 该对象中有key属性，将key属性作为location的key属性值，并且将historyState对象中的state属性作为state属性值
      2. 如果没有key属性，则直接将historyState赋值给state

测试：
```js

window.history.pushState({a:1, b:12, key:'asmdl'}, null, '/123')

window.history.pushState({a:1, b:12, key:'asmdl', state:'123'}, null, '/1232')

```

> 为什么这样设计？防止和其他state冲突

```js

// handlePathAndState方法 : 根据path和state，得到一个统一的对象格式

1. path: '/123?a=1#aaa', state: {a:1}
2. path: {
  pathname: '/123',
  search: "?a=1",
  hash: '#aaa', 
  state: {a:1}
}

都会统一转换成：
{
  path:'/123/?a=1#aaa', 
  state: {a:1}
}

```

`createLoactionFromPath`

`changePage`函数因为如果想拿到新的`location`对象就必须完成跳转,需要阻塞不能先完成跳转，所以需要这个函数

此函数也很简单，就是通过`{path:"/news/asdf#aaaaaa?a=2&b=3", state:状态}`把hash，search，pathname分析出来就可以，最后加上state即可



# 其他参考资料：

https://juejin.cn/post/6844903729611669511

https://zhuanlan.zhihu.com/p/55837818

https://github.com/xiaoxiaosaohuo/Note/issues/33
