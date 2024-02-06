# create-vue

## create-vue 简单介绍

🛠️ The recommended way to start a Vite-powered Vue project

翻译成中文是：启动 Vite 驱动的 Vue 项目的推荐方法

你可以通过 `npm create vue@3`命令来快速搭建 Vue3 项目

![](../public/vue/2023-02-02-13-14-20.png)

> 用过 vite 的小伙伴可能还会知道用 vite 搭建项目，不过
> vite 搭建的项目需要安装对应的插件来解析 vue 文件。两者都可以快速搭建 vue 项目。

:::danger 注意
Vue 官方已经不推荐使用 vue-cli 搭建工程，只对 vue-cli 进行 bug 修复和维护工作，不会添加新的 feature
:::

## 从 package.json 开始

### 开发依赖 devDependencies

```json
{
  "devDependencies": {
    "@types/eslint": "^8.4.10",
    "@types/node": "^18.11.18",
    "@types/prompts": "^2.4.2",
    "@vue/create-eslint-config": "^0.1.3",
    "@vue/tsconfig": "^0.1.3",
    "esbuild": "^0.16.14",
    "esbuild-plugin-license": "^1.2.2",
    "husky": "^8.0.3",
    "kolorist": "^1.6.0",
    "lint-staged": "^13.1.0",
    "minimist": "^1.2.7",
    "npm-run-all": "^4.1.5",
    "prettier": "^2.8.1",
    "prompts": "^2.4.2",
    "zx": "^4.3.0"
  }
}
```

接下来，我会介绍每一个包是做什么的

- `@types/eslint`
- `@types/node`
- `@types/prompts`

以上三个以`@types`开头的包，都是 TypeScript 类型声明文件

- [`@vue/create-eslint-config`](https://github.com/vuejs/create-eslint-config)

Vue 官方的 eslint 插件，可以使用 ESLint 检查 SFC 中的`<template>` 和 `<script>` ，也的包含项目中的 js 文件

- [`@vue/tsconfig`](https://github.com/vuejs/tsconfig)

Vue3 项目的基本 tsconfig

- [`esbuild`](https://esbuild.docschina.org/)

构建工具，用 Go 编写，性能强大

- `esbuild-plugin-license`

用于向最终捆绑包添加许可横幅并输出第三方许
可的 esbuild 插件

- `husky`
- `lint-staged`

🚫💩 以上两款工具都是优化团队 git 提交工具

- `kolorist`

用来为命令行着色

- `minimist`

用来解析参数选项

- `npm-run-all`

用于并行或顺序运行多个 npm 脚本的 CLI 工具。

- `prettier`

代码格式化

- `prompts`

轻便、美观、用户友好的交互式提示

![](https://github.com/terkelg/prompts/raw/master/media/example.gif)

- [`zx`](https://github.com/google/zx)

Google 出品的编写脚本的工具

## 源码解读

![](../public/vue/2023-02-02-13-35-36.png)

进入到 create-vue 源码，核心代码是 index.ts。

从初始化项目输出图来看。主要是三个步骤。

1. 输入项目名称，默认值是 vue-project
2. 询问一些配置 渲染模板等
3. 完成创建项目，输出运行提示

```js
async function init() {
  // core code
}

// async 函数返回的是Promise 可以用 catch 报错
init().catch((e) => {
  console.error(e);
});
```
