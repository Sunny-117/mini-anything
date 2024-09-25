# 新一代 React 状态管理方案 Recoil 实战与迷你源码实现

> 本文所有源码均在：https://github.com/Sunny-117/mini-anything

# Recoil基本概念

Recoil 是一个由 Facebook 官方推出的和 React 配套的状态管理库。

- 第一章：Recoil 快速上手
  - 直接通过一个待办事项的案例，快速的上手 Recoil
- 第二章：Recoil 进阶学习
  - Recoil 设计哲学
    - 对比和其他的传统的状态管理工具有一些什么样的不同
  - Recoil 的一些补充知识



## 基本概念

Recoil 是由 Facebook 官方所推出的状态管理库，这意味着该状态库是专门为 React 量身打造，Recoil 的出现，解决了 React 技术栈一直没有官方的状态管理库的问题。

Recoil 的官网：*https://recoiljs.org/*

在 Recoil 中，有两个核心概念：

- atom
- selector



### atom

atom 翻译成中文叫做原子，表示的就是一个可变的共享状态的最小单位。每一个 atom 会有一个唯一标识 key 以及一个默认值（对应的状态的默认值）。当一个 atom 里面的状态值发生变化的时候，所有订阅了这个 atom 的组件就会重新渲染。

要创建一个 atom 非常简单，方法如下：

```ts
import { atom } from "recoil";

atom({
  key: 'somestate', // 唯一标识
  default: '' // 状态的默认值
})
```



### selecor

这是一个派生状态，它是根据给定的 atom 或者其他 selecor 的值进行一个二次计算。组件也可以订阅 selector 的值。因为 selector 本身是基于 atom 进行的状态二次计算，所以当 selector 所依赖的 atom 的状态值发生变化的时候，所有订阅了该 selector 的组件也会重新进行渲染。

下面是一个创建 selector 的简单示例：

```ts
import { selector } from "recoil";
selector({
  key: 'someselector', // 唯一的标识
  // 当外部想要获取该 selector 的值的时候，就会调用 getter 方法
  get: ({ get })=>{
    // 通过该 get 方法就能够拿到某个 atom 的状态值
    const state = get(somestate);
    // 接下来就可以对这个状态值进行一个二次计算
    return state * 2
  }
})
```



### Hooks

除了上面的两个基本概念，我们还需要掌握常用的三个 hook：

- useRecoilState
- useRecoilValue
- useSetRecoilState



**useRecoilState**

该 hook 接收一个 atom 或者一个 selector 作为参数，接下来该方法会返回包含两个元素的数组，第一个元素是当前的状态值，第二个元素是设置该状态的函数，因此该 hook 和 React 中的 useState 非常的相似。

useState 的用法：

```ts
const [counter, setCounter] = useState(0);
```

useRecoilState 的用法：

```ts
import { atom, useRecoilState } from 'recoil';

// 创建一个 atom
const textState = atom({
  key: "textState",
  default: ""
})

// 这里有一个组件
function MyComponent(){
  // 获取 atom 状态值
  const [text, setText] = useRecoilState(textState);
}
```



**useRecoilValue**

该 Hook 是只从 atom 或者 selector 中获取状态值。

```ts
import { atom, useRecoilValue } from 'recoil';

// 创建一个 atom
const textState = atom({
  key: "textState",
  default: ""
})

// 这里有一个组件
function MyComponent(){
  // 获取 atom 状态值
  const text = useRecoilValue(textState);
}
```



**useSetRecoilState**

该 Hook 是只返回设置 atom 状态值的方法。

```ts
import { atom, useSetRecoilState } from 'recoil';

// 创建一个 atom
const textState = atom({
  key: "textState",
  default: ""
})

// 这里有一个组件
function MyComponent(){
  // 获取 atom 状态值
  const setText = useSetRecoilState(textState);
}
```


# React状态管理发展史

- React状态管理的发展历史
- Recoil的设计特点



## 回顾什么是状态

所谓状态就是指组件内部所维护的数据，组件和组件之间经常会涉及到状态的传递，为了避免状态传递时出现混乱，React引入了“单向数据流”的设计思想，父向子组件传递状态使用 props，子向父组件传递状态使用回调（状态提升）。

React这种设计虽然避免混乱，但是在深层次、远距离的组件之间传递状态的话，需要层层传递，非常麻烦。

所以我们在使用 React 开发项目的时候，往往需要第三方的状态管理库，对组件的共享状态进行统一的维护。



如果是 Vue阵营，状态管理一直都是官方标配，之前是 Vuex，现在是 Pinia。

但是反观 React 阵营，一直使用的是第三方的状态管理库，数量也非常非常的多。

下图罗列出了 React 阵营相关的状态管理库：

<img src="https://resource.duyiedu.com/xiejie/2023-09-22-021427.png" alt="image-20230922101427050" style="zoom:50%;" />

注意，上图中所罗列的这么多状态管理库不是一下子就出来的，是随着整个 React 的发展逐渐出现的，所以这里就需要回顾React状态库的发展历史。

整个状态库的发展史可以分为三个部分：

- 旧时代的状态管理
- Hooks时代的状态管理
- 新时代的状态管理



## 旧时代的状态管理

在早期Facebook推出 React 的时候，虽然没有推出配套的状态管理库，但是却提出了 Flux 的数据流的设计模式。

> 在早期的 MVC 的架构中，模型可以更新视图，视图也可以更新模型，React 团队认为这样会导致难以预测的行为，因此在 Flux 架构中，统一通过视图去派发 action，action 会被分发到 stores，stores（存储了所有的共享状态）里面的状态更新之后，视图再进行更新，这样一来，数据的流向始终是单向的，和 React 的单向数据流的设计思想是吻合的。

在 Flux 里面有这么几个重要的组成部分：

1. ***Actions***：动作是发起变更的源头。它们是一种向系统发送数据的方式，可以被视图或服务器发起。
2. ***Dispatcher***：分发器接收所有的 Actions 并将它们分发给注册的回调函数。在一个 *Flux* 应用中，通常存在一个单一的 *Dispatcher*。
3. ***Stores***：存储包含了应用的状态和逻辑。它们类似于 MVC 架构中的模型，但是一个 *Store* 可能管理多个对象，并且不负责 *CRUD* 操作。每当 *Dispatcher* 分发一个 *Action*，与该 *Action* 相关的 *Store* 会响应并可能进行状态的更新。
4. ***Views***：视图从 *Stores* 中读取状态，并通过用户交互发起 *Actions*。当 *Stores* 更新时，视图也会相应地更新。

但是大家需要注意，Flux仅仅是一种架构思想，不是具体的实现，这一点就有点类似于 ECMAScript，是一种规范，并非具体实现。



### Fluxxor

Fluxxor 就是基于 FLux 思想的一种具体实现，官网地址：http://fluxxor.com/

关于 Fluxxor，官网有一些介绍如下：

>*Fluxxor* 是一组工具，旨在通过实现 *Flux* 架构的核心概念，便利 *JavaScript* 数据层的构建。它与 *React* 视图层配合得尤其好，并且包含一些帮助器以简化与 React 应用的整合。
>
>Flux 架构
>
>- 让你更容易理解应用数据的变化
>- 避免复杂的 MVC 层次结构，采用一种单向数据流
>- 有助于提高数据一致性
>- 防止难以调试的级联更新
>- 与 React 配合得很好，补充了它的响应式数据流



### Redux

除了 Fluxxor 以外，还出现了一个名为 Redux 的状态管理库，仍然是 FLux 思想的一种具体实现。

