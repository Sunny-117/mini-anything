import React, { useState, useEffect } from 'react';
import { Provider } from './context'
export default function HashRouter(props) {
  const [location, setLocation] = useState({
    pathname: window.location.hash.slice(1) || '/'
  })
  useEffect(() => {
    // 默认hash没有时跳转到/
    window.location.hash = window.location.hash || '/';
    // 监听hash值变化 重新设置状态
    window.addEventListener('hashchange', () => {
      setLocation({
        ...location,
        pathname: window.location.hash.slice(1) || '/'
      })
    });
  }, [])
  const value = {
    location,
    history: {
      push(to) {
        window.location.hash = to;
      }
    }
  }
  return (<Provider value={value} >
    {props.children}
  </Provider>)
}