# mini-webpack

手写一个简易版的打包器 webpack

本教程将带着大家一步一步制作一个简易的 webpack。

https://github.com/Sunny-117/mini-webpack

## 准备工作

首先我们创建一个简单的项目，项目结构如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-26-092235.png" alt="image-20220726172235427" style="zoom:50%;" />

上面是一个基本的项目目录，其中 src 是我们的源码目录，彼此之间存在一定的依赖关系

```js
// index.js
import { say } from "./hello.js";
document.write(say("webpack"));
```

```js
// hello.js
import { randomNum } from "./tool1.js";
import { printTxt } from "./tool2.js";

export function say(name) {
  const num = randomNum(1, 100);
  printTxt(num);
  return `hello ${name}`;
}
```

```js
// tool1.js
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```

```js
// tool2.js
export function printTxt(txt) {
  console.log(txt);
}
```

HTML 文件可以通过模块化的方式来引入这些文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hello webpack</title>
</head>
<body>
    <script src="./src/index.js" type="module"></script>
</body>
</html>
```

接下来我们要进行打包，就需要有一个 webpack 配置文件

```js
// webpack 配置文件
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
};

```

理论上来讲，有了 webpack 配置文件，我们就可以安装 webpack 来进行打包了。但是这里我们要自己来制作 webpack。

所以到这一步为止，我们的准备工作就做好了。



## Compiler

接下来，在 lib 目录下面来制作我们的的小型 Webpack。

该目录下存在两个文件，分为是 Compiler 和 Parser

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-26-092722.png" alt="image-20220726172722678" style="zoom:50%;" />

其中 Compiler 负责主要的流程工作，回忆一下整个 Webpack 的打包过程：

- **初始化**

- **编译**

- **输出**

我们创建一个 Compiler 类：

```js
// 引入内置模块
const fs = require("fs");
const path = require("path");

class Compiler {
  constructor(options) {
    this.entry = options.entry; // 实例属性 entry 存储用户配置的 entry 信息
    this.output = options.output; // 实例属性 output 存储用户配置的 output 信息
    this.modules = []; // 存储模块
  }
  // 启动构建
  run() {}
  // 构建模块对象
  build() {}
  // 生成对应代码
  generate() {}
}

// 导出这个类
module.exports = Compiler;

```



## build 方法

我们首先来看 build 方法

```js
// 开始构建
build(filename) {
    const { getAst, getDependecies, getCode } = Parser;
    // 获取抽象语法树
    const ast = getAst(filename);
    // 获取到依赖文件
    const dependecies = getDependecies(ast, filename);
    // 获取到依赖文件对应的代码
    const code = getCode(ast);
    // 返回解析过后的内容对象
    // 里面包含文件路径、依赖以及代码
    return {
      filename,
      dependecies,
      code,
    };
}
```

该方法会接收一个 path 路径，例如我们指定的入口文件 ./src/index.js

然后该方法会从 Parser 中解构出三个方法，分别是

- getAst
- getDependecies
- getCode

最后将这些方法的返回结果组成一个对象返回。



## Parser

通过上面的 build 方法，我们知道由 Parser 文件导出了 getAst、getDependecies、getCode

这里会用到 3 个依赖，分别是 @babel/parser、@babel/traverse、@babel/core

```js
"dependencies": {
    "@babel/core": "^7.7.7",
    "@babel/parser": "^7.7.7",
    "@babel/preset-env": "^7.7.7",
    "@babel/traverse": "^7.7.4"
 }
```

Parser 对应的代码如下：

```js
// 引入内置模块
const fs = require("fs");
const path = require("path");
// 引入第三方库
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = {
  // 获取抽象语法树
  getAst: function (path) {
    // 根据传入的地址来读取文件内容
    const content = fs.readFileSync(path, "utf-8");
    // 将内容转为抽象语法树
    return parser.parse(content, {
      sourceType: "module",
    });
  },
  // 获取依赖
  /**
   *
   * @param {*} ast 抽象语法书
   * @param {*} filename 文件路径
   */
  getDependecies: function (ast, filename) {
    // 创建一个对象用于存储依赖，最终返回这个对象
    const dependecies = {};
    // 遍历所有的 import 模块,存入dependecies
    traverse(ast, {
      // 类型为 ImportDeclaration 的 AST 节点 (即为import 语句)
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        // 保存依赖模块路径,之后生成依赖关系图需要用到
        const filepath = "./" + path.join(dirname, node.source.value);
        dependecies[node.source.value] = filepath;
      },
    });

    // 返回该对象
    return dependecies;
  },
  // 获取代码
  getCode: function (ast) {
    // AST 转换为 code
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
    return code;
  },
};

