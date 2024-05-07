import JestHasteMap from "jest-haste-map";
import { fileURLToPath } from "url";
import { dirname, relative, join } from "path";
import { cpus } from "os";
import { runTest } from "./worker.js";
import { Worker } from "jest-worker";
import chalk from "chalk";

// 拿到根目录
const root = dirname(fileURLToPath(import.meta.url));

// 这是一个配置选项，里面配置了要处理的文件扩展名，工作进程的数量
const options = {
  extensions: ["js"], // 只遍历 .js 文件
  maxWorkers: cpus().length, // 并行处理所有可用的 CPU
  name: "best", // 用于缓存的名称
  platforms: [], // 只针对 React Native 使用，这里不需要
  rootDir: root, // 项目的根目录
  roots: [root], // 可以用于只搜索 `rootDir` 中的某个子集文件
};

const hasteMap = new JestHasteMap.default(options);
// 这行代码是可选的，如果你的 jest-haste-map 在 28 版本以上
// 则需要这一行代码来设置缓存路径
await hasteMap.setupCachePath(options);

const { hasteFS } = await hasteMap.build();

// const testFiles = hasteFS.getAllFiles();
// const testFiles = hasteFS.matchFilesWithGlob(["**/*.test.js"]);

// 这边我们在读取测试文件，进行了一个优化，支持第二个参数
// 如果用户传入了第二个参数，那么我们就读取第二个参数所指定的文件
const testFiles = hasteFS.matchFilesWithGlob([
  process.argv[2] ? `**/${process.argv[2]}*` : "**/*.test.js",
]);

// 创建一个 worker
// 1. worker 背后要执行的文件
// 2. 配置对象，这里我们开启了多线程
const worker = new Worker(join(root, "worker.js"), {
  enableWorkerThreads: true,
});

let hasFailded = false; // 是否有失败
await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    // const code = await fs.promises.readFile(testFile, "utf8");
    // console.log(await worker.runTest(testFile));
    const { success, testResults, errorMessage } = await worker.runTest(
      testFile
    );
    const status = success
      ? chalk.green.inverse.bold(" 成功 ")
      : chalk.red.inverse.bold(" 失败 ");

    console.log(status + " " + chalk.dim(relative(root, testFile)));

    if (!success) {
      hasFailded = true;
      // 如果测试失败
      if (testResults) {
        // console.log(testResults,'testResults');
        testResults
          .filter(result => result.errors.length)
          .forEach(result => console.log(
            // Skip the first part of the path which is an internal token.
            result.testPath.slice(1).join(' ') + '\n' + result.errors[0],
          ),)
      } else if (errorMessage) {
        console.log(" " + errorMessage);
      }
    }
  })
);

worker.end();

// 给予失败的信息提示
if (hasFailded) {
  console.log("\n" + chalk.red.bold("测试用例有失败的案例，请检查您的代码"));
  process.exitCode = 1;
}
