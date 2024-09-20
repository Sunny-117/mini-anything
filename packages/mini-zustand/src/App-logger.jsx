// 引入 zustand 库中的 create 函数
import { create } from "./zustand/index.js";
import logger from './zustand/middleware/logger.js'; // 导入 logger 中间件从 './zustand/middleware/logger' 模块中
import { persist, createJSONStorage } from './zustand/middleware/persist'
/**
 * 定义了一个名为 useStore 的状态管理器，状态管理器有三个属性：number，add，minus
 * number 属性代表状态管理器中的状态，add 和 minus 函数分别是更新 number 属性的方法
 */
// 创建一个名为 useStore 的状态管理器
// 参数是一个createState方法，用来返回管理的状态
// useStore也是一个函数，可以通过调用它返回管理的状态
const useStore = create(logger((set) => ({
  // 定义 number 属性，初始值为 0
  number: 0,
  // 定义 name 属性，初始值为 Number
  name: "Number",
  // 定义 add 函数，通过 set 函数更新状态
  add: () => set((state) => ({ number: state.number + 1 })),
  // 定义 minus 函数，通过 set 函数更新状态
  minus: () => set((state) => ({ number: state.number - 1 })),
  asyncAdd: () => {
    setTimeout(() => {
      set((state) => ({ number: state.number + 1 }));
    }, 1000);
  },
})));
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
