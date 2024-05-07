const fs = require("fs");
const { expect } = require("expect");
const mock = require("jest-mock");
const { describe, it, run, resetState } = require("jest-circus");

/**
 * 第一版本
 * @param {*} testFile 要读取的目录
 */
// exports.runTest = async function (testFile) {
//   const code = await fs.promises.readFile(testFile, "utf8");

//   return 'workerID:' + process.env.JEST_WORKER_ID + ">>>" + testFile + ":\n" + code;
// };

/**
 * 第二版本
 * @param {*} testFile 要读取的目录
 */
// exports.runTest = async function (testFile) {
//   const code = await fs.promises.readFile(testFile, "utf8");

//   // 返回的测试结果对象
//   const testResult = {
//     success: false,
//     errorMessage: null,
//   };

//   // expect(1).toBe(2);
//   const expect = (received)=>({
//     toBe(expected){
//         if(received !== expected){
//             throw new Error(`Expected ${expected} but received ${received}`);
//         }
//         return true;
//     }
//   })

//   try {
//     eval(code);
//     testResult.success = true;
//   } catch (error) {
//     testResult.errorMessage = error.message;
//   }

//   return testResult;
// };

/**
 * 第三版本
 * @param {*} testFile 要读取的目录
 */
// exports.runTest = async function (testFile) {
//   const code = await fs.promises.readFile(testFile, "utf8");

//   // 返回的测试结果对象
//   const testResult = {
//     success: false,
//     errorMessage: null,
//   };

//   try {
//     eval(code);
//     testResult.success = true;
//   } catch (error) {
//     testResult.errorMessage = error.message;
//   }

//   return testResult;
// };

// /**
//  * 第四版本
//  * @param {*} testFile 要读取的目录
//  */
// exports.runTest = async function (testFile) {
//   const code = await fs.promises.readFile(testFile, "utf8");

//   // 返回的测试结果对象
//   const testResult = {
//     success: false,
//     errorMessage: null,
//   };

//   try {
//     // 用于存储所有的 describe 对应的回调函数
//     const describeFns = [];
//     // 存储当前正在处理的 describe 函数
//     let currentDescribeFn;
//     // 外部的 describe 函数，每执行一次，就会将 describe 的信息推入到 describeFns
//     const describe = (name, fn) => describeFns.push([name, fn]);
//     // 外部的 it 函数，每执行一次，就会将 it 的信息推入到 currentDescribeFn 里面
//     const it = (name, fn) => currentDescribeFn.push([name, fn]);

//     eval(code);

//     // 当执行完 eval 之后，说说明外部的 describe 已经执行
//     // describe 已经执行，就说明 describe 所对应的信息已经推入到 describeFns 里面
//     for(const [name, fn] of describeFns){
//         currentDescribeFn = [];
//         testName = name;
//         fn();

//         currentDescribeFn.forEach(([name, fn])=>{
//             testName += " " + name;
//             fn();
//         })
//     }

//     testResult.success = true;
//   } catch (error) {
//     testResult.errorMessage = error.message;
//   }

//   return testResult;
// };

/**
 * 第五版本
 * @param {*} testFile 要读取的目录
 */
exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");

  // 返回的测试结果对象
  const testResult = {
    success: false,
    errorMessage: null,
  };

  try {
    resetState();
    eval(code);
    const { testResults } = await run();
    testResult.testResults = testResults;
    testResult.success = testResults.every((result) => !result.errors.length);
  } catch (error) {
    testResult.errorMessage = error.message;
  }

  return testResult;
};
