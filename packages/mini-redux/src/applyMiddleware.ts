import compose from "./compose";
/**
 * 注册中间件
 * @param  {...any} middlewares 所有的中间件
 */
export default function (...middlewares) {
  return function (createStore) {
    //给我创建仓库的函数
    //下面的函数用于创建仓库
    return function (reducer, defaultState) {
      //创建仓库
      const store = createStore(reducer, defaultState);
      // 官方代码给了他一个默认函数
      let dispatch: any = () => {
        throw new Error("目前还不能使用dispatch");
      };
      const simpleStore = {
        // 中间件本身是一个函数，该函数接收一个store参数，表示创建的仓库，该仓库并非一个完整的仓库对象，仅包含getState，dispatch。该函数运行的时间，是在仓库创建之后运行。
        getState: store.getState,
        // dispatch: store.dispatch
        // 错误原因：这里的dispatch指向的是最原始的dispatch，
        dispatch: (...args) => dispatch(...args),
      };
      //给dispatch赋值
      //根据中间件数组，得到一个dispatch创建函数的数组
      //   [logger1, logger2]----> [dispatch创建函数1， dispatch创建函数2]
      const dispatchProducers = middlewares.map((mid) => mid(simpleStore)); //调用中间件就会拿到dispatch创建函数
      //   反向调用数组
      dispatch = compose(...dispatchProducers)(store.dispatch);
      return {
        ...store,
        dispatch, //新的dispatch覆盖原有的dispatch
      };
    };
  };
}
