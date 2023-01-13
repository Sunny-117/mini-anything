// 引入内置模块
const fs = require("fs");
const path = require("path");
// 引入解析模块
const Parser = require("./Parser");

class Compiler {
  constructor(options) {
    this.entry = options.entry; // 实例属性 entry 存储用户配置的 entry 信息
    this.output = options.output; // 实例属性 output 存储用户配置的 output 信息
    this.modules = []; // 存储模块
  }

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
}

// 导出这个类
module.exports = Compiler;
