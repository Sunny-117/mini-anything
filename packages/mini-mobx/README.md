## mobx
mobx是一个简单可扩展的状态管理库

## mobx vs redux
mobx学习成本更低，性能更好的的状态解决方案

开发难度低
开发代码量少
渲染性能好

## 核心思想
- 状态变化引起的副作用应该被自动触发

应用逻辑只需要修改状态数据即可,mobx会自动渲染UI，无需人工干预
数据变化只会渲染对应的组件
MobX提供机制来存储和更新应用状态供 React 使用
通过提供机制把应用状态转换为可渲染组件树并对其进行渲染

```
yarn add webpack webpack-cli babel-loader babel-core babel-preset-env babel-preset-react babel-preset-stage-0 babel-plugin-transform-decorators-legacy
 mobx mobx-react  react react-dom
```
