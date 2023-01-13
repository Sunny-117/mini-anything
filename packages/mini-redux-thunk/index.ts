function createThunkMiddleware(extra?) {
  //该函数返回一个thunk中间件
  return (store) => (next) => (action) => {
    if (typeof action === "function") {
      //如果是个函数
      return action(store.dispatch, store.getState, extra); //三个参数
    }
    return next(action); //如果不是函数，递交给下一个
  };
}

const thunk: any = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware; //额外参数
export default thunk;