Redux 基于 FLux 思想的基础上，引入了一些函数式编程的概念，例如纯函数和不可变状态。

官网：https://redux.js.org/

讲到这里，有一点你可能会比较好奇：同样都是 Flux 思想的一种思想，为啥 Redux 火了，Fluxxor 凉了？

下面是 Fluxxor 和 Redux 一些主要区别：

1. ***Store***：在 *Fluxxor* 中，应用的状态被分布在多个不同的 *Store* 中，每个 *Store* 管理应用状态的一部分。在 *Redux* 中，应用的整个状态被存储在一个单一的 *Store* 中。
2. ***Reducer***：*Redux* 引入了 *Reducer* 的概念，它是一个纯函数，用于处理 *Action* 并更新应用的状态。每当 *dispatch* 一个 *Action*，*Store* 中的状态就会通过 *Reducer* 函数来更新。这使得 *Redux* 的状态更新非常可预测，并且易于测试。而在 *Fluxxor* 中，*Store* 会直接处理 Action。
3. ***Immutable State***：*Redux* 强调使用 *Immutable State*，每次 *state* 更新都会返回一个新的 *state* 对象，这有助于提高性能（通过允许更简单的变更检测）并简化编程模型。而 *Fluxxor* 并没有对此有强制要求。
4. ***Middleware***：*Redux* 支持 *Middleware*，允许你在 *Action* 被发送到 *Store* 之前或之后插入自定义的逻辑。这使得如日志记录、异常报告、异步 *Action* 等功能的实现变得更加容易。*Fluxxor* 则没有这样的机制。
5. ***Community and Ecosystem***：到目前为止，*Redux* 拥有更大的社区和更丰富的生态系统。有许多工具和库都是专门为 *Redux* 设计的，例如 *Redux DevTools、redux-thunk、redux-saga* 等。

整个 Redux 的工作流程：

<img src="https://resource.duyiedu.com/xiejie/2023-09-22-013541.gif" alt="redux" style="zoom:50%;" />

正因为上面所罗列出来的这些区别，让 redux 一举成为了 react 阵营中最流行的状态管理库，有大量的工具和中间件支持，以及一个活跃的社区。



### React-redux

React-redux 就是 Redux 团队推出的和 React 绑定的状态管理库，相比上面的 Redux，React-redux 在和 React 配套使用的时候，会更加容易一些。

官网：https://react-redux.js.org/

相比直接使用 redux，react-redux 提供了一些额外的组件、功能以及优化，主要包括：

1. ***Provider* 组件**：*react-redux* 提供了一个 *Provider* 组件，它使得你的 *Redux store* 可以在你的 *React* 组件树中被访问。只需要在应用的最外层使用 *Provider* 组件包裹，并传入 *Redux store* 作为 *props*，然后你的 *React* 组件就可以通过 *connect* 函数访问到 *Redux store*。
2. ***connect* 函数**：*connect* 是 *react-redux* 的核心功能，它允许你将 *React* 组件连接到 *Redux store*。*connect* 函数接收两个主要的参数：*mapStateToProps* 和 *mapDispatchToProps*，分别用于将 *Redux store* 的 *state* 和 *dispatch* 方法映射到 *React* 组件的 *props*。
3. **性能优化**：*react-redux* 对组件的渲染进行了优化。当 *Redux store* 更新时，并不是所有的组件都会重新渲染，而只有那些依赖于改变的 *state* 部分的组件才会重新渲染。*react-redux* 使用 *shouldComponentUpdate*( ) 钩子来减少无必要的渲染。当 store 更新时，*react-redux* 会计算新的 props，并与前一次的 props 进行比较。如果 props 没有改变，组件就不会重新渲染。这可以防止不必要的渲染，提高应用的性能。

由于 React-redux 是专门针对 react 所推出的，很长一段时间，React-redux 就是 React 阵营中状态管理库的标配。



### Mobx

Mobx 并非基于 FLux 的思想，而是提供了一种基于响应式编程的思想来实现的状态管理。

官网：https://mobx.js.org/README.html

Mobx 允许你直接修改状态，由于状态具备响应式，会自动保持和 UI 同步。在 Mobx 里面，你可以将一个状态标记为可观察的（observable），状态一旦发生变化，UI 就会自动的重新渲染。

下面是关于 Mobx 的一个简单示例：

```ts
import {observable, action} from "mobx";

class CounterStore{
  @observable count = 0;
  
  @action increment(){
    this.count += 1;
  }
}

const store = new CounterStore();

export default store;
```

```tsx
import React from 'react';
import { observer } from 'mobx-react';
import counterStore from './counterStore';

const Counter = observer(() => (
  <div>
    Count: {counterStore.count}
    <button onClick={() => counterStore.increment()}>+</button>
  </div>
));

export default Counter;
```



### ContextAPI

ContextAPI是随着 React16.3 版本的发布推出的（2018年3月），这里其实就是提供了一个公共的上下文空间，允许组件树里面的组件能够从这个共享空间中读取状态数据，而不需要层层传递，因此可以将 ContextAPI 看作是一个轻量级的状态管理库。

ContextAPI 虽然比较好用，但是仅仅适合规模比较小的应用程序，如果应用的规模比较庞大，还是需要一些第三方的状态管理库。

因为第三方状态管理库具备下面的优点：

1. **中间件和扩展性**：Redux 等库提供了使用中间件的能力，例如 `redux-thunk` 或 `redux-saga`，可以更方便地处理异步操作。此外，这些库还有丰富的插件生态系统，可以实现诸如日志记录、持久化、数据同步等功能。
2. **调试工具**：Redux 和 MobX 等库提供了强大的开发者工具，可以追踪、记录甚至回溯状态的变化，这对于调试和理解程序的运行非常有用。
3. **性能优化**：当使用 Context API 来存储大量的状态时，可能会遇到性能问题。因为当一个 Context 值改变时，所有消费这个 Context 的组件都会重新渲染。虽然可以通过一些优化手段（如使用多个 Context 或 `shouldComponentUpdate`）来解决，但这会增加代码的复杂性。而 Redux、MobX 或 Recoil 这样的库内置了更多的优化机制，如智能的状态订阅系统。
4. **状态逻辑可测试性**：在 Redux 等库中，你可以将状态更新逻辑放在纯函数（reducer）中，这使得状态逻辑更容易测试。而在 Context API 中，状态逻辑通常被放在组件中，可能会更难进行单元测试。
5. **更复杂的状态需求**：对于某些更复杂的状态需求，如计算派生状态、同步状态到本地存储或服务器、时间旅行调试等，使用 Redux 或 Recoil 等库会更方便。例如，Recoil 提供了 atom 和 selector 的概念，使得管理和使用依赖其他状态的派生状态变得更容易。

# 源码解读

# Atom源码解析

回顾之前学习的 Recoil，整个 Recoil 有两个核心概念：

- atom
- selector

还有三个常用的 Hook：

- useRecoilState
- useRecoilValue
- useSetRecoilState

这门课我们主要也就是针对两个核心概念以及三个 Hook 进行一个源码解析。

因为整个 Recoil 的源码量很多，而且源码本身是使用 Flow.js 来编写的，整体源码的可阅读性其实比较差的，所以我们即便是针对 atom 和 selector 核心概念进行源码解析，也只对里面几个比较核心的方法进行拆解。



首先回顾一下 Atom 的用法：

```ts
atom({
  key: 'xxx',
  default: xxx
})
```



