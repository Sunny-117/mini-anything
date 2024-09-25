import "./App.css";
import { counter1, counter2, sum } from "./store";
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "./recoil/hooks";

function App() {
  // 获取第一个原子状态值以及设置方法
  const [count1, setCount1] = useRecoilState(counter1);

  // 获取第二个原子状态值
  const count2 = useRecoilValue(counter2);
  // 获取第二个原子状态值的设置方法
  const setCount2 = useSetRecoilState(counter2);

  // 获取计算值
  const sumState = useRecoilValue(sum);

  return (
    <>
      <h1>mini recoil</h1>
      <div className="card">
        <button
          className="btn"
          onClick={() => {
            const newCount = count1 + 1;
            setCount1(newCount);
          }}
        >
          计数器一： {count1}
        </button>
        <button
          className="btn"
          onClick={() => {
            const newCount = count2 + 1;
            setCount2(newCount);
          }}
        >
          计数器二： {count2}
        </button>
        <p>和：{sumState}</p>
      </div>
    </>
  );
}

export default App;

