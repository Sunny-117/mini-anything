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
