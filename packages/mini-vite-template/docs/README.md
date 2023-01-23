<h1 align="center">Welcome to mini-vite 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/mini-vite" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/mini-vite.svg">
  </a>
  <a href="https://sunny-117.github.io/mini-vite" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> 下一代的前端工具链 Vite 核心逻辑

### 🏠 [Homepage](https://github.com/Sunny-117/mini-vite)

## Author

👤 **sunny-117**

* Website: https://jzq422bol5.feishu.cn/wiki/wikcnDmhEiZBKFhsmvXoL4XOWuf
* Github: [@sunny-117](https://github.com/sunny-117)


## mini-vite 请求处理流程图

![](/req.png)

## mini-vite 核心代码逻辑

```js

// server.js
const Koa = require("koa");
const app = new Koa();

const fs = require("fs");
const path = require("path");

const { parse } = require("@vue/compiler-sfc");
const { compile } = require("@vue/compiler-dom");

function rewriteImport(content) {
  return content
    .replace(/(from\s+['"])(?![\.\/])/g, "$1/@modules/")
    .replace(/process\.env\.NODE_ENV/g, '"development"');
}

app.use(async (ctx) => {
  // ctx.body = 'kkb vite'
  const url = ctx.request.url;
  if (url === "/") {
    ctx.type = "text/html";
    console.log(ctx.path)
    ctx.body = fs.readFileSync("./index.html", "utf-8");
  } else if (url.endsWith(".js")) {
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = "text/javascript";
    const ret = fs.readFileSync(p, "utf-8");
    ctx.body = rewriteImport(ret);
  } else if (url.startsWith("/@modules")) {
    const moduleName = url.replace("/@modules/", "");
    const prefix = path.resolve(__dirname, "node_modules", moduleName);
    const module = require(prefix + "/package.json").module;
    const filePath = path.join(prefix, module);
    const ret = fs.readFileSync(filePath, "utf8");
    ctx.type = "text/javascript";
    ctx.body = rewriteImport(ret);
  } else if (url.endsWith(".vue")) {
    // 解析单文件组件相当于vue-loader做的事情
    // 转换script部分：将默认导出的组件对象转换为常量
    const p = path.resolve(__dirname, url.slice(1));
    const ret = parse(fs.readFileSync(p, "utf-8"));
    const scriptContent = ret.descriptor.script.content;
    const script = scriptContent.replace(
      "export default ",
      "const __script = "
    );

    // 转换template为模板请求
    // 将转换获得的渲染函数设置到__script上
    // 最后重新导出__script
    ctx.type = "text/javascript";

    //  如果我在这一步就对 url 做解析会怎么样？
    // 因为使用 compile 得到的 render 并不是只有一个 render 函数，还有其中的导入依赖的代码逻辑
    // 不方便直接拼到 __script.render = 上，  所以在利用一个请求单独来处理

    ctx.body = `
      ${rewriteImport(script)}
      import { render as __render } from '${url}?type=template'
      __script.render = __render
      export default __script
    `;
  } else if (url.endsWith("?type=template")) {
    // 模板编译请求
    const p = path.resolve(__dirname, url.split("?")[0].slice(1));
    const ret = parse(fs.readFileSync(p, "utf-8"));
    const template = ret.descriptor.template.content;
    // 使用编译该模板
    const render = compile(template, { mode: "module" }).code;
    ctx.type = "text/javascript";
    ctx.body = rewriteImport(render);
  } else if (url.endsWith(".png")) {
    ctx.body = fs.readFileSync("src" + url);
  }
});

app.listen(3000, () => {
  console.log("vite start");
});


```


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_