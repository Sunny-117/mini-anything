import React from 'react';

import { Consumer } from './context';
import pathToRegExp from 'path-to-regexp';
// Switch的作用就是匹配一个组件
export default function Switch(props) {
  return (<Consumer>
    {state => {
      let pathname = state.location.pathname;
      let children = props.children;
      for (var i = 0; i < children.length; i++) {
        let child = children[i];
        // redirect可能没有path属性
        let path = child.props.path || '';
        let reg = pathToRegExp(path, [], { end: false });
        // switch匹配成功了
        if (reg.test(pathname)) {
          return child; // 把匹配到的组件返回即可
        }
      }
      return null;
    }}
  </Consumer>)
}