## atom方法

atom 方法的源码如下：

```ts
function atom<T>(options: AtomOptions<T>): RecoilState<T> {
  // 将 options 对象里面的所有属性复制到 restOptions 里面
  const {...restOptions} = options;
  // 检查 options 里面是否有默认值，如果有默认值，就将默认值赋值给 optionsDefault
  // 否则的话，optionsDefault 是一个新的未决的 Promise
  const optionsDefault: RecoilValue<T> | Promise<T> | Loadable<T> | WrappedValue<T> | T =
    'default' in options
      ?
        options.default
      : new Promise(() => {});

  // 接下来判断 optionsDefault 是否是一个 RecoilValue 的值
  if (isRecoilValue(optionsDefault)
  ) {
    // 如果是 RecoilValue，进入此分支，调用 atomWithFallback 方法
    return atomWithFallback<T>({
      ...restOptions,
      default: optionsDefault,
    });
  } else {
    // 否则的话，调用 baseAtom 方法
    return baseAtom<T>({...restOptions, default: optionsDefault});
  }
}
```

atom 方法返回一个 RecoilState 类型的值。对应的类型相关信息的源码如下：

```ts
class AbstractRecoilValue<+T> {
  key: NodeKey;
  constructor(newKey: NodeKey) {
    this.key = newKey;
  }
  toJSON(): {key: string} {
    return {key: this.key};
  }
}

class RecoilState<T> extends AbstractRecoilValue<T> {}

class RecoilValueReadOnly<+T> extends AbstractRecoilValue<T> {}

export type RecoilValue<T> = RecoilValueReadOnly<T> | RecoilState<T>;
```

RecoilState 和 RecoilValueReadOnly 都继承了 AbstractRecoilValue。

还有一个类型 RecoilValue，该类型就是 RecoilState 和 RecoilValueReadOnly 的联合类型。



## atomWithFallback 方法

atomWithFallback 方法的源码如下：

```ts
function atomWithFallback<T>(options: AtomWithFallbackOptions<T>,): RecoilState<T> {
  // 整个 atomWithFallback 的核心逻辑可以分为两大块
  
  // 第一部分：再次调用 atom 方法
  // 这里再次调用 atom 方法会不会形成一个无限递归 ？
  // 答案是不会，因为第二次调用 atom 方法的时候，default 设置为了 DEFAULT_VALUE
  // 最终 base 对应的值其实就是 baseAtom 的返回值
  const base = atom<T | DefaultValue>({
    ...options,
    default: DEFAULT_VALUE,
    persistence_UNSTABLE:
      options.persistence_UNSTABLE === undefined
        ? undefined
        : {
            ...options.persistence_UNSTABLE,
            validator: (storedValue: mixed) =>
              storedValue instanceof DefaultValue
                ? storedValue
                : nullthrows(options.persistence_UNSTABLE).validator(
                    storedValue,
                    DEFAULT_VALUE,
                  ),
          },
    effects: (options.effects: any),
    effects_UNSTABLE: (options.effects_UNSTABLE: any),
  });

  // 第二部分：根据上一步所得到的 baseAtom，创建一个 selector，并返回外部
  const sel = selector<T>({
    key: `${options.key}__withFallback`,
    get: ({get}) => {
      const baseValue = get(base);
      return baseValue instanceof DefaultValue ? options.default : baseValue;
    },
    set: ({set}, newValue) => set(base, newValue),
    cachePolicy_UNSTABLE: {
      eviction: 'most-recent',
    },
    dangerouslyAllowMutability: options.dangerouslyAllowMutability,
  });
  setConfigDeletionHandler(sel.key, getConfigDeletionHandler(options.key));
  return sel;
}
```



## baseAtom方法

首先看一下 baseAtom 方法最终返回的产物：

```ts
const node = registerNode(
  (
    {
    key,
    nodeType: 'atom',
    peek: peekAtom,
    get: getAtom,
    set: setAtom,
    init: initAtom,
    invalidate: invalidateAtom,
    shouldDeleteConfigOnRelease: shouldDeleteConfigOnReleaseAtom,
    dangerouslyAllowMutability: options.dangerouslyAllowMutability,
    persistence_UNSTABLE: options.persistence_UNSTABLE
      ? {
          type: options.persistence_UNSTABLE.type,
          backButton: options.persistence_UNSTABLE.backButton,
        }
      : undefined,
    shouldRestoreFromSnapshots: true,
    retainedBy,
  }: ReadWriteNodeOptions<T>),
);
return node;
```

可以看到，这里会调用 registerNode 的方法，该方法会有一个返回值，最终外部拿到的其实是 registerNode 方法的返回值。registerNode 方法在调用的时候接收一个配置对象，该配置对象有一些如下的重要字段：

- key：全局内的一个唯一标识，用来标识 atom。
- nodeType：表示这是一个 atom 类型的节点
- 有一些重要的方法：peek、get、set、init、invalidate，peekAtom 是用来预览 atom 的值，getAtom 用来获取 atom 的值，setAtom 用来设置 atom 的值，initAtom 是用来初始化 atom 的值，invalidateAtom 让一个 atom 无效。

registerNode 的源码如下：

```ts
const nodes: Map<string, Node<any>> = new Map();
const recoilValues: Map<string, RecoilValue<any>> = new Map();

function registerNode<T>(node: Node<T>): RecoilValue<T> {
  if (RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED) {
    checkForDuplicateAtomKey(node.key);
  }
  
  // 这一步是将传入的对象（node）存储到 nodes 的 map 里面
  nodes.set(node.key, node);

  const recoilValue: RecoilValue<T> =
    // 判断传入的 node 对象是否有 set 方法
    // 如果没有 set 方法，那就是一个只读类型的数据，new 了一个 RecoilValueReadOnly
    // 如果有 set 方法，那么就是一个可读可写的数据，new 了一个 RecoilState
    node.set == null
      ? new RecoilValueClasses.RecoilValueReadOnly(node.key)
      : new RecoilValueClasses.RecoilState(node.key);

  // 将上一步生成的 recoilValue 存储到 recoilValues 的 map 里面
  recoilValues.set(node.key, recoilValue);
  return recoilValue;
}
```



接下来我们来看一下在调用 registerNode，传入的对象有几个重要的方法：

- peekAtom
- getAtom
- setAtom
- initAtom



### initAtom方法

该方法是内部一个比较核心的方法，该方法从名字我们就能看出是对 atom 做初始化操作的。

initAtom 方法的部分源码如下：

```ts
function initAtom(
    store: Store,
    initState: TreeState,
    trigger: Trigger,
  ): () => void {
    // 增加获取仓库的数量，这是 Recoil 中所使用到的一种技术，确保当所有的 store 都不再使用某个 atom 时，可以执行一些清理操作
    liveStoresCount++;
    
    // 这就是一个清理函数，该函数内部定义了当 atom 不再被任何 store 使用时要执行的清理逻辑。
    const cleanupAtom = () => {
      liveStoresCount--;
      cleanupEffectsByStore.get(store)?.forEach(cleanup => cleanup());
      cleanupEffectsByStore.delete(store);
    };

    // 这一行代码是将 atom 的 key 添加到 store 内部的 atom keys 列表里面。
    // 这一步是非常有必要的，因为 Recoil 需要追踪哪些 atom 是已经被初始化并且正在被 store 使用的。
    store.getState().knownAtoms.add(key);

    // 如果 defaultLoadable 的 state 状态为 loading
    // 设置一个函数 notifyDefaultSubscribers，用于当异步加载默认值完成时通知所有的订阅者
    if (defaultLoadable.state === 'loading') {
      const notifyDefaultSubscribers = () => {
        const state = store.getState().nextTree ?? store.getState().currentTree;
        if (!state.atomValues.has(key)) {
          markRecoilValueModified(store, node);
        }
      };
      defaultLoadable.contents.finally(notifyDefaultSubscribers);
    }
      
    // 之后是和 effect 副作用相关的代码，这一块省略...
      
    return cleanupAtom;
}
```

