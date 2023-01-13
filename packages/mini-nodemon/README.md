# mini-nodemon

# 需要做的事情

1. 观察文件的改变

- fs.watch() 不好用


- chokidar

**Node.js fs.watch:**

Doesn't report filenames on MacOS.
Doesn't report events at all when using editors like Sublime on MacOS.
Often reports events twice.
Emits most changes as rename.
Does not provide an easy way to recursively watch file trees.
Does not support recursive watching on Linux.
**Node.js fs.watchFile:**

Almost as bad at event handling.
Also does not provide any recursive watching.
Results in high CPU utilization.
Chokidar resolves these problems.

`node main.js` ->command命令, 在 nodejs 中使用 exec 和 spawn 执行命令, 启动一个子进程来执行

测试：

```js

// 方法1：需要等到执行完才会输出
exec("node test.js", (err, stdout) => {
  console.log(stdout);
});

// 方法2：流式，直接输出
spawn("node", ["test.js"], {
  stdio: [process.stdin, process.stdout, process.stderr],
});

```

优化：防抖

2. 重新启动服务，之前需要kill之前的服务，防止报错：端口被占用


# Link

- chokidar: https://www.npmjs.com/package/chokidar

- exec和spawn：http://nodejs.cn/api/child_process.html

