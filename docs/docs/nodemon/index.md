# nodemon

## nodemon 是什么

nodemon 是一个自动重启 node 应用的工具，当监听的文件或监听目录下的文件发生修改时，自动重启应用。
使用 nodemon 不需要对应用本身的代码做任何修改。nodemon 可以看作 node 的执行容器。使用 nodemon，只需要在执行代码的时候，把 node 换成 nodemon 即可。

## 实现思路

### 观察文件的改变

使用第三方库：chokidar

[为什么不直接使用 Node.js fs.watch?](https://github.com/paulmillr/chokidar#why)

根据 chokidar 官方，为什么不直接使用 Node.js fs.watch 来观察文件的变化？

1. Node.js fs.watch:

- Doesn't report filenames on MacOS.
- Doesn't report events at all when using editors like Sublime on MacOS.
- Often reports events twice.
- Emits most changes as rename.
- Does not provide an easy way to recursively watch file trees.
- Does not support recursive watching on Linux.

2. Node.js fs.watchFile:

- Almost as bad at event handling.
- Also does not provide any recursive watching.
- Results in high CPU utilization.

代码实现：

```ts
chokidar.watch(["main.ts"]).on("all", (event, path) => {
  restart();
});
```


### 重新启动服务

> 之前需要 kill(杀死) 之前的服务 why？
> 
> 防止报错：端口被占用


`node main.js` ->command命令, 在 nodejs 中使用 exec 和 spawn 执行命令, 启动一个子进程来执行


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

代码实现：

```ts
function restart() {
  childProcess && childProcess.kill();

  childProcess = spawn("node", ["main.ts"], {
    stdio: [process.stdin, process.stdout, process.stderr],
  });
}
```

### 小优化

防抖处理

```ts
let debounceRestart = debounce(restart, 500);

function restart(){
    // ...
}
```

## 参考文档

- chokidar: https://www.npmjs.com/package/chokidar

- exec和spawn：http://nodejs.cn/api/child_process.html