总结一下，这段代码主要的作用就是初始化一个 atom，并且设置相应的清理逻辑和异步加载的默认值。至于 initAtom 方法的后半段代码，是对 atom effect 副作用做出处理，这一段代码较长，并且前面我们介绍 Recoil 实战部分的时候也没有涉及 effect 副作用的使用，所以这里略过。



### getAtom方法

该方法从名字就可以看出，获取一个 atom 的当前值。

对应的源码如下：

```ts
function getAtom(_store: Store, state: TreeState): Loadable<T> {
  if (state.atomValues.has(key)) {
    // 首先看一下 state.atomValues 里面是否有这个 atom 值
    // 如果有，那么就直接返回这个值。
    // state.atomValues 是一个 map，它的键是 atom 的 key，值对应就是 atom 值
    return nullthrows(state.atomValues.get(key));
  } else if (state.nonvalidatedAtoms.has(key)) {
    // 如果在 state.nonvalidatedAtoms 里面存在 atom 这个值，说明 atom 的值是需要验证的
    // 因此该分支所做的事情，就是先对对应的 atom 的值进行一个验证，而且所验证后的结果是有可能被缓存的，方便后续直接使用
    
    if (cachedAnswerForUnvalidatedValue != null) {
      return cachedAnswerForUnvalidatedValue;
    }

    if (persistence == null) {
      expectationViolation(
        `Tried to restore a persisted value for atom ${key} but it has no persistence settings.`,
      );
      return defaultLoadable;
    }
    const nonvalidatedValue = state.nonvalidatedAtoms.get(key);
    const validatorResult: T | DefaultValue = persistence.validator(
      nonvalidatedValue,
      DEFAULT_VALUE,
    );

    const validatedValueLoadable =
      validatorResult instanceof DefaultValue
        ? defaultLoadable
        : loadableWithValue(validatorResult);

    cachedAnswerForUnvalidatedValue = validatedValueLoadable;

    return cachedAnswerForUnvalidatedValue;
  } else {
    // 进入此分支，说明 atom 的值不存在
    // 那么就返回一个默认值 defaultLoadable
    return defaultLoadable;
  }
}
```

总结一下，getAtom 方法主要作用就是获取一个 atom 的值，如果这个值不存在，那么就返回一个默认值（defaultLoadable），如果这个值存在，但是还没有经过验证，那么会执行验证的相关逻辑，然后返回验证的结果。



### setAtom方法

setAtom 对应的是设置 atom 的值：

```ts
function setAtom(
  _store: Store,
  state: TreeState,
  newValue: T | DefaultValue,
): AtomWrites {
  if (state.atomValues.has(key)) {
    // 判断是否有这个 atom
    const existing = nullthrows(state.atomValues.get(key));
    
    // 判断找到的 atom 的这个值和新值是否相同，如果相同，返回一个新的 map
    if (existing.state === 'hasValue' && newValue === existing.contents) {
      return new Map();
    }
  } else if (
    !state.nonvalidatedAtoms.has(key) &&
    newValue instanceof DefaultValue
  ) {
    
    // 还有一种情况也会返回一个新的 map，就是新的值是一个默认值的时候
    
    return new Map();
  }

  maybeFreezeValueOrPromise(newValue);

  cachedAnswerForUnvalidatedValue = undefined; 

  // 设置新的值
  // 创建一个新的 map，设置键为 atom 的可以，值为一个 loadable 类型的值
  return new Map<NodeKey, Loadable<$FlowFixMe>>().set(
    key,
    loadableWithValue(newValue),
  );
}
```

总结一下，setAtom 作用就是设置一个 atom 的新值，但是在设置之前，首先需要做一些判断，判断新值和旧值是否相同，又或者新的值是否为默认值，如果是，那么就返回一个空的 map，否则就设置新值，返回一个包含了新值的 map。



### peekAtom方法

用于预览当前的 atom 的值。

```ts
function peekAtom(_store: Store, state: TreeState): Loadable<T> {
  return (
    state.atomValues.get(key) ??
    cachedAnswerForUnvalidatedValue ??
    defaultLoadable
  );
}
```

内部就是通过 state.atomValues.get 方法去获取对应的 atom 的值返回给外部。如果没有就去缓存找，缓存也找不到就返回 defaultLoadable 默认值。


# Selector源码解析

首先回顾一下 selector 的基础使用方法，如下：

```ts
const exampleSelector = selector({
  key: 'example',
  get: ({get}) => {
    const a = get(atomA);
    const b = get(atomB);
    return a + b;
  },
});
```



## 整体结构

整个 selector 的源码非常的庞大，但是整体的结构是比较清晰的：

```ts
function selector<T>(
  options: ReadOnlySelectorOptions<T> | ReadWriteSelectorOptions<T>,
): RecoilValue<T> {
  let recoilValue: ?RecoilValue<T> = null;

  const {key, get, cachePolicy_UNSTABLE: cachePolicy} = options;
  const set = options.set != null ? options.set : undefined; // flow

  // This is every discovered dependency across all executions
  const discoveredDependencyNodeKeys = new Set<NodeKey>();

  const cache: TreeCacheImplementation<Loadable<T>> = treeCacheFromPolicy(
    cachePolicy ?? {
      equality: 'reference',
      eviction: 'keep-all',
    },
    key,
  );

  const retainedBy = retainedByOptionWithDefault(options.retainedBy_UNSTABLE);

  const executionInfoMap: Map<Store, ExecutionInfo<T>> = new Map();
  let liveStoresCount = 0;
    
  // 声明一堆内部方法...
    
  if (set != null) {
    /**
     * ES5 strict mode prohibits defining non-top-level function declarations,
     * so don't use function declaration syntax here
     */
    const selectorSet = (
      store: Store,
      state: TreeState,
      newValue: T | DefaultValue,
    ): AtomWrites => {
      // ...
    };

    return (recoilValue = registerNode<T>({
      key,
      nodeType: 'selector',
      peek: selectorPeek,
      get: selectorGet,
      set: selectorSet,
      init: selectorInit,
      invalidate: invalidateSelector,
      clearCache: clearSelectorCache,
      shouldDeleteConfigOnRelease: selectorShouldDeleteConfigOnRelease,
      dangerouslyAllowMutability: options.dangerouslyAllowMutability,
      shouldRestoreFromSnapshots: false,
      retainedBy,
    }));
  } else {
    return (recoilValue = registerNode<T>({
      key,
      nodeType: 'selector',
      peek: selectorPeek,
      get: selectorGet,
      init: selectorInit,
      invalidate: invalidateSelector,
      clearCache: clearSelectorCache,
      shouldDeleteConfigOnRelease: selectorShouldDeleteConfigOnRelease,
      dangerouslyAllowMutability: options.dangerouslyAllowMutability,
      shouldRestoreFromSnapshots: false,
      retainedBy,
    }));
  }
}
```

接下来我们一个部分一个部分来看。

