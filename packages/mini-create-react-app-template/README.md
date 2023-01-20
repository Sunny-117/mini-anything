- 自己实现的 create-react-app2和 react-scripts2两个子包
- packages/react-scripts2/package.json  目录下 执行npm run build等命令， 打包react-scripts2/src目录
  -  基本流程已实现  webpack配置 比较简易。 可以去源码中拷贝 复杂的 webpack.config.js
  - 执行 报错 TypeError: Function has non-object prototype 'null' in instanceof check
    at Function  是node 版本的问题 https://github.com/webpack/webpack/issues/11767
- package.json  npm start my-app 可以创建react项目
