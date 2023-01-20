#!/usr/bin/env node

const spawn = require("cross-spawn");
const args = process.argv.slice(2);
const script = args[0]; // build
// 同步的方式 执行js脚本
spawn.sync(process.execPath, [require.resolve(`../scripts/${script}`)], {
  stdio: "inherit", // 父子进程共享 输入 输出
});
