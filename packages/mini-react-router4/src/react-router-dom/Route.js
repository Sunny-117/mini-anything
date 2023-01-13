import React from 'react';
import { Consumer } from './context';
import pathToReg from 'path-to-regexp';
export default function Route({ path, component: Component, exact = false }) {
  return <Consumer>
    {state => {
      // path是route中传递的
      // pathname是location中的
      let pathname = state.location.pathname;
      // 根据path实现一个正则 通过这则匹配
      let keys = [];
      let reg = pathToReg(path, keys, { end: exact });
      keys = keys.map(item => item.name); // [id,name];
      let result = pathname.match(reg);
      let [url, ...values] = result || []; // [1,2]
      let props = {
        location: state.location,
        history: state.history,
        match: {
          params: keys.reduce((obj, current, idx) => {
            obj[current] = values[idx];
            return obj;
          }, {})
        }
      }
      if (result) {
        return <Component {...props}></Component>
      }
      return null
    }}
  </Consumer>

}