```



## run 方法

有了 build 方法用于构建模块信息对象后，我们就可以来书写 run 方法了。

整个 run 方法分为以下几个步骤：

- 首先第一步，我们将入口文件的路径传递过去，生成一个对应的入口文件的模块放入到数据里面

```js
// 调用实例方法 build，将入口路径传递过去
const info = this.build(this.entry);
this.modules.push(info); // 此对象作为一个模块存储到 modules 数组中
```

- 寻找模块是否有其他依赖，有的话同样是生成模块信息对象放入到数组里面

```js
// 接下来我们需要找到所有的依赖
for (var i = 0; i < this.modules.length; i++) {
  var obj = this.modules[i];
  // 查看当前的模块是否还有依赖
  if (obj.dependecies && this.modules.indexOf(obj.filename) === -1) {
    // 进入此 if，说明还有依赖，遍历所有的依赖
    for (const dependency in obj.dependecies) {
      // 重复之前的行为，得到模块信息对象后推入 modules 数组
      this.modules.push(this.build(obj.dependecies[dependency]));
    }
  }
}
```

- 生成依赖图

```js
// 代码运行到这一步，modules 数组里面存放了所有依赖模块的信息对象
// 接下来我们来生成依赖图
// 这里涉及到了数组 reduce 的基本用法，graph 代表前一项，item 代表当前项
const dependencyGraph = this.modules.reduce(
  (graph, item) => ({
    ...graph,
    [item.filename]: {
      dependecies: item.dependecies,
      code: item.code,
    },
  }),
  {}
);
```

- 根据依赖图生成打包后的代码

```js
// 生成代码
this.generate(dependencyGraph);
```



完整的 run 方法代码如下：

```js
// 构建启动
run() {
  // 调用实例方法 build，将入口路径传递过去
  const info = this.build(this.entry);
  this.modules.push(info); // 此对象作为一个模块存储到 modules 数组中
  // 接下来我们需要找到所有的依赖
  for (var i = 0; i < this.modules.length; i++) {
    var obj = this.modules[i];
    // 查看当前的模块是否还有依赖
    if (obj.dependecies && this.modules.indexOf(obj.filename) === -1) {
      // 进入此 if，说明还有依赖，遍历所有的依赖
      for (const dependency in obj.dependecies) {
        // 重复之前的行为，得到模块信息对象后推入 modules 数组
        this.modules.push(this.build(obj.dependecies[dependency]));
      }
    }
  }

  // 代码运行到这一步，modules 数组里面存放了所有依赖模块的信息对象
  // 接下来我们来生成依赖图
  // 这里涉及到了数组 reduce 的基本用法，graph 代表前一项，item 代表当前项
  const dependencyGraph = this.modules.reduce(
    (graph, item) => ({
      ...graph,
      [item.filename]: {
        dependecies: item.dependecies,
        code: item.code,
      },
    }),
    {}
  );
  // 所生成的 dependencyGraph 实际上就是一个对象
  // 对象的键名为模块路径，对象值为 dependecies 和 code 组成的对象
  // 接下来我们来生成代码
  this.generate(dependencyGraph);
}
```



## generate 方法

该方法用于生成对应的 bundle

```js
// 生产代码
generate(code) {
  // 生成用户配置的打包文件存放路径
  const filePath = path.join(this.output.path, this.output.filename);
  // 生成 bundle
  const bundle = `(function(graph){
        function require(moduleId){ 
          function localRequire(relativePath){
            return require(graph[moduleId].dependecies[relativePath])
          }
          var exports = {};
          (function(require,exports,code){
            eval(code)
          })(localRequire,exports,graph[moduleId].code);
          return exports;
        }
        require('${this.entry}')
      })(${JSON.stringify(code)})`;
  // 最后将生成的 bundle 写入文件
  fs.writeFileSync(filePath, bundle);
}
```

可以看到，该方法的基本思路就是先获取用户配置的打包文件存放路径，生成一个 bundle 字符串，最后将这个字符串写入文件。

那么这里令人比较疑惑的则是 bundle 字符串的生成。

这里首先传入了依赖图，其实就是一个这样的对象

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-26-095601.png" alt="image-20220726175601218" style="zoom:50%;" />

然后定义一个立即执行函数，传入生成的依赖关系图，这里是以字符串的方式传递进去的

```js
(function(graph){
  function require(moduleId){ 
    function localRequire(relativePath){
      return require(graph[moduleId].dependecies[relativePath])
    }
    // ...
  }
  require('${this.entry}')
})(${JSON.stringify(code)})
```

在立即执行函数中，调用了 require 函数，然后重写了 require 函数，通过层层递归拿到所有的依赖模块对象。

```js
 function require(moduleId){ 
   // ... 
   var exports = {};
   (function(require,exports,code){
     // commonjs 语法使用 module.exports 暴露实现
     // 我们传入的 exports 对象会捕获依赖对象(hello.js)暴露的实现(exports.say = say)并写入
     eval(code)
   })(localRequire,exports,graph[moduleId].code);
   return exports;
 }
require('${this.entry}')
```

之后，使用 eval 来执行代码。

eval(code)的执行，是先通过require('./hello.js')拿到_hello，但要注意的是，这里的require实际是传入的localRequire了，而localRequire做的是就是寻址，通过'./hello.js'找到'./src/hello.js'，并使用外面定义的require方法执行，也就是eval执行hello.js代码，这个方法返回的就是一个exports对象



## 打包测试

最后，我们来进行打包测试

在一个 JS 文件中写入如下代码，并执行

```js
const Complier = require("./lib/Compiler");
const options = require("./webpack.config");
new Complier(options).run();
```

执行后会在 dist 目录下生成一个打包文件，然后在 HTML 中引入该文件

```html
<script src="./dist/main.js"></script>
```

至此，我们就实现了一个小型的 Webpack。

通过自己手动实现 Webpack，能够加深我们对 Webpack 整个构建流程的一个理解。

1. **初始化参数**：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. **开始编译**：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 `run` 方法开始执行编译
3. **确定入口**：根据配置中的 `entry` 找出所有的入口文件
4. **编译模块**：从入口文件出发，调用所有配置的 `loader` 对模块进行翻译，再找出该模块依赖的模块，再 `递归` 本步骤直到所有入口依赖的文件都经过了本步骤的处理
5. **完成模块编译**：在经过第 4 步使用 `loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的 `依赖关系图`
6. **输出资源**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
7. **输出完成**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

---

-*EOF*-
