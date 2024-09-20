// 引入 zustand 库中的 create 函数
import { create } from "./zustand/index.js";
import { persist, createJSONStorage } from './zustand/middleware/persist'
/**
 * 定义了一个名为 useStore 的状态管理器，状态管理器有三个属性：number，add，minus
 * number 属性代表状态管理器中的状态，add 和 minus 函数分别是更新 number 属性的方法
 */
const useStore = create(persist((set) => {
  return {
    number: 0,
    name: 'Number',
    add: () => set(state => ({ number: state.number + 1 })),
    minus: () => set(state => ({ number: state.number - 1 })),
    asyncAdd: () => {
      setTimeout(() => {
        set(state => ({ number: state.number + 1 }));
      }, 1000);
    }
  }
}, {
  name: 'counter', // unique name
  storage: createJSONStorage(sessionStorage)
}));
// React组件展示了如何使用状态管理器中的状态和方法
function App() {
  // 从useStore状态管理器中解构出了四个状态：name，number，add，minus
  // const { name, number, add, minus, asyncAdd } = useStore();

  // ! 状态分片
  const { number, name, add, minus, asyncAdd } = useStore(state => (
    {
      number: state.number,
      add: state.add,
      minus: state.minus,
      asyncAdd: state.asyncAdd
    })
  );
  return (
    <div>
      <p>
        {name}: {number}
      </p>
      <button onClick={add}>+</button>
      <button onClick={minus}>-</button>
      <button onClick={asyncAdd}>async +</button>
    </div>
  );
}
export default App;
