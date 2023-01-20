console.log("build");
// 1 设置环境变量
process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";

const fs = require('fs-extra');//加强版的fs
const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
// 有未知错误就抛异常
process.on("unhandledRejection", (err) => {
  throw err;
});

// 2 获取webpack配置文件
const configFactory = require("../config/webpack.config");
const config = configFactory("production");
const paths = require("../config/paths");

//3.如果build目录 不为空，要把build目录 清空
fs.emptyDirSync(paths.appBuild);

//4.拷贝public下面的静态文件到build目录
copyPublicFolder();

build();

function build() {
  //compiler是总的编译对象
  let compiler = webpack(config);
  //开启编译
  compiler.run((err, stats) => {
    console.log(err);
    console.log(stats); //它是一个描述对象，描述本次打包出来的结果
    console.log(chalk.green("Compiled successfully!"));
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    filter: (file) => file !== path.appHtml, //index.html文件交由插件编译处理，它不需要拷贝
  });
}