```ts
// 首先是开头部分的代码

// 首先这里声明了一个变量，该变量的初始值为 null，回头会存放 recoilVaule 类型的值
let recoilValue: ?RecoilValue<T> = null;
// 从开发者传入的配置对象中解构出：
// key：selector 的唯一标识
// get：一个 getter，用于计算 selctor 的值
// cachePolicy：用于决定如何缓存此 selector 的值
const {key, get, cachePolicy_UNSTABLE: cachePolicy} = options;
// 开发者如果传入了 set，那么将 set 赋值给这里的 set 变量，否则就为一个 undefined
const set = options.set != null ? options.set : undefined; // flow

// This is every discovered dependency across all executions
// discoveredDependencyNodeKeys 是一个 set 类型的数据结构
// 用于存储所有执行过程中发现的依赖项的 key
const discoveredDependencyNodeKeys = new Set<NodeKey>();

// 调用 treeCacheFromPolicy 方法根据所提供的缓存策略以及 key 来创建一个缓存
// 如果没有提供缓存策略，那么会使用一个默认的策略
const cache: TreeCacheImplementation<Loadable<T>> = treeCacheFromPolicy(
  cachePolicy ?? {
    equality: 'reference',
    eviction: 'keep-all',
  },
  key,
);

// 设置 selector 的保留策略
const retainedBy = retainedByOptionWithDefault(options.retainedBy_UNSTABLE);

// executionInfoMap 是一个 map 类型的数据结构，主要用于存储每个 store 的执行信息
const executionInfoMap: Map<Store, ExecutionInfo<T>> = new Map();
// 这是一个计数器，用于记录当前活跃的 store 的数量
let liveStoresCount = 0;
```

总结一下，这段代码的作用是根据提供的 options 创建与该 selector 相关的各个数据结构，包括缓存、依赖项集合、执行信息映射之类的。



接下来我们来看一下返回值。对应的代码如下：

```ts
if (set != null) {
    /**
     * ES5 strict mode prohibits defining non-top-level function declarations,
     * so don't use function declaration syntax here
     */
    const selectorSet = (
      store: Store,
      state: TreeState,
      newValue: T | DefaultValue,
    ): AtomWrites => {
      // ...
    };

    return (recoilValue = registerNode<T>({
      key,
      nodeType: 'selector',
      peek: selectorPeek,
      get: selectorGet,
      set: selectorSet,
      init: selectorInit,
      invalidate: invalidateSelector,
      clearCache: clearSelectorCache,
      shouldDeleteConfigOnRelease: selectorShouldDeleteConfigOnRelease,
      dangerouslyAllowMutability: options.dangerouslyAllowMutability,
      shouldRestoreFromSnapshots: false,
      retainedBy,
    }));
  } else {
    return (recoilValue = registerNode<T>({
      key,
      nodeType: 'selector',
      peek: selectorPeek,
      get: selectorGet,
      init: selectorInit,
      invalidate: invalidateSelector,
      clearCache: clearSelectorCache,
      shouldDeleteConfigOnRelease: selectorShouldDeleteConfigOnRelease,
      dangerouslyAllowMutability: options.dangerouslyAllowMutability,
      shouldRestoreFromSnapshots: false,
      retainedBy,
    }));
  }
```

主要就是判断是否有 set，不管有没有 set，最终调用的都是 registerNode 方法。nodeType 对应的为 selector。

如果 set 不为 null，那么在调用 registerNode 方法的时候，会设置 set 对应 selectorSet，说明会创建一个可读可写类型的 selector。

如果 set 为 null，那么会创建一个只读类型的 selector。



接下来看一下 selector 里面对应的内部方法，这里主要看一下：

- selectorPeek
- selectorGet
- selectorSet
- selectorInit
- invalidateSelector



## selectorPeek方法

该方法用于预览当前 selector 的值。对应的源码如下：

```ts
// 接收两个参数
// store：状态仓库
// state：状态树
function selectorPeek(store: Store, state: TreeState): ?Loadable<T> {
  // 首先第一步，通过 key 从 state.atomValues 里面获取对应的 selector 值
  // Loadable 是 Recoil 里面所定义的一种值的类型
  // 这种值会有三个状态：1.确认已经有值 2. 可能正在加载 3. 加载失败
  const cachedLoadable = state.atomValues.get(key);
  if (cachedLoadable != null) {
    // 如果能够从 state.atomValues 获取到对应的值，那么就直接返回这个值
    return cachedLoadable;
  }

	// 如果没有从 state.atomValues 里面获取到对应的值
  // 那么就从 cache.get 方法里面去拿
  return cache.get(nodeKey => {
    invariant(typeof nodeKey === 'string', 'Cache nodeKey is type string');
    return peekNodeLoadable<mixed>(store, state, nodeKey)?.contents;
  });
}
```

总结一下，selectorPeek 用于获取指定的 selector 的当前值。首先会尝试从状态树的缓存中去获取，如果没有获取到，那么就会尝试从 cache 中去获取。这是内部的一种优化手段，避免了去做不必要的重新计算。



## selectorGet方法

同样是获取 selector 的当前值，对应的源码如下：

```ts
function selectorGet(store: Store, state: TreeState): Loadable<T> {
  if (store.skipCircularDependencyDetection_DANGEROUS === true) {
    // 如果进入此分支，那么说明关闭了循环依赖的检测
    // 那么直接调用 getSelectorLoadableAndUpdateDeps 方法来获取 selector 的值
    return getSelectorLoadableAndUpdateDeps(store, state);
  }
  return detectCircularDependencies(() =>
    getSelectorLoadableAndUpdateDeps(store, state),
  );
}
```

这段代码的核心，就是通过 getSelectorLoadableAndUpdateDeps 方法去获取 selector 的值。只不过在获取值之前，会做一个循环依赖的检测。通过 detectCircularDependencies 方法来检测循环依赖，但是存在一种情况，可能循环依赖的检测是关闭了的，如果关闭了循环依赖检测，那么会进入上面的 if，直接调用 getSelectorLoadableAndUpdateDeps 方法去获取 selector 的值。如果没有关闭那么就是通过 detectCircularDependencies 去做循环依赖的检测。



这里要说一下，关于 selectorPeek 和 selectorGet 都是获取 selector 对应的值，但是它们的用途和行为是略有不同的：

- selectorPeek 仅仅是从缓存或者状态树中获取 selector 的值，**不会触发重新计算**，所以它仅仅是用来预览当前的 selector 的值，另外如果没有缓存的值，最终得到的 null。
- selectorGet 在获取值的时候，如果发现值已经失效（例如依赖的 atom 或者 selector 发生了改变），那么会触发它的重新计算。



## selectorInit方法

该方法一看就知道，是用来初始化 selector 的。

对应的源码如下：

```ts
function selectorInit(store: Store): () => void {
  // 将对应的 key 添加到 selectors 的集合当中
  store.getState().knownSelectors.add(key);
  // liveStoresCount 是一个计数器，用于跟踪当前有多少个活跃的 store
  liveStoresCount++;
  // 返回的是一个清理函数，该清理函数被调用的时候，会减少活跃 store 的数量
  return () => {
    liveStoresCount--;
  };
}
```

总结一下，selectorInit 方法作用是初始化 selector，它会将 selector 的 key 添加到 selectors 的集合中，并增加活跃 store 的数量。当 selector 不再需要的时候，可以调用返回的清理函数，来减少活跃的 store 的数量。



## invalidateSelector方法

用于让一个特定的 selector 失效。

