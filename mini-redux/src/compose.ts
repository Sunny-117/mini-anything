// 函数式编程
/**
 *
 * @param  {...any} funcs
 * @returns 返回新的函数
 */
export default function compose(...funcs) {
  // if (funcs.length === 0) {
  //   return (args) => args; //如果没有要组合的函数，则返回的函数原封不动的返回参数
  // } else if (funcs.length === 1) {
  //   //要组合的函数只有一个
  //   return funcs[0];
  // }

  // return funcs.reduce(
  //   (a, b) =>
  //     (...args) =>
  //       a(b(...args)) //前面的调用(后面的函数的结果)
  // );

  return function (...args) {
    let lastReturn = null; //记录上一个函数返回的值，它将作为下一个函数的参数
    for (let i = funcs.length - 1; i >= 0; i--) {
      const func = funcs[i];
      if (i === funcs.length - 1) {//数组最后一项
        lastReturn = func(...args)
      }
      else {
        lastReturn = func(lastReturn)
      }
    }
    return lastReturn;
  }
}
