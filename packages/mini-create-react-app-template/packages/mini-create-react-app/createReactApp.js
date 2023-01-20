const path = require("path");
const chalk = require("chalk");
const { Command } = require("commander");
const packageJson = require("./package.json");
const fs = require("fs-extra");
const spawn = require("cross-spawn");

function init() {
  let projectName;
  // 执行 npm start -- myApp 启动项目
  // npm start myApp
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    // <>必选 []可选
    .arguments("<project-directory>")
    .description("创建项目")
    .action((name) => {
      projectName = name;
    })
    .parse(process.argv); // 解析参数 给action

  if (typeof projectName === "undefined") {
    console.error("请输入 项目名称");
    process.exit(1);
  }
  createApp(projectName);
}

function createApp(name) {
  const root = path.resolve(name);

  fs.ensureDirSync(name); // 目录不存在 就创建

  const packageJson = {
    name,
    version: "0.1.0",
    private: true,
  };
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
  const originalDirectory = process.cwd(); //命令执行的工作目录

  process.chdir(root); // process.cwd() 返回值 修改为 root,
  // 后续如果不执行 cwd，则执行目录为新建文件夹的根目录

  run(root, name, originalDirectory);
}

/**
 *
 * @param {*} root 创建的项目的路径 
 * @param {*} appName 项目名 myApp
 * @param {*} originalDirectory 命令执行的工作目录 
 */
async function run(root, appName, originalDirectory) {
  let scriptName = "react-scripts"; // webpack相关 源文件编译，启动服务 都在react-scripts中 实现
  let templateName = "cra-template"; // 模板代码
  const allDependencies = ["react", "react-dom", scriptName, templateName];

  console.log(
    `安装包，可能需要几分钟的时间 ${allDependencies
      .map((v) => chalk.cyan(v))
      .join(", ")}...`
  );
  await install(root, allDependencies);

  let data = [root, appName, true, originalDirectory, templateName];

  // 执行node脚本，会去下载模板依赖 等等。。。
  await executeNodeScript(data);
  console.log("Done.");
  process.exit(0);
}
function install(root, allDependencies) {
  return new Promise((resolve) => {
    const command = "yarnpkg"; // yarnpkg 等同于 yarn
    // --exact 精确安装； --cwd执行安装目录
    const args = ["add", "--exact", ...allDependencies];
    // const args = ["add", "--exact", ...allDependencies, "--cwd", root];
    // inherit 共享父子进程 输入输出
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("close", resolve);
  });
}
function executeNodeScript(data) {
  return new Promise((resolve) => {
    let source = `
    var init = require('react-scripts/scripts/init.js');
    init.apply(null, JSON.parse(process.argv[1]));
  `;
    const child = spawn(
      process.execPath,
      ["-e", source, "--", JSON.stringify(data)],
      // { cwd: process.cwd(), stdio: "inherit" }
      { stdio: "inherit" }
    );
    child.on("close", resolve);
  });
}

module.exports = {
  init,
};