```ts
function invalidateSelector(state: TreeState) {
  // 就是从 state.atomValues 删除对应 key 的 selector
  state.atomValues.delete(key);
}
```



## selectorSet方法

selectorSet 对应的源码如下：

```ts
// 接收三个参数
// store：状态仓库
// state：状态树
// newValue：新的值
const selectorSet = (store: Store,state: TreeState,newValue: T | DefaultValue,): AtomWrites => {
  // 该变量是用于作为一个标志，用来标志 selector 新值是否已经成功设置。
  let syncSelectorSetFinished = false;
  // 用来保存所有的写入操作
  const writes: AtomWrites = new Map();

  // 接下来声明了三个内部方法
  function getRecoilValue<S>({key: depKey}: RecoilValue<S>): S {
    // ...
  }

  function setRecoilState<S>(recoilState: RecoilState<S>,valueOrUpdater: ValueOrUpdater<S>,) {
    // ...
  }

  function resetRecoilState<S>(recoilState: RecoilState<S>) {
    // ...
  }

  // 接下来调用 set 方法来设置 selector 的新值
  // 调用 set 方法时传入两个参数，第一个是一个对象，对象对应的键值就是上面所声明的内部方法
  // 第二个参数就是要设置的新值
  const ret = set(
    {set: setRecoilState, get: getRecoilValue, reset: resetRecoilState},
    newValue,
  );

 
 	// 如果 rest 不为 undefined，那么说明是有问题，那么最终会抛出一个错误
  // 因为在当前的 Recoil 实现中，set 函数应该是一个 void 函数，目前还不支持异步。
  if (ret !== undefined) {
    throw isPromise(ret)
      ? err('Recoil: Async selector sets are not currently supported.')
      : err('Recoil: selector set should be a void function.');
  }
  
  // 将标志修改为 true，表示 selector 的新值已经成功设置
  syncSelectorSetFinished = true;

  // 最后向外部返回 writes（是一个 map，记录了所有的写的操作）
  return writes;
};
```



### getRecoilValue方法

对应的源码如下：

```ts
function getRecoilValue<S>({key: depKey}: RecoilValue<S>): S {
  // 这里其实是一个错误检查，如果 syncSelectorSetFinished 如果为 true，则抛出错误
  // 这是因为在当前版本的 Recoil 实现中，还不支持异步的 selector 设置
  if (syncSelectorSetFinished) {
    throw err('Recoil: Async selector sets are not currently supported.');
  }

  // 这一步就是根据 key（depKey）去获取对应的值，这个值是一个 loadable 类型的值
  // 我们知道 loadable 类型的值，是有三个状态
  // 1. 已经有值	2. 正在加载（loading）3. hasError（表示有错误）
  const loadable = getNodeLoadable<S>(store, state, depKey);

  // 接下来就对值所处的状态进行一个判断
  if (loadable.state === 'hasValue') {
    // 如果是 hasValue，说明已经有值了，直接返回对应的值
    return loadable.contents;
  } else if (loadable.state === 'loading') {
    // 如果是处于正在加载，那么说明这是一个异步的 selector 或者 atom，那么目前还不支持
    // 抛出错误
    const msg = `Getting value of asynchronous atom or selector "${depKey}" in a pending state while setting selector "${key}" is not yet supported.`;
    recoverableViolation(msg, 'recoil');
    throw err(msg);
  } else {
    // 说明有错误
    // 抛出对应的错误信息
    throw loadable.contents;
  }
}
```

总结一下，getRecoilValue 的作用就是获取对应的 atom 或者 selector（它们是当前 selector 的一些依赖项目）的值，拿到的是一个 loadable 类型的值，根据 loadable 类型值的不同状态，然后作出不同的处理。



### setRecoilState方法

对应的源码如下：

```ts
// 关于参数 valueOrUpdater，这个第二个参数可以是一个新的值，也可以是一个接收旧值并返回新值的函数
function setRecoilState<S>(recoilState: RecoilState<S>,valueOrUpdater: ValueOrUpdater<S>,) {
  // 首先仍然是一个错误检查，如果 syncSelectorSetFinished 是 true，那么就会抛出一个错误
  // 这是因为在当前版本的 Recoil 实现中，还不支持异步的 selector 设置
  if (syncSelectorSetFinished) {
    const msg =
      'Recoil: Async selector sets are not currently supported.';
    recoverableViolation(msg, 'recoil');
    throw err(msg);
  }

  // 首先判断 valueOrUpdater 是否是一个函数，如果是一个函数，那么就调用该函数来得到新的值，然后再将新的值赋值给 setValue
  // 如果不是函数，那么说明 valueOrUpdater 是一个值，那么直接将这个值赋值给 setValue
  // 也就是说，最终 setValue 会存储要设置的新值
  const setValue =
    typeof valueOrUpdater === 'function'
      ? 
        (valueOrUpdater: any)(getRecoilValue(recoilState))
      : valueOrUpdater;

  // 接下来调用 setNodeValue 方法，该方法用于设置对应的 recoilState.key 所对应的 Recoil 新值
  // setNodeValue 的返回值是所有的写入操作。
  const upstreamWrites = setNodeValue(
    store,
    state,
    recoilState.key,
    setValue,
  );

  // 最后，将 upstreamWrites 里面的写入操作记录到 writes 这个 map 里面
  upstreamWrites.forEach((v, k) => writes.set(k, v));
}
```

总结一下，setRecoilState 方法的作用主要是设置 Recoil 状态的新值，它首先会根据  valueOrUpdater 的类型来确定新的值，然后调用 setNodeValue 来设置新的值，并且将所有的写入操作添加到 writes 这个 map 里面。



### resetRecoilState方法

这个一看就是做重置操作的，对应的源码如下：

```ts
function resetRecoilState<S>(recoilState: RecoilState<S>) {
  setRecoilState(recoilState, DEFAULT_VALUE);
}
```

这里我们可以看到，所谓的重置，仍然是调用的 setRecoilState，只不过要设置的新的值传入的是 DEFAULT_VALUE。







# Hooks源码分析

- useRecoilState
- useRecoilValue
- useSetRecoilState



## useRecoilState

对应的源码如下：

```ts
// useRecoilState 接收一个参数，该参数是一个 RecoilState 类型的数据
// [T, SetterOrUpdater<T>] 是该 Hook 的返回值类型
function useRecoilState<T>(recoilState: RecoilState<T>,): [T, SetterOrUpdater<T>] {
  return [useRecoilValue(recoilState), useSetRecoilState(recoilState)];
}
```

整个 useRecoilState 这个 Hook 的源码是非常简单的，内部使用的就是 useRecoilValue 以及 useSetRecoilState 这两个 Hook。



## useRecoilValue

对应的源码如下：

```ts
function useRecoilValue<T>(recoilValue: RecoilValue<T>): T {
  // 首先通过 useStoreRef 这个 Hook 拿到一个 ref，该 ref 是和 store 相关的
  const storeRef = useStoreRef();
  // 调用 useRecoilValueLoadable 这个 Hook，该 Hook 接收一个 recoilValue 的数据
  // 返回一个 loadable 类型的数据
  const loadable = useRecoilValueLoadable(recoilValue);
  // handleLoadable 一看就是处理上一步所得到的 loadable 类型的数据
  return handleLoadable(loadable, recoilValue, storeRef);
}
```

useRecoilValue 这个 Hook 的核心作用是获取 Recoil 状态的值，它首先会获取 Recoil 全局状态存储的引用和 recoilValue 的 loadable 类型的值，然后调用 handleLoadable 来对得到的 loadable 类型的值进行处理并返回。

- useStoreRef
- useRecoilValueLoadable
- handleLoadable



### useStoreRef

useStoreRef 这个 Hook 位于 core/Recoil_RecoilRoot，对应的源码如下：

```ts
// 这里核心就是调用了 React 的 useContext 这个 Hook
// 也就是说，Recoil 背后实际上还是使用 React 的 Context API 来管理的状态
const useStoreRef = (): StoreRef => useContext(AppContext);
```



### useRecoilValueLoadable

得到一个 loadable 类型的数据：

```ts
function useRecoilValueLoadable<T>(recoilValue: RecoilValue<T>,): Loadable<T> {
	// 首先检查 recoilValuesUsed.current（这是一个 Set 集合）是否包含 recoilValue 键值
  // 如果不包含，会调用 setByAddingToSet 方法，然后更新 recoilValuesUsed.current
  if (!recoilValuesUsed.current.has(recoilValue.key)) {
    recoilValuesUsed.current = setByAddingToSet(
      recoilValuesUsed.current,
      recoilValue.key,
    );
  }
  
  // 获取 Recoil 的全局状态存储
  // 全局状态存储包含了所有的 Recoil 状态的值
  const storeState = storeRef.current.getState();
  
  // 最后就是调用 getRecoilValueAsLoadable
  // 该方法会得到一个 loadable 类型的数据
  return getRecoilValueAsLoadable(
    storeRef.current,
    recoilValue,
    reactMode().early
      ? storeState.nextTree ?? storeState.currentTree
      : storeState.currentTree,
  );
}
```



### handleLoadable

对上一步所得到的 loadable 类型的数据进行一个处理。对应的源码如下：

```ts
function handleLoadable<T>(loadable: Loadable<T>,recoilValue: RecoilValue<T>,storeRef: StoreRef,): T {
  // 这里面的逻辑是比较清晰
  // 根据 loadable 类型值的不同状态来做处理
  // 1. hasValue（已经有值）2. loading（正在加载） 3. hasError（有错误）
  
  // 下面就是针对不同的状态来做处理
  if (loadable.state === 'hasValue') {
    // 直接返回响应的值
    return loadable.contents;
  } else if (loadable.state === 'loading') {
    // 如果是 loading 状态，创建一个新的 promise
    const promise = new Promise(resolve => {
      const suspendedComponentResolvers =
        storeRef.current.getState().suspendedComponentResolvers;
      suspendedComponentResolvers.add(resolve);

      if (isSSR && isPromise(loadable.contents)) {
        loadable.contents.finally(() => {
          suspendedComponentResolvers.delete(resolve);
        });
      }
    });
    throw promise;
  } else if (loadable.state === 'hasError') {
    // 如果是有错误，返回错误信息
    throw loadable.contents;
  } else {
    // 不是上面三个状态的其中一个，那么说明也是有问题的，因此抛出一个一个错误
    throw err(`Invalid value of loadable atom "${recoilValue.key}"`);
  }
}
```

总结一下，handleLoadable 方法实际上就是根据传入的 loadable 类型的数据的不同状态，来做不一样的处理。



## useSetRecoilState

对应的源码如下：

```ts
function useSetRecoilState<T>(recoilState: RecoilState<T>): SetterOrUpdater<T> {
  // 1. 通过调用 useStoreRef 获取到 storeRef
  const storeRef = useStoreRef();
  // 最终对外暴露的其实是 (newValueOrUpdater: (T => T | DefaultValue) | T | DefaultValue) => ...
  return useCallback(
    (newValueOrUpdater: (T => T | DefaultValue) | T | DefaultValue) => {
      setRecoilValue(storeRef.current, recoilState, newValueOrUpdater);
    },
    [storeRef, recoilState],
  );
}
```

也就是说，开发者调用  useSetRecoilState 这个 Hook 后，会拿到一个设置器方法，该方法实际上就是：

```ts
(newValueOrUpdater: (T => T | DefaultValue) | T | DefaultValue) => {
  setRecoilValue(storeRef.current, recoilState, newValueOrUpdater);
}
```

该方法接收一个参数 newValueOrUpdater，这个参数可能是一个值，也有可能是一个函数，内部实际上是调用 setRecoilValue 来进行状态的修改。



### setRecoilValue

对应的源码位于 core/Recoil_RecoilValueInterface.js 文件下面，对应源码如下：

```ts
function setRecoilValue<T>(
  store: Store,
  recoilValue: AbstractRecoilValue<T>,
  valueOrUpdater: T | DefaultValue | (T => T | DefaultValue),
): void {
  // 这里在做更新的时候，会调用一个 queueOrPerformStateUpdate 方法
  // 该方法一看就是放入到队列里面来执行
  queueOrPerformStateUpdate(store, {
    type: 'set',
    recoilValue,
    valueOrUpdater,
  });
}
```



### queueOrPerformStateUpdate

对应的源码如下：

```ts
function queueOrPerformStateUpdate(store: Store, action: Action<mixed>): void {
  // 首先通过判断 batchStack 的长度来查看是否存在批处理栈
  if (batchStack.length) {
    // 说明存在批处理栈
    
    // 获取批处理栈的最后一个元素，它是一个 Map，其中的键是状态仓库（store），值是一个数组，存储了要执行的操作
    const actionsByStore = batchStack[batchStack.length - 1];
    // 尝试从 map 中获取与当前状态仓库相关的操作数组
    let actions = actionsByStore.get(store);
    // 如果没有找到与当前状态仓库相关的操作数组，那么会创建一个新的数组，并且和当前的状态仓库相关联。
    if (!actions) {
      actionsByStore.set(store, (actions = []));
    }
    // 将新的操作添加到与当前状态仓库相关的操作数组中
    actions.push(action);
  } else {
    // 如果不存在批处理栈，那么就立即执行新的操作。
    applyActionsToStore(store, [action]);
  }
}
```


# 手写mini-recoil

## 实现Basic类

```ts
import type { voidFn, subscribeReturn } from "./types";

// 创建了一个 Map，该 Map 的 key 对应的是 string，value 是一个 Basic 类的实例
export const NameSpace = new Map();

// 创建一个叫做 Basic 的类，该类就是一个简单的状态管理工具
// 功能类似于常见的状态管理库（Redux、Mobx）
// 允许你存储一个值，并且在这个值发生变化的时候通知所有的订阅者（本质上就是一个发布订阅模式）
export class Basic<T> {
  // 这里创建了一个集合，该集合就包含了所有订阅 value 变化的回调函数
  // 每个回调函数都接收一个 T 类型的参数，这个参数就是 value 的值
  private listeners = new Set<voidFn>();

  // 接收一个可选的参数 value，该参数的类型为泛型 T
  constructor(protected value?: T) {
    // 这里主要是为了绑定 this 的指向。
    // 在 JavaScript 中，this 的指向默认指向的是调用它的对象
    // 通过这个 bind 方法，我们可以将 this 的指向绑定到 Basic 类的实例上
    this.getter = this.getter.bind(this);
    this.setter = this.setter.bind(this);
  }

  // Basic 这个类主要有 4 个方法，分别是：

  // 获取器，用于获取 value 的值
  getter() {
    // 这里的 this.value 就是 Basic 类的实例上的 value 属性
    return this.value as T;
  }

  // 设置器，用于设置 value 的值
  setter(value: T) {
    if (this.value === value) {
      // 说明传入的新的值和旧的值是一样的，抛出一个错误
      throw new Error("value is same");
    } else {
      // 进入此分支，说明新值和旧值不同，将新值赋值给 value
      this.value = value;
      // 既然值发生了改变，我需要通知所有的订阅者
      this.emit();
    }
  }

  // 该方法用于遍历所有的订阅者，并且调用它们的回调函数，将当前的 value 作为参数传入进去
  emit() {
    for (const listener of this.listeners) {
      const value = this.getter(); // 拿到新的值
      listener(value as T); // 调用订阅者的回调函数
    }
  }

  // 该方法是订阅方法，用于将一个回调函数添加到 listeners 集合中
  subscribe(callback: voidFn): subscribeReturn {
    this.listeners.add(callback);
    // 返回一个取消订阅的方法
    return {
      unsubscribe: () => {
        this.listeners.delete(callback);
      },
    };
  }
}

```

## 实现Atom类

```ts
// atom 是如何使用的
// const counter1 = atom({
//   key: "counter1",
//   default: 0,
// });
import type { AtomContext } from "./types";
import { Basic, NameSpace } from "./basic";

export class Atom<T> extends Basic<T> {
  value: T;

  // Atom 类的构造函数接收一个 AtomContext 类型的参数
  // 该参数是一个对象，包含了 key 和 default 两个属性
  // key 是一个 string 类型的值，default 是一个泛型 T 类型的值
  // 最终将对应的 context.default 赋值给 this.value
  constructor(context: AtomContext<T>) {
    super();
    this.value = context.default;
  }
}

export const atom = <T>(value: AtomContext<T>) => {
  // 首先我们需要判断传入的值的 key 是否已经存在
  if (NameSpace.has(value.key)) {
    // 进入此分支，说明当前的 NameSpace 中已经存在了该 key
    // 这里可以抛出一个错误
    throw new Error(`${value.key} is exist`);
  } else {
    // 说明不存在，那么这里就可以创建一个 Atom 的实例对象，然后添加到 NameSpace 中
    // defaultValue 就是一个 Atom 的实例对象
    const defaultValue = new Atom(value);
    // 将 defaultValue 添加到 NameSpace 中
    // NameSpace 是一个 Map，它的 key 是 string 类型，value 是 Atom 类的实例
    NameSpace.set(value.key, defaultValue);
    // 向外部返回 Atom 的实例对象
    return defaultValue;
  }
};


```

## 实现Selector类

```ts
// selector 是如何使用的
// const sum = selector({
//   key: "sum",
//   get: ({ get }) => {
//     const counter1Value = get(counter1);
//     const counter2Value = get(counter2);
//     return counter1Value + counter2Value;
//   },
// });

import { Basic, NameSpace } from "./basic";
import type { SelectorContext, RecoilState } from "./types";

export class Selector<T> extends Basic<T> {
  // 这是一个集合，用于存放所有的依赖项
  private registeredDeps = new Set();

  // 该方法就是用来返回一个 atom 或者 selector 的值
  // 并且在获取到最新的值之后，还需要通知所有的订阅者
  private updateSelector() {
    // 首先使用 context.get 方法获取到最新的值
    this.value = this.context.get({
      get: <T>(dep: RecoilState<T>) => dep.getter() as T,
    });
    // 调用 emit 方法来通知所有的订阅者
    this.emit();
  }

  // 该方法就是用来返回一个 atom 或者 selector 的值
  private bindAtom<V>(dep: RecoilState<V>): V {
    // 在获取值之前，其实还有事情要做
    // 我们需要订阅这个依赖项的变化，并且在依赖项变化的时候调用 updateSelector 方法
    dep.subscribe(() => this.updateSelector());
    this.registeredDeps.add(dep);
    return dep.getter() as V;
  }

  constructor(private readonly context: SelectorContext<T>) {
    super();
    // 接下来修改 value 值
    this.value = context.get({
      // 下面的 get 方法需要返回 atom 或者 selector 的值
      get: <T>(dep: RecoilState<T>) => this.bindAtom(dep),
    });
  }

  // setter 方法
  // 主要用于设置 Selector 的值
  setter() {
    if (this.context.set) {
      // 如果开发者在调用 selector 的时候传入了 set 方法
      // 那么就调用 set 方法
      this.context.set({
        get: <T>(dep: RecoilState<T>) => dep.getter() as T,
        set: <V>(dep: RecoilState<V>, value?: V) => dep.setter(value as V),
      });
    } else {
      // 说明开发者没有传递 set 方法
      throw new Error(`Selector ${this.context.key} has no setter`);
    }
  }
}

export const selector = <T>(context: SelectorContext<T>) => {
  if (NameSpace.has(context.key)) {
    // 如果已经存在了，就抛出错误
    throw new Error(`Atom ${context.key} is already defined`);
  } else {
    // 进入此分支，说明还没有定义过
    // 我们就需要先创建一个 Selector 的实例对象，然后把它放到 NameSpace 中
    const defaultValue = new Selector(context);
    // 将 defaultValue 添加到 NameSpace 中
    NameSpace.set(context.key, defaultValue);
    // 向外界返回这个 Selector 的实例对象
    return defaultValue;
  }
};


```

## 实现Hooks功能

```ts
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


```


> 本文所有源码均在：https://github.com/Sunny-117/mini-anything

# 「❤️ 感谢大家」

如果你觉得这篇内容对你挺有有帮助的话：
点赞支持下吧，让更多的人也能看到这篇内容（收藏不点赞，都是耍流氓 -\_-）欢迎在留言区与我分享你的想法，也欢迎你在留言区记录你的思考过程。觉得不错的话，也可以阅读 Sunny 近期梳理的文章（感谢掘友的鼓励与支持 🌹🌹🌹）：

**我的博客：**

**Github：**[**https://github.com/sunny-117/**](https://github.com/sunny-117/)

**前端八股文题库：**[https://sunny-117.github.io/blog/](https://sunny-117.github.io/blog/)

**前端面试手写题库：**[https://github.com/Sunny-117/js-challenges](https://github.com/Sunny-117/js-challenges)

**手写前端库源码教程：**[https://sunny-117.github.io/mini-anything](https://sunny-117.github.io/mini-anything/)

**热门文章**

- [✨ 爆肝 10w 字，带你精通 React18 架构设计和源码实现【上】](https://juejin.cn/spost/7381371976035532835)
- [✨ 爆肝 10w 字，带你精通 React18 架构设计和源码实现【下】](https://juejin.cn/spost/7381395976676196387)
- [前端包管理进阶：通用函数库与组件库打包实战](https://juejin.cn/post/7376827589909266458)
- [🍻 前端服务监控原理与手写开源监控框架 SDK](https://juejin.cn/post/7374265502669160482)
- [🚀 2w 字带你精通前端脚手架开源工具开发](https://juejin.cn/post/7363607004348989479)
- [🔥 爆肝 5w 字，带你深入前端构建工具 Rollup 高阶使用、API、插件机制和开发](https://juejin.cn/post/7363607004348923943)
- [🚀 Rust 构建简易实时聊天系统](https://juejin.cn/post/7389952004792434688)

**专栏**

- [精通现代前端工具链及生态](https://juejin.cn/column/7287224080172302336)
- [Vue 3 设计哲学与源码揭秘](https://juejin.cn/column/7391745629876830208)
- [esbuild 原理与应用实战](https://juejin.cn/column/7285233095058718756)
- [js-challanges 题解来了，迎接你的校招提前批](https://juejin.cn/column/7244788137410560055)
