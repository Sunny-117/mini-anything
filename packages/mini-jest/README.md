# 测试基本认知

这节课我们会从以下几个点来介绍和测试相关的基本知识：

- 为什么需要测试 ？
- 有哪些测试 ？
- TDD 和 BDD 项目驱动模式

## 为什么需要测试

测试保证了软件的质量和可靠性，确保我们的软件是按照预期的功能进行的。

1. 发现和修复权限

通过测试，我们可以提前发现一些功能不完整、性能低下、有安全漏洞的地方，从而进行一个修复操作。如果一个产品没有经过测试就直接进行交付，那么前面所说到的这些缺陷最终就会在用户使用的时候被暴露出来的，最终就会导致用户的流失。

2. 验证软件是否符合需求和标准

在软件开发中，需求和标准的定义往往是通过需求文档、设计文档以及用户操作流程等方式来确定的，那么根据这些文档以及操作流程来编写测试用例，最终测试用例通过，可以间接的说明我们的软件是符合需求和标准的。

3. 降低了维护的成本

软件的维护成本是一个非常重要的考虑因素，如果软件存在缺陷和问题，那么软件上线后这些问题才被发现并去修复，整个维护成本会大大的增加的，一般来讲，越到后期，修复一个 Bug 所付出的成本越大，因此通过测试，能够提前帮助开发团队在软件上线之前就发现潜在的问题并进行修复，从而降低了软件的维护成本。

4. 增强了整个开发团队的信息

在软件开发领域，有一个词，叫做 Bug 破窗效应

<img src="https://resource.duyiedu.com/xiejie/2023-04-20-025318.jpg" alt="16819581115172" style="zoom:50%;" />

指的是软件中如果存在一个 Bug，那么这个 Bug 可能会引起一个连锁反应，从而导致一堆的 Bug。

一旦软件中出现 Bug 破窗，就会极大的影响团队的士气，并且整个团队需要为修复这些 Bug 付出极大的时间和精力

5. 测试实际上也是遵循软件开发中的最佳实践

无论是哪一种开发模式（瀑布模式、敏捷开发模式、DevOps），测试都是非常重要的一个环节，可以算是一种软件开发的最佳实践，是整个软件开发中不可缺少的一环，进行测试实际上就是在遵循软件开发的最佳实践。

## 哪些测试

整个测试从下往上可以分为 4 类：

- 静态测试
- 单元测试
- 集成测试
- E2E 测试

![16818677324451](https://resource.duyiedu.com/xiejie/2023-04-20-025934.jpg)

### 静态测试

静态测试不会涉及到具体的代码的运行，它是在编写代码期间对代码进行一个检查和分析，捕获写代码时可能出现的语法错误或者错别字。

对于前端开发人员来讲，静态测试更倾向于使用 typescript 或者 ESlint 之类的静态检查工具，在编写代码时候就能够提示错误

```js
// 使用 ESLint 的 for-direction 规则能让你更早的发现问题
for (var i = 0; i < 10; i--) {
  console.log(i);
}

const two = "2";
// 使用 typescript 的静态检查功能也是能够提前发现问题
const result = add(1, two);
```

### 单元测试

单元测试往往是验证某一个单独的部分是否能够正常的工作，它是我们软件测试中的最小测试单位，通常是一个函数或者一个方法。单元测试往往是由开发人员来编写一个一个的测试用例，通过一些自动化的工具来进行测试。

```js
// 这是一个函数，该函数是对传入的两个参数做相加操作
function calculateSum(a, b) {
  return a + b;
}

// 接下来我们要对上面的函数进行一个测试
describe("calculateSum", function () {
  // 这个就是一个测试用例
  it("should add two numbers correctly", function () {
    expect(calculateSum(1, 2)).toEqual(3); // 期望传入 1，2 的时候得到的值为 3
    expect(calculateSum(3, 4)).toEqual(7); // 期望传入 3，4 的时候得到的值为 7
  });
});
```

单元测试由于是对一个函数或者方法进行测试，是独立的一个单元，因此在进行单元测试的时候，往往会屏蔽发送请求，连接数据库等功能，这些功能一般都通过 mock （模拟）的形式来实现。

### 集成测试

所谓集成测试，就是将多个单元组装起来一起进行测试，主要是看这些单元在一起的时候是否能够正常工作，也就是说，集成测试的目的是确保整个系统中各个部分连接起来是能够正常工作的。

到了集成测试的时候，就会连接真实的数据，发送真实的网络请求，确保它们在协作的时候能够正常的工作。

下面是一个集成测试的例子：

```js
// Express 里面的一个集成测试的示例
const request = require("supertest");
const app = require("./app");

describe("User API", function () {
  let userId;
  // 测试用例
  // 测试添加新的用户，测试的是一个功能，涉及到发送真实的请求
  it("should add a new user", function (done) {
    request(app)
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" })
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        userId = res.body.id;
        done();
      });
  });
  // ...
});
```

### E2E 测试

End To End，翻译成中文就是端到端的测试。这种测试就会测试整个软件系统的功能以及完整性，这种测试会去模拟用户的行为和软件进行一个交互，相比集成测试，E2E 测试会测试更加完整的功能，更像是一个真实的用户在和软件进行交互。

下面使用一个 E2E 测试的示例：

```js
import { generate } from "todo-test-utils";

describe("todo app", () => {
  it("should work for a typical user", () => {
    const user = generate.user();
    const todo = generate.todo();
    cy.visitApp();
    cy.findByText(/register/i).click();
    cy.findByLabelText(/username/i).type(user.username);
    cy.findByLabelText(/password/i).type(user.password);
    cy.findByText(/login/i).click();
    cy.findByLabelText(/add todo/i)
      .type(todo.description)
      .type("{enter}");
    cy.findByTestId("todo-0").should("have.value", todo.description);
    cy.findByLabelText("complete").click();
    cy.findByTestId("todo-0").should("have.class", "complete");
  });
});
```

上面的代码描述了一个完整的流程，从打开应用程序到注册用户、创建待办事项、完成待办事项、直到最终验证应用程序的状态，这就是一个典型的 E2E 测试，它会验证整个应用程序的功能和用户体验。

## TDD 与 BDD 项目驱动模式

- TDD：英语全称为 Test-Driven Development，翻译成中文就是测试驱动开发
- BDD：英语全称为 Behavior-Driven Development，翻译成中文就是行为驱动开发

这个是软件开发中以测试为中心的两种开发方法论。

### TDD 模式

TDD 模式是一种以测试为中心的开发方法，强调在编写代码之前先编写测试用例，然后再运行测试用例，如果测试用例失败了，就说明代码有问题，那么就需要修改代码直到所有的测试用例都通过，然后再去编写实际的代码。

1. 编写测试用例

```js
const sum = require("../sum");

// 测试用例
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3); // 期望传递 1，2 的时候得到 3
});

// 测试用例
test("adds 0 + 0 to equal 0", () => {
  expect(sum(0, 0)).toBe(0); // 期望传递 0，0 的时候得到 0
});

// 测试用例
test("adds -1 + 1 to equal 0", () => {
  expect(sum(-1, 1)).toBe(0); // 期望传递 -1， 1 的时候得到 0
});
```

2. 运行测试用例，如果测试用例跑不通，说明代码设计有问题，注意这个时候实际代码是还没有书写的，因此这个时候我们往往会通过一些 mock（模拟） 手段去模拟函数或者模块的实现。
3. 编写实际的代码，通过编写实际代码来替换上一步中所用到的 mock 的部分

### BDD 模式

BDD 是通过行为来驱动软件的开发。这里的行为实际上指的是用户的行为，也就是说 BDD 的模式关注焦点并在在技术实现的细节上面，而是在用户行为和业务上面，更加注重协作和沟通，BDD 的测试用例一般会采用自然语言来进行编写，以便与业务人员和 QA 都能读得懂该测试用例。

BDD 的测试用例一般会采用 Given-When-Then 的模式来描述测试场景。

例如下面是一个基于 Given-When-Then 模式的测试用例，假设我们要测试一个登陆页面，这个登陆页面里面包含用户名和密码框以及登陆按钮，测试用例如下：

- _Given_：用户已经打开登录页面，并且没有输入任何内容
- _When_：用户输入错误的用户名或密码，然后点击登录按钮
- _Then_：页面上会显示错误提示信息“用户名或密码错误”

这是一种非常常见的模式，很多中小型企业，在没有使用自动化的测试框架的背景下，往往就是通过这种方式来对软件进行测试。

## 总结

- 为什么需要测试
  - 发现和修复缺陷
  - 验证软件是否符合需求和标准
  - 降低软件的维护成本
  - 增强开发团队的信息
  - 测试也是软件开发中的一种最佳实践
- 有哪些测试类型
  - 静态测试
  - 单元测试
  - 集成测试
  - E2E 测试
- TDD 和 BDD 项目驱动模式
  - TDD 是一种通过编写测试用例来驱动项目开发的模式
  - BDD 是一种通过描述软件行为来推动项目开发的模式

# 前端自动化测试

这一小节主要会介绍：

- 单元测试对于我们前端的重要性
- 软件开发模型与自动化测试
- 前端测试框架

## 单元测试

不同的测试这里会形成一个测试金字塔：

<img src="https://resource.duyiedu.com/xiejie/2023-04-20-055111.jpg" alt="16818870709008" style="zoom:50%;" />

一般来讲，软件开发中单元测试是做的最多的。

从测试金字塔的角度来看，越往上测试的成本是逐渐增加的，因为越到后期才抛出的 Bug，程序员要修复这个 Bug 所投入的精力和时间就会越多，另外越往上测试的运行速度越是逐渐增加。

单元测试相比其他两种测试，有如下的优点：

- 写起来是最容易的
- 运行速度是最快的
- 反馈效果是最好的

正因为如此，我们写得最多的就是单元测试，作为前端开发，平时面对得最多的就是组件，组件就可以看作是一个一个最最基础的单元，我们需要保证这些组件功能的完整性，对组件的测试也是属于单元测试。

## 软件开发模型和自动化测试

实际上，软件开发模型就是软件开发流程的演变，不同的开发流程最终形成不同的开发模型。

- 瀑布开发模型
- 敏捷开发模型
- DevOps 开发模型

### 瀑布开发模型

这个是最早期就存在的一种模型，整个瀑布模型由以下几个阶段组成：

<img src="https://resource.duyiedu.com/xiejie/2023-04-20-060935.jpg" alt="16818935117017" style="zoom:50%;" />

- 需求分析：在进行软件开发之前，首先第一步就是做需求分析，明确要开发的软件有哪些需求，最终形成需求文档
- 设计：需求分析完之后，接下来就是设计阶段，设计是多方面的
  - 界面设计：UI 设计师会根据需求文档来设计界面
  - 程序设计：模块如何划分，有哪些接口，基本业务的处理流程
- 编码与实现：根据设计好的方案，通过编码去实现
- 测试：根据所书写的代码，去做功能上的测试
- 发布与维护：发布上线，并且持续的维护产品

瀑布模型作为整个软件开发模型中最最早期的一个模型，是一个非常经典的模型，后面的模型都是基于瀑布模型的基础上做了一定的变化产生的。

### 敏捷开发模型

敏捷开发模型是一种从 90 年代开始逐渐引起广泛注意的新型软件开发模式，这种模式主要是用于应对需求频繁变化和需要快速开发的场景。

下面的示意图是瀑布模型和敏捷开发模型的区别：

<img src="https://resource.duyiedu.com/xiejie/2023-04-20-061621.jpg" alt="16818946977572" style="zoom:50%;" />

在敏捷开发模型中，软件开发会被分解为一系列短周期的迭代，每个迭代都包括需求分析、设计、编码实现、测试和部署，开发团队在迭代过程中会不断的和客户进行沟通和交流，随时根据客户的反馈进行方案的调整，保证软件开发方向上面的正确性。

### DevOps 开发模型

Dev 英语全称为 Development（开发），Ops 英语全称 Operations（运维），DevOps 基本上就涵盖一个软件开发中的各个阶段。

在 DevOps 开发模型，我们要做的就是通过自动化来实现软件的交付流程，让整体的构建、测试、发布都更加的快速，频繁。

<img src="https://resource.duyiedu.com/xiejie/2023-04-20-062352.jpg" alt="16819639547215" style="zoom:50%;" />

- 持续开发：软件不断开发的阶段，整个软件交付的结果会被拆分成多个短周期的任务，每个任务完成之后立马进行交付
- 持续测试：这里就会用到一些自动化测试工具，对上一个步骤中开发所涉及的代码进行测试，自动的跑一遍测试用例
- 持续集成：测试通过之后，将新的代码集成到现有的软件里面
- 持续部署：新的代码已经集成进去了，接下来就是将新集成的代码进行一个部署，部署到各个环境里面。
- 持续监控：部署上线之后，我们需要对部署的代码进行一个持续的监控操作，以避免部署的代码出现任何的问题

### 自动化测试

了解了上面所介绍的软件开发模型之后，那么自动化的概念也就非常好懂了。自动化测试属于 DevOps 开发模式里面的一个阶段，主要就是指对新的代码通过一些自动化工具和测试框架进行一个全自动的测试操作。测试通过之后，进入下一个步骤。

## 前端测试框架

前面我们介绍过测试有不同的类型，不同的测试框架会有不同的测试重点，比如有的偏向于单元测试，有的偏向于 E2E 测试。

- _Jest_：是一个由 _Facebook_ 开发的 _JavaScript_ 测试框架。它可以用于测试 _React_ 应用程序，也可以用于测试其他类型的 _JavaScript_ 应用程序。它具有简单易用、快速执行、自动化断言等特点。
- _Mocha_：是一个功能强大的 _JavaScript_ 测试框架，可用于测试任何类型的 _JavaScript_ 应用程序。它支持多种测试风格（如 _BDD_ 和 _TDD_），具有丰富的插件和扩展功能。
- _Jasmine_：是一个行为驱动的 _JavaScript_ 测试框架，提供了一个易于阅读和编写测试的语法。它可以运行在浏览器和 _Node.js_ 环境中，具有自动化断言、_Spy_ 等功能。
- _Cypress_：是一个现代化的自动化测试工具，专注于端到端的功能测试。它具有简单易用、快速执行、可靠性高、可视化测试等特点，支持 _Chrome、Firefox、Edge_ 等多个浏览器。
- _Puppeteer_：是一个由 _Google_ 开发的 _Node.js_ 库，_Puppeteer_ 基于 _Chrome DevTools_ 协议开发，可以完全控制 _Chromium_ 或 _Chrome_ 浏览器，包括页面的加载、截图、交互等操作。*Puppeteer*提供了一套稳定的 _API_，可以确保测试结果的可靠性和一致性。另外，_Puppeteer_ 不仅可以用于自动化测试，还可以用于爬虫、性能测试、页面截图等各种场景。

后面我们会选择 Jest 这个老牌的测试框架进行介绍。

Jest 是由 Facebook 开发的一个 js 测试框架，jest 主要侧重于被用于做单元测试和集成测试，特点如下：

_Jest_ 的特点包括：

- 简单易用：_Jest_ 的 _API_ 简单易用，测试用例编写起来非常简单。
- 快速执行：_Jest_ 使用并发执行，可以大大缩短测试时间。
- 自动化断言：_Jest_ 自带了一个断言库，可以自动化地对测试结果进行断言。
- _Mock_ 支持：_Jest_ 支持 _Mock_，可以方便地模拟各种场景，例如网络请求、计时器等。
- _Snapshot_ 测试：_Jest_ 支持 _Snapshot_ 测试，可以方便地对组件的渲染结果进行比较和验证。
- 集成测试支持：_Jest_ 支持集成测试，可以方便地测试整个应用程序的功能。

## 总结

1. 测试金字塔，越往上的测试成本越高，并且运行速度越慢
2. 我们写得最多的是单元测试，运行速度快，成本低
3. 软件开发模型
   - 瀑布模型
   - 敏捷开发模型
   - DevOps 开发模型
4. 自动化测试实际上是 DevOps 里面一个非常重要环节
5. 前端测试框架多种多样，每一种测试框架的侧重点可能不一样，我们后期选择 Jest 进行学习

# Jest 基础使用

这节课会包含两个部分：

- Jest 快速入门
- 测试用例的分组

## Jest 快速入门

首先通过 npm init -y 初始化项目，书写需要测试的工具方法：

```js
/**
 * 工具库
 */

exports.sum = function (a, b) {
  return a + b + 1;
};

exports.sub = function (a, b) {
  return a - b;
};

exports.mul = function (a, b) {
  return a * b;
};

exports.div = function (a, b) {
  return a / b;
};
```

接下来需要安装 jest，通过命令

```js
npm install --save-dev jest
```

在项目下面创建测试文件，tools.test.js，安装了 jest 之后，会提供一些全局的方法或者对象，例如 test、expect、jest，这些方法或者对象不需要导入，直接在测试文件中使用即可

```js
const { sum } = require("./tools");

/**
 * 一个 test 方法意味着书写了一个测试用例
 * param1 ：针对这个测试用例的一个描述
 * param2 ：执行该用例所对应的回调函数
 */
test("测试加法", () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});
```

我们可以以相同的方式测试其他的工具函数：

```js
const { sum, sub, mul, div } = require("./tools");

/**
 * 一个 test 方法意味着书写了一个测试用例
 * param1 ：针对这个测试用例的一个描述
 * param2 ：执行该用例所对应的回调函数
 */
test("测试加法", () => {
  expect(sum(1, 2)).toBe(3);
  expect(sub(10, 5)).toBe(5);
  expect(mul(2, 3)).toBe(6);
  expect(div(10, 2)).toBe(5);
});
```

我们也可以书写多个测试用例：

```js
/**
 * 改文件就是一个测试文件
 * 在该文件中，我们会书写一个一个的测试用例
 * 安装了 jest 之后，默认会提供一些全局的方法和对象
 * test、expect、jest
 */

const { sum, sub, mul, div } = require("./tools");

/**
 * 一个 test 方法意味着书写了一个测试用例
 * param1 ：针对这个测试用例的一个描述
 * param2 ：执行该用例所对应的回调函数
 */
test("测试加法", () => {
  expect(sum(1, 2)).toBe(3);
});

test("测试减法", () => {
  expect(sub(10, 5)).toBe(5);
});

/**
 * it 方法实际上是 test 方法的一个别名
 */
it("测试乘法", () => {
  expect(mul(2, 3)).toBe(6);
});

it("测试除法", () => {
  expect(div(10, 2)).toBe(5);
});
```

在上面的测试中，我们使用到了 it 方法，该方法实际上是 test 方法的一个别名方法。源码如下：

```js
const test: Global.It = (() => {
  // 实际上我们外部调用的是这个 test 方法
  // 内部调用了一个名为 _addTest 的方法
  const test = (
    testName: Circus.TestNameLike,
    fn: Circus.TestFn,
    timeout?: number
  ): void => _addTest(testName, undefined, false, fn, test, timeout);

  return test;
})();

const it: Global.It = test;
```

上面的演示中，我们将所有的方法的测试可以写在一个测试用例中，也可以书写多个测试用例，那么真实的工具库应该如何书写呢？

实际上，最好的方式是一个工具函数对应一个测试套件，每一个测试套件里面根据函数的参数来书写测试用例，一个参数对应一个测试用例，后面我们在进行实战项目的时候，会采用这样的方式。

## 测试用例的分组

在一个测试套件中，我们实际上可以针对不同的测试用例来进行分组。

分组使用到了 describe 方法，这个方法也是一个全局方法，不需要导入，直接就可以使用。

```js
describe(这个分组的描述，回调函数)
```

示例如下：

```js
describe("这是一组测试，测试加减法", () => {
  // 回调函数中就放一个一个的测试用例

  /**
   * 一个 test 方法意味着书写了一个测试用例
   * param1 ：针对这个测试用例的一个描述
   * param2 ：执行该用例所对应的回调函数
   */
  test("测试加法", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("测试减法", () => {
    expect(sub(10, 5)).toBe(5);
  });
});

describe("这是一组测试，测试乘除法", () => {
  /**
   * it 方法实际上是 test 方法的一个别名
   */
  it("测试乘法", () => {
    expect(mul(2, 3)).toBe(6);
  });

  it("测试除法", () => {
    expect(div(10, 2)).toBe(5);
  });
});
```

在源码中，我们外部调用的 describe 实际上是如下的方法：

```js
const describe = (blockName: Circus.BlockNameLike, blockFn: Circus.BlockFn) =>
  _dispatchDescribe(blockFn, blockName, describe);
```

## 总结

1. Jest 中提供了一些全局方法或者对象，这些方法或者对象是无需引用的，可以在**测试文件**直接使用。
2. 通过 test 或者 it 方法来创建一个测试用例，it 方法实际上是 test 方法的别名方法。
3. 通过 describe 方法可以对多个测试用例进行分组。

# 匹配器

在 Jest 中，提供了丰富的匹配器（Matchers）

回顾上一节课写过的测试用例：

```js
const { sum } = require("./tools");

test("测试加法", () => {
  expect(sum(1, 2)).toBe(3);
});
```

首先我们调用的是 expect 方法，这个方法被称之为断言方法，调用该方法之后会得到一个名为 expectation 的对象，在这个对象上面就可以使用“修饰符”以及“匹配器”。

目前 Jest 里面支持的修饰符有 3 个：

- .not
- .resolves
- .rejects

我们来看一下 not 修饰符：

```js
test("测试加法", () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).not.toBe(4);
});
```

后面两个 resolves 和 rejects 这个一看就是和 Promise 相关的，这个我们在后面介绍测试异步函数的时候再来看。

这节课重点来看一下匹配器，Jest 里面内置了非常多的匹配器：

- 常用匹配器
- 布尔值相关匹配器
- 数值相关匹配器
- 字符串相关匹配器
- 数组相关匹配器
- 异常相关匹配器
- 非对称匹配器

## 常用匹配器

常用的匹配器这里介绍两个，一个是 toBe，还有一个是 toEqual，toEqual 可以针对对象进行一个深度比较

```js
test("深度比较对象", () => {
  const stu = { name: "张三", score: { html: 100, css: 90 } };
  expect(stu).not.toBe({ name: "张三", score: { html: 100, css: 90 } });
  // 使用 toEqual 来进行深度比较
  // toEqual 会递归比较对象的所有属性
  expect(stu).toEqual({ name: "张三", score: { html: 100, css: 90 } });
});
```

## 布尔值相关匹配器

一般来讲运行结果得到的是一个布尔值，使用布尔值相关匹配器的时候一般是无需传参的。

```js
test("布尔值相关匹配器", () => {
  const n = null;
  expect(n).toBeFalsy();
  expect(n).not.toBeTruthy();

  const a = 0;
  expect(a).toBeFalsy();
  expect(a).not.toBeTruthy();
});
```

像布尔值相关的这种无参的匹配器，在 Jest 中还有好几个，我们快速过一遍，如下：

```js
test("无参匹配器", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  const a = 0;
  expect(a).not.toBeNull();
  expect(a).toBeDefined();
  expect(a).not.toBeUndefined();
});
```

## 数值相关匹配器

常见的就是两个数值之间大小的比较，有大于、大于等于、小于、小于等于、等于之类的：

```js
test("数值相关匹配器", () => {
  const value1 = 4;
  // 大于
  expect(value1).toBeGreaterThan(3);
  // 大于等于
  expect(value1).toBeGreaterThanOrEqual(4);
  // 小于
  expect(value1).toBeLessThan(5);
  // 小于等于
  expect(value1).toBeLessThanOrEqual(4);

  // 这里需要注意一下浮点数
  const value2 = 0.1 + 0.2;
  expect(value2).toBeCloseTo(0.3);
  // toBeCloseTo 还接受第二个参数，第二个参数用于指定位数，默认是两位
  expect(0.302).toBeCloseTo(0.301);
  expect(0.302).not.toBeCloseTo(0.301, 5);
});
```

上面的匹配器中，主要需要注意浮点数往往需要使用 toBeCloseTo 这个匹配器来进行比较，这个匹配器还可以设置位数。

## 字符串相关的匹配器

toMatch 可以检查字符串是否和某一个正则表达式能够匹配上

```js
test("字符串相关匹配器", () => {
  expect("this is a test").toMatch(/test/);
  expect("this is a test").not.toMatch(/abc/);
});
```

## 数组相关匹配器

一个常见的需求就是需要判断一个数组是否包含某一项，这个时候可以使用 toContain，例如：

```js
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];
test("数组相关匹配器", () => {
  expect(shoppingList).toContain("milk");
  // toContain 进行的是全等比较，也就是严格比较
  expect([1, 2, 3]).not.toContain("1");
  expect([{ name: "张三" }, { name: "李四" }]).not.toContain({ name: "张三" });
  // toContain 还可以用来检测一个字符串是否是另一个字符串的子串
  expect("this is a test").toContain("test");
  // 也可以用到集合（set）里面
  expect(new Set(shoppingList)).toContain("milk");
});
```

## 异常匹配器

有些时候我们需要测试某个函数调用之后是否会抛出异常，那么此时我们可以使用 toThrow 这个匹配器：

```js
function compileCode() {
  throw new Error("aaa you are using the wrong JDK bbb");
}

test("异常相关的匹配器", () => {
  expect(() => compileCode()).toThrow();
  // toThrow 里面可以传递不同的参数
  expect(() => compileCode()).toThrow(Error);
  expect(() => compileCode()).toThrow("you are using the wrong JDK");
  expect(() => compileCode()).toThrow(/JDK/);
});
```

## 非对称匹配器

回顾上面讲的匹配器，基本上都是对称匹配器，比如：

```js
const stu = { name: "张三", score: { html: 100, css: 90 } };
expect(stu).not.toBe({ name: "张三", score: { html: 100, css: 90 } });
```

上面的 toBe 匹配器就是一个对称的匹配器，在 Jest 中还存在一些非对称的匹配器。

```js
const arr = ["张三"];
test("上面的数组不包含某一项", () => {
  expect(["李四", "王武", "赵六"]).toEqual(expect.not.arrayContaining(arr));
});
```

例如我们再看一个示例：

```js
const obj = { name: "张三" };
test("对象不包含上面的键值对", () => {
  expect({ age: 18 }).toEqual(expect.not.objectContaining(obj));
  expect({ name: "李四", age: 18 }).toEqual(expect.not.objectContaining(obj));
});
```

这种非对称匹配器，toEqual 匹配器里面是一段类似于描述的信息。

## 部分源码

在源码中，所有的匹配器都放在了一个名为 matchers 的对象里面

```js
const matchers = {
  toBe() {
    /* ... */
  },
  toBeCloseTo() {
    /* .. */
  },
  // ...
};
```

在 expect 方法里面，实际上调用该方法后会返回一个匹配器对象 expectation，格式如下：

```js
const expectation = {
  not: {},
  rejects: { not: {} },
  resolves: { not: {} },
};
```

之后会为 expectation 这个对象添加上所有的匹配器方法，代码如下：

```js
const expect = () => {
  // 获取到所有的 matchers
  // 该对象是要向外部返回的
  const expectation = {
    not: {},
    rejects: { not: {} },
    resolves: { not: {} },
  };
  // 将 matchers 对象上面的所有的匹配器添加到 expectation 对象上面
  Object.keys(matchers).forEach((name) => {
    expectation[name] = matchers[name];
    // ...
  });
  return expectation;
};
```

## 总结

这节课主要是介绍 Jest 里面修饰符以及匹配器，修饰符就只有三个：

- not
- rejects
- resolves

还有各种匹配器，大致可以分为如下几类：

- 常用匹配器
- 布尔值相关匹配器
- 数值相关匹配器
- 字符串相关匹配器
- 数组相关匹配器
- 异常相关匹配器
- 非对称匹配器

# 生命周期方法

在 Jest 中，生命周期方法大致分为两类：

- 重复性的生命周期方法
  - beforeEach
  - afterEach
- 一次性的生命周期方法
  - beforeAll
  - afterAll

上面所罗列的生命周期方法，也是全局方法，不需要引入，直接就可以使用。

## 重复性的生命周期方法

所谓重复性的生命周期方法，就是指这些方法会被添加到每一个测试用例的前后。

```js
const { sum, sub, mul, div } = require("./tools");

// beforeEach 会在执行每一个测试用例之前被触发
beforeEach(() => {
  console.log("全局的beforeEach");
});

afterEach(() => {
  console.log("全局的afterEach");
});

test("测试加法函数", () => {
  const result = sum(1, 3);
  expect(result).toBe(4);
  console.log("\x1b[31m%s\x1b[0m", "测试加法函数");
});

test("测试减法函数", () => {
  const result = sub(15, 10);
  expect(result).toBe(5);
  console.log("\x1b[31m%s\x1b[0m", "测试减法函数");
});

test("测试乘法函数", () => {
  const result = mul(2, 3);
  expect(result).toBe(6);
  console.log("\x1b[31m%s\x1b[0m", "测试乘法函数");
});

test("测试除法函数", () => {
  const result = div(50, 2);
  expect(result).toBe(25);
  console.log("\x1b[31m%s\x1b[0m", "测试除法函数");
});
```

上面的代码为每一个测试用例添加了生命周期方法，beforeEach 和 afterEach 会在每一个测试用例的前后执行。如下图所示：

![16816946204785](https://resource.duyiedu.com/xiejie/2023-04-18-010931.jpg)

## 一次性的生命周期方法

对应的方法是：

- beforeAll
- afterAll

顾名思义就是在整个测试开始之前，以及测试用例全部执行完之后执行该生命周期方法。

```js
// ...
// beforeAll 是在整个测试套件的第一个测试用例执行之前执行
beforeAll(() => {
  console.log("全局的beforeAll");
});

// afterAll 会在所有测试用例执行完成之后，然后再执行 afterAll
afterAll(() => {
  console.log("全局的afterAll");
});
// ...
```

执行顺序如下图所示：

![16816949683970](https://resource.duyiedu.com/xiejie/2023-04-18-011423.jpg)

## 在分组中添加生命周期函数

如果测试用例比较多，我们可以使用 describe 来进行分组，在一个分组里面也可以书写生命周期方法，但是在分组中的生命周期方法会变为一个局部的生命周期方法，仅对该组测试用例有效，而且这里还涉及到了一个顺序的问题。

```js
// ...
// 第二组
describe("第二组", () => {
  beforeEach(() => {
    console.log("\x1b[34m%s\x1b[0m", "分组beforeEach");
  });
  afterEach(() => {
    console.log("\x1b[34m%s\x1b[0m", "分组afterEach");
  });

  test("测试乘法函数", () => {
    const result = mul(2, 3);
    expect(result).toBe(6);
    console.log("\x1b[31m%s\x1b[0m", "测试乘法函数");
  });

  test("测试除法函数", () => {
    const result = div(50, 2);
    expect(result).toBe(25);
    console.log("\x1b[31m%s\x1b[0m", "测试除法函数");
  });
});
// ...
```

如果既有全局的 beforeEach 又有分组内部的 beforeEach，那么是先执行全局的 beforeEach，然后再执行分组内部的 beforeEach，如果是全局 afterEach 以及 分组的 afterEach，那么顺序刚好和 beforeEach 相反。

![16816973539011](https://resource.duyiedu.com/xiejie/2023-04-18-012130.jpg)

同样我们也可以添加分组内部的 beforeAll 和 afterAll，代码如下：

```js
// 第二组
describe("第二组", () => {
  beforeEach(() => {
    console.log("\x1b[34m%s\x1b[0m", "分组beforeEach");
  });
  afterEach(() => {
    console.log("\x1b[34m%s\x1b[0m", "分组afterEach");
  });

  beforeAll(() => {
    console.log("\x1b[32m%s\x1b[0m", "分组beforeAll");
  });
  afterAll(() => {
    console.log("\x1b[32m%s\x1b[0m", "分组afterAll");
  });

  test("测试乘法函数", () => {
    const result = mul(2, 3);
    expect(result).toBe(6);
    console.log("\x1b[31m%s\x1b[0m", "测试乘法函数");
  });

  test("测试除法函数", () => {
    const result = div(50, 2);
    expect(result).toBe(25);
    console.log("\x1b[31m%s\x1b[0m", "测试除法函数");
  });
});
```

beforeAll 是在要执行该分组的测试用例之前会执行，afterAll 是在该分组所有测试用例执行完毕后执行。

如下图所示：

![16816977012909](https://resource.duyiedu.com/xiejie/2023-04-18-012505.jpg)

在使用 describe 分组 的时候，Jest 会在执行测试文件里面的测试用例之前，把所有的 describe 执行一遍，假设有如下的代码：

```js
// 第一组
describe("第一组", () => {
  console.log("开始进行第一组测试");

  test("测试加法函数", () => {
    const result = sum(1, 3);
    expect(result).toBe(4);
    console.log("\x1b[31m%s\x1b[0m", "测试加法函数");
  });

  test("测试减法函数", () => {
    const result = sub(15, 10);
    expect(result).toBe(5);
    console.log("\x1b[31m%s\x1b[0m", "测试减法函数");
  });
});

// 第二组
describe("第二组", () => {
  console.log("开始进行第二组测试");

  test("测试乘法函数", () => {
    const result = mul(2, 3);
    expect(result).toBe(6);
    console.log("\x1b[31m%s\x1b[0m", "测试乘法函数");
  });

  test("测试除法函数", () => {
    const result = div(50, 2);
    expect(result).toBe(25);
    console.log("\x1b[31m%s\x1b[0m", "测试除法函数");
  });
});
```

那么会先打印 describe 里面的两句话，分别输出“开始进行第一组测试”、“开始进行第二组测试”，然后才是执行每一个分组内部的测试用例。因此我们如果想要在每一个分组执行之前添加一些代码，就应该使用生命周期函数，比如这里的情况就应该使用 beforeAll。

## 补充：test.only

test.only 是用来测试特定的测试用例，也就是说，如果一个测试套件里面假设有 10 个测试用例，第 7 个测试用例书写了 test.only，那么在运行整个测试套件的时候，就只会执行第 7 个测试用例。

test.only 一般用于在一个测试套件中，我们要确保某一个测试用例是否 OK 的时候，就可以使用 test.only。

```js
test.only("测试乘法函数", () => {
  const result = mul(2, 3);
  expect(result).toBe(6);
  console.log("\x1b[31m%s\x1b[0m", "测试乘法函数");
});
```

注意在使用 test.only 的时候，对应的生命周期方法也会被执行。

从源码的角度来看，这些生命周期方法的背后，实际上都是调用的同一个名为 \_addHook 的方法。

```js
const beforeEach: THook = (fn, timeout) =>
  _addHook(fn, "beforeEach", beforeEach, timeout);
const beforeAll: THook = (fn, timeout) =>
  _addHook(fn, "beforeAll", beforeAll, timeout);
const afterEach: THook = (fn, timeout) =>
  _addHook(fn, "afterEach", afterEach, timeout);
const afterAll: THook = (fn, timeout) =>
  _addHook(fn, "afterAll", afterAll, timeout);
```

```js
const _addHook = (
  fn: Circus.HookFn,
  hookType: Circus.HookType,
  hookFn: THook,
  timeout?: number
) => {
  const asyncError = new ErrorWithStack(undefined, hookFn);

  if (typeof fn !== "function") {
    asyncError.message =
      "Invalid first argument. It must be a callback function.";

    throw asyncError;
  }

  dispatchSync({ asyncError, fn, hookType, name: "add_hook", timeout });
};
```

\_addHook 主要是做了一个错误相关的处理，之后调用了 dispatchSync

## 总结

- Jest 中的生命周期方法分为重复性的和一次性的
- 重复性的生命周期方法是指每个测试用例前后都会执行
  - _beforeEach_
  - _afterEach_
- 一次性的生命周期方法是指只会执行一次方法
  - _beforeAll_
  - _afterAll_
- 一个分组中也能书写局部生命周期方法，但需注意和全局方法之间的顺序关系
- 使用 _test.only_ 可以很方便地运行单个测试用例，以便在调试失败的测试用例时进行测试

# 模拟函数

在 Jest 中提供了一个全局对象名为 jest，这个对象上面有非常多的方法，有关该对象的方法，可以参阅文档：

https://jestjs.io/docs/jest-object

jest 对象上面的方法大致分为四类：

- 模拟模块
- 模拟函数
- 模拟计时器
- 其他方法

通过 jest.fn 方法可以创建一个模拟函数（mock fucntion）

```js
jest.fn(implementation?)
```

implementation 是一个可选参数，代表着模拟函数的实现，如果没有传入，那么创建的是一个空的模拟函数。

来看一个快速入门示例：

```js
test("基本演示", () => {
  // 创建一个模拟函数
  const mock = jest.fn();
  // 设置这个模拟函数的返回值为 42
  mock.mockReturnValue(42);
  expect(mock()).toBe(42);
});
```

在上面的代码中，我们使用 jest.fn 方法创建了一个空的模拟函数，然后通过调用 mockReturnValue 方法来指定该模拟函数的返回值为 42.之后通过 expect 调用对该模拟函数进行一个测试。

在使用 jest.fn 创建模拟函数的时候，也可以传入一个函数来代表模拟函数的实现，一般通过传入的函数能够明确所生成的模拟函数接收几个参数，返回值是多少。

```js
test("内置实现", () => {
  const mock = jest.fn((x) => 100 + x);
  expect(mock(1)).toBe(101);
});
```

调用 jest.fn 方法后返回的是一个模拟函数，之所以可以在函数的基础上调用方法，是因为在 js 中函数也是一种对象，这里的模拟函数类似于如下的表达：

```js
function a() {}
a.b = function () {};
a.c = function () {};
a.d = function () {};
```

可以在官方文档 https://jestjs.io/docs/mock-function-api 看到模拟函数所对应的方法，举例如下：

```js
test("基本演示", () => {
  // 创建一个模拟函数
  const mock = jest.fn();

  mock
    .mockReturnValue(30) // 设置返回值为 30
    .mockReturnValueOnce(10) // 第一次调用模拟函数对应的返回值
    .mockReturnValueOnce(20); // 第二次调用模拟函数对应的返回值

  expect(mock()).toBe(10);
  expect(mock()).toBe(20);
  expect(mock()).toBe(30);

  // 设置这个模拟函数的返回值为 42
  mock.mockReturnValue(42);
  expect(mock()).toBe(42);
});
```

通过模拟函数身上的这些方法，可以控制模拟函数的行为，例如上面我们通过 mockReturnValueOnce 控制函数不同次数的调用对应的返回值。

接下来我们来看两个模拟函数具体的应用场景。

首先第一个，假设我们书写了一个 forEach 函数，这个 forEach 就类似于数组里面的 forEach 方法，该函数会遍历数组里面的每一项，然后针对每一项执行对应的回调函数：

```js
const arr = [1, 2, 3, 4, 5];
arr.forEach((item) => {
  // item....
});

function forEach(arr, callback) {
  for (let index = 0; i < arr.length; index++) {
    callback(arr[index]);
  }
}
forEach(arr, (item) => {});
```

接下来我们想要测试这个 forEach 函数的实现是否有问题，那么这里涉及到了这个 forEach 依赖了 callback 这个函数，因此我们就可以通过模拟函数的方式来对其进行屏蔽

```js
const arr = [1, 2, 3];

function forEach(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    callback(arr[index]);
  }
}

test("测试forEach是否正确", () => {
  // 由于 forEach 中依赖了 callback，因此我们可以创建一个模拟函数来模拟这个 callback
  const mockCallback = jest.fn((x) => 100 + x);

  forEach(arr, mockCallback);

  // 接下来就进入到测试环节，我们可以利用模拟函数上面的诸多方法来进行一个验证
  //   [
  //     [ 1 ],
  //     [ 2 ],
  //     [ 3 ]
  //   ];
  expect(mockCallback.mock.calls).toHaveLength(3);
  expect(mockCallback.mock.calls.length).toBe(3);

  // 测试每一次调用 callback 的时候传入的参数是否符合预期
  expect(mockCallback.mock.calls[0][0]).toBe(1);
  expect(mockCallback.mock.calls[1][0]).toBe(2);
  expect(mockCallback.mock.calls[2][0]).toBe(3);

  // 针对每一次 callback 被调用后的返回值进行测试
  expect(mockCallback.mock.results[0].value).toBe(101);
  expect(mockCallback.mock.results[1].value).toBe(102);
  expect(mockCallback.mock.results[2].value).toBe(103);

  // 模拟函数是否被调用过
  expect(mockCallback).toHaveBeenCalled();
  // 前面在调用的时候是否有参数为 1 以及参数为 2 的调用
  expect(mockCallback).toHaveBeenCalledWith(1);
  expect(mockCallback).toHaveBeenCalledWith(2);
  // 还可以对模拟函数的参数进行一个边界判断，判断最后一次调用是否传入的参数为 3
  expect(mockCallback).toHaveBeenLastCalledWith(3);
});
```

接下来我们来看第二例子，我们来模拟一个异步请求的场景。假设有如下的异步请求函数：

```js
async function fetchData() {
  const res = await fetch("https://www.example.com/data");
  const data = await res.json();
  return data;
}
```

在测试这个异步函数的时候，会发送真实的请求进行测试，但是有一些时候，我们知道这个没问题，或者说想要在那时屏蔽这一个异步，假设一个异步是能够正常返回数据的，这种情况下我们就可以针对这个异步请求函数来书写一个模拟函数来代替真实的 fetchData 函数。

```js
// 创建了一个空的模拟函数
const fetchDataMock = jest.fn();
const fakeData = { id: 1, name: "xiejie" };
// 设置该模拟函数的实现
fetchDataMock.mockImplementation(() => Promise.resolve(fakeData));

// 通过模拟函数的一些方法来设置该模拟函数的行为

test("模拟网络请求正常", async () => {
  const data = await fetchDataMock();
  expect(data).toEqual({ id: 1, name: "xiejie" });
});

test("模拟网络请求出错", async () => {
  // 模拟网络请求第一次请求失败，之后请求没问题
  fetchDataMock.mockImplementationOnce(() =>
    Promise.reject(new Error("network error"))
  );

  await expect(fetchDataMock()).rejects.toThrow("network error");
  await expect(fetchDataMock()).resolves.toEqual({ id: 1, name: "xiejie" });
});
```

## 总结

当在 _Jest_ 测试框架中编写测试用例时，我们通常需要模拟一些函数或者对象以便在测试中控制其行为。

_Jest_ 提供了 _jest.fn( )_ 方法来创建模拟函数，它有以下几个特点：

1. 模拟函数可以接受任何参数，并且返回任何值。
2. 可以使用 _mockImplementation( )_ 方法或者 _mockImplementationOnce( )_ 方法来设置模拟函数的实现。
3. 可以使用 _expect( ).toHaveBeenCalled( )_ 或者 _expect( ).toHaveBeenCalledWith( )_ 等函数来断言模拟函数是否被调用，并且被调用的方式是否符合预期。
4. 可以使用 _mockFn.mockReturnValue( )_ 或者 _mockFn.mockResolvedValue( )_ 等方法来设置模拟函数的返回值或者 _Promise_ 对象的解析值。

总的来说，_jest.fn( )_ 是 _Jest_ 中非常重要的一个功能，它可以帮助我们在测试中模拟函数或对象的行为，并且方便地进行断言。在编写测试时，我们可以根据需要使用它来代替真实的依赖或者桩数据，从而使测试更加可控、可靠、可维护。

# 模拟模块

模块可以分为两种模块：

- 第三方模块
- 文件模块

## 模拟第三方模块

在 jest 对象上面有一个名为 mock 的方法。

下面是一个快速入门示例：

```js
/**
 * 和请求相关的
 */

const axios = require("axios");

class User {
  /**
   * 获取所有的用户
   */
  static all() {
    return axios.get("/users.json").then((resp) => resp.data);
  }
}

module.exports = User;
```

假设现在项目中有如上的一个方法，现在我们需要对这个模块的方法进行一个测试，但是会涉及到一个问题，要测试这个模块就必然会涉及到使用 axios 发送真实的 http 请求，这个时候我们想要屏蔽这个真实的请求。

其中一种方案就是像上一小节一样，实现一个 all 方法的模拟方法，屏蔽内部的实现，但是这种方法会有一个问题，我们无法测试 all 方法内部的实现是否正确，如果是这种情况，我们就可以采取模拟 axios 模块的方式来屏蔽 axios 发送请求这个部分。

这个时候我们可以使用 jest.mock 来模拟 axios 这个模块，如下：

```js
const axios = require("axios");
const User = require("../api/userApi");
const userData = require("./user.json");

// 模拟 axios 模块
jest.mock("axios");

// 测试用例
test("测试获取用户数据", async () => {
  // 模拟响应数据
  const resp = {
    data: userData,
  };
  // 现在我们已经模拟了 axios
  // 但是目前的 axios 没有书写任何的行为
  // 因此我们需要在这里进行一个 axios 模块行为的指定
  // 指定了在使用 axios.get 的时候返回 resp 响应
  axios.get.mockImplementation(() => Promise.resolve(resp));

  await expect(User.all()).resolves.toEqual(userData);
});
```

在上面的测试套件中，我们首先使用 jest.mock 方法模拟了 axios 这个模块。

之后书写了一个测试用例，在测试用例里面，我们指定了 axios.get 方法的行为，之后对 User.all 方法进行测试。在 User.all 方法里面使用到 axios.get 方法，这个时候就会使用模拟的 axios 模块。

在上面的示例中，我们也可以传入第二个参数，第二个参数可以指定模块的一些实现，如下：

```js
// const axios = require("axios");
const User = require("../api/userApi");
const userData = require("./user.json");

// 模拟 axios 模块
jest.mock("axios", () => {
  const userData = require("./user.json");
  // 模拟响应数据
  const resp = {
    data: userData,
  };
  return {
    get: jest.fn(() => Promise.resolve(resp)),
  };
});

// 测试用例
test("测试获取用户数据", async () => {
  // 现在我们已经模拟了 axios
  // 但是目前的 axios 没有书写任何的行为
  // 因此我们需要在这里进行一个 axios 模块行为的指定
  // 指定了在使用 axios.get 的时候返回 resp 响应
  // axios.get.mockImplementation(()=>Promise.resolve(resp));

  await expect(User.all()).resolves.toEqual(userData);
});
```

在上面的方法中，我们使用 jest.mock 模拟 axios 模块时，传入了第二个参数，第二个参数是一个工厂函数，指定了模块的一些行为，之后，我们就不用在单独使用诸如 mockImplementation 之类的方法来指定模块的实现了。

除了替换模块本身，还可以为这个模块添加一些额外的方法：

```js
// 模拟 axios 模块
jest.mock("axios", () => {
  const userData = require("./user.json");
  // 模拟响应数据
  const resp = {
    data: userData,
  };
  return {
    get: jest.fn(() => Promise.resolve(resp)),
    // 这个方法本身 axios 是没有的
    // 我们通过模拟 axios 这个模块，然后给 axios 这个模块添加了这么一个 test方法
    // 这里在实际开发中没有太大意义，仅做演示
    test: jest.fn(() => Promise.resolve("this is a test")),
  };
});
```

## 模拟文件模块

通过 jest.mock，我们还可以模拟整个文件模块：

```js
const { sum, sub, mul, div } = require("../utils/tools");

jest.mock("../utils/tools", () => {
  // 在这里来改写文件模块的实现

  // 拿到 ../utils/tools 路径所对应的文件原始模块
  const originalModule = jest.requireActual("../utils/tools");

  // 这里相当于是替换了原始的模块
  // 一部分方法使用原始模块中的方法
  // 一部分方法（sum、sub）被替换掉了
  return {
    ...originalModule,
    sum: jest.fn(() => 100),
    sub: jest.fn(() => 50),
  };
});

test("对模块进行测试", () => {
  expect(sum(1, 2)).toBe(100);
  expect(sub(10, 3)).toBe(50);
  expect(mul(10, 3)).toBe(30);
  expect(div(10, 2)).toBe(5);
});
```

在上面的例子中，我们引入了路径为 ../utils/tools 的文件模块，并且我们对这个文件模块进行了一个模拟，替换掉了这个文件模块里面的部分方法。

在今天的例子中，我们第一次创建了两个测试套件，可以看到在运行的时候，没有再像之前一样显示出测试用例的描述。如果想要显示，可以添加如下的配置：

```js
"test": "jest --verbose=true"
```

这个配置实际上就是 jest cli 的配置选项，关于配置我们后面专门拿一节课来进行介绍。

## 总结

本节课我们介绍了非常有用的 _jest.mock( )_ 方法，通过该方法可以模拟导入的模块，从而方便地测试被测试模块的行为，而不需要真正地执行模块的代码。

除了上面介绍的示例以外，下面罗列了一些在实际开发中可能会使用到 _jest.mock( )_ 方法的例子：

1. 模拟外部依赖
   当您的被测试模块依赖于外部模块时，您可以使用 _jest.mock( )_ 方法来模拟这些模块的行为，以便更好地控制测试环境。例如，当您的代码依赖于一个需要连接到数据库的模块时，您可以使用 _jest.mock( )_ 方法来模拟这个模块的行为，以便在测试时避免连接到真实的数据库。
2. 模拟函数的行为
   当您的被测试模块调用其他函数时，您可以使用 _jest.mock( )_ 方法来模拟这些函数的行为，以便更好地控制测试环境。例如，当您的代码调用一个外部第三方库中的函数时，您可以使用 _jest.mock( )_ 方法来模拟这个函数的行为，以便在测试时避免调用真实的库函数，同时确保您的代码正确处理了这个函数的返回值和参数。
3. 模拟组件
   当您的被测试模块是一个 _React_ 组件时，您可以使用 _jest.mock( )_ 方法来模拟这个组件的行为，以便更好地控制测试环境。例如，当您测试一个依赖于其他组件的组件时，您可以使用 _jest.mock( )_ 方法来模拟这些组件的行为，以便在测试时避免真正地渲染这些组件。

总之，使用 _Jest_ 的 _jest.mock( )_ 方法，可以帮助您轻松地模拟各种依赖项和操作的行为，从而使测试更加简单和可靠。

# Jest 配置文件

在官网对应的 ：https://jestjs.io/docs/configuration 可以看到 Jest 中所有的配置项目。

当我们要对 Jest 进行大量的配置的时候，肯定是需要配置文件的，那么首先我们需要生成一个配置文件：

```js
npx jest --init
```

生成配置文件如下图所示：

![image-20230424092507341](https://resource.duyiedu.com/xiejie/2023-04-24-012507.png)

下面介绍一些配置文件中常见的配置项。

collectCoverage：会收集并显示测试覆盖率，包含每个文件中每种类型的代码（语句、分支、函数和行）的测试覆盖率

<img src="https://resource.duyiedu.com/xiejie/2023-04-24-012840.png" alt="image-20230424092839487" style="zoom:50%;" />

在上面的表格中，我们能够看到如下的信息：

- % Stmts：包含语句的百分比，即被测试覆盖的语句占总语句数的比例。
- % Branch：包含分支的百分比，即被测试覆盖的分支占总分支数的比例。
- % Funcs：包含函数的百分比，即被测试覆盖的函数占总函数数的比例。
- % Lines：包含行的百分比，即被测试覆盖的行占总行数的比例。
- Uncovered Line #s：未被测试覆盖的行号。

从上面的测试报告中，我们可以看出，tools.js 文件下面的 sum 和 sub 这两个函数的测试没有被覆盖到，因为我们在测试的时候，我们是将原来的 sum 和 sub 替换掉了的。

当 collectCoverage 设置为 true 之后，还可以设置 coverageThreshold 代码覆盖率的阀值：

```js
module.exports = {
  // ...
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  // ...
};
```

另外，在项目根目录下面，还新生成了一个 coverage 的目录，里面其实就是各种格式（xml、json、html）的测试报告，之所以生成不同格式的报告，是为了方便你后面通过不同的工具来进行读取。

例如 HTML 版本的测试报告如下图所示：

![image-20230424095300700](https://resource.duyiedu.com/xiejie/2023-04-24-015301.png)

testMatch：这个配置项可以指定 Jest 应该运行哪些测试文件。默认情况下， Jest 会查找 .test.js 或者 .spec.js 结尾的文件

例如我们将该配置修改为如下：

```js
testMatch: [
    "**/test/**/*.[jt]s?(x)",
],
```

moduleFileExtensions :指定 Jest 查找测试文件时应该搜索哪些文件扩展名。

setupFilesAfterEnv：指定 Jest 在运行测试之前应该运行哪些文件。例如：

```js
setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"];
```

在执行每个测试套件（文件）之前，都会先执行这个 setupTests 文件

# 整合 TypeScript

## 准备工作

首先我们需要有一个基于 _ts_ 的项目。

第一步通过 npm init -y 初始化项目

接下来通过：

```js
npm install typescript
```

局部安装 typescript。

之后还需要生成 typescript 的配置文件，通过命令：

```js
npx tsc --init
```

因为我们的项目是在 node 环境中运行，所以还需要安装 node 的类型说明文件

```js
npm i --save-dev @types/node
```

在 node 环境中，如果模块化使用的是 commonjs 规范，那么会存在一个问题，如果在一个模块中导出内容，在另外一个模块中导入这些内容，会提示“无法重新声明块范围变量”。

之所以会这样，是因为在 commonjs 规范里面，没有像 ESmodule 中能形成闭包的模块概念，所有的模块在引用的时候会被抛到全局，因此 ts 就会认为这里重复声明了模块。

要解决这个问题，首先在 ts 配置文件中，将 esModuleInterrop 开启为 true，该配置项用于控制是否启用 ES 模块规范的兼容性处理。

接下来在 tools.ts 文件的最后一行添加 export { } ，这一行代码会让 ts 认为这是一个 ESModule，从而不存在变量重复声明的问题。

项目书写完之后，我们可以配置要编译的 js 存储到哪一个目录下面：

```js
{
  "compilerOptions": {
    "outDir": "./dist",
  },
  "include": ["./src"]
}
```

## 使用 jest 测试

首先第一步还是安装 jest，命令如下：

```js
npm install --save-dev jest
```

生成配置文件：

```js
npx jest --init
```

接下来在 _src_ 目录下面创建 \_\_test\_\_ 这个目录，在这个目录里面新增测试套件，一般来讲一个函数对应一个测试套件，在测试套件中会针对不同的参数来书写对应的测试用例。

```ts
const { randomNum } = require("../utils/tools");

test("测试随机数", () => {
  // 得到一个 4 位数的数组
  const result = randomNum();
  expect(result.length).toBe(4);
  expect(new Set(result).size).toBe(4);
  result.forEach((num: number) => {
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThanOrEqual(9);
  });
});

export {};
```

```ts
const { isRepeat } = require("../utils/tools");

test("参数为string类型数组", () => {
  expect(isRepeat(["1", "1", "2", "3"])).toBe(true);
  expect(isRepeat(["1", "4", "2", "3"])).toBe(false);
});

test("参数为number类型数组", () => {
  expect(isRepeat([1, 1, 2, 3])).toBe(true);
  expect(isRepeat([1, 4, 5, 6])).toBe(false);
});

export {};
```

在书写了测试用例之后，会发现 ts 报错，说找不到 jest 相关的类型说明，这一点和 node 是相似的，需要安装 jest 相关的类型说明文件

```js
npm i --save-dev @types/jest
```

除此之外，我们还需要安装一个名为 ts-jest 的库，这是一个 ts 的预处理器，可以让我们在使用 jest 来测试 ts 代码的时候直接运行 ts 代码：

```js
npm i ts-jest -D
```

还需要修改 jest 的配置文件，将 preset 修改为 ts-jest

```js
preset: "ts-jest",
```

# 浏览器环境下的测试

这一小节我们的目标是学习 Jest 针对在浏览器环境下面的代码，特别是使用到了浏览器 Api 的代码，如何进行测试。

## 示例一

示例一：有一个输入框，用户在输入框中输入内容，该内容会被存储到 localstorage 里面。localstorage 就是浏览器环境下面特有的 Api

```html
<body>
  <p>请输入你要存储的值</p>
  <div>
    <input type="text" name="content" id="content" />
    <button id="saveBtn">存储</button>
    <button id="getBtn">获取</button>
  </div>
  <div style="margin-top:10px">存储的值为：<span id="username"></span></div>
  <script src="./js/index.js" type="module"></script>
</body>
```

```ts
// index.ts
import storage from "./storage.js";

// 获取 DOM 元素
const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
const getBtn = document.getElementById("getBtn") as HTMLButtonElement;
const content = document.getElementById("content") as HTMLInputElement;
const username = document.getElementById("username") as HTMLSpanElement;

saveBtn.addEventListener("click", function () {
  storage.set("user", content.value);
  content.value = "";
  window.alert("存储成功");
});

getBtn.addEventListener("click", function () {
  const value = storage.get("user");
  if (value !== null) {
    username.innerHTML = value;
  } else {
    username.innerHTML = "";
  }
});
```

```ts
// storage.ts

/**
 * 专门负责存储内容到 localstorage 的工具库
 */

const KEY = "my-app-";

/**
 * 负责存储
 */
function set(key: string, value: string) {
  localStorage.setItem(KEY + key, value);
}

/**
 * 负责获取
 */
function get(key: string) {
  return localStorage.getItem(KEY + key);
}

export default {
  get,
  set,
};
```

上面的代码，有那么几个注意点：

- index.ts 在引入模块的时候，需要写成 js
- typescript 在进行编译的时候，我们要将 ts 的配置文件里面的 module 从 commonjs 修改为 ES

接下来我们就要对我们的代码进行一个测试。

首先我们通过 npx jest --init 生成一个 jest 的配置文件，注意在选择配置项目的时候，环境要选择 jsdom，因为我们的代码是在浏览器环境运行的，会涉及到一部分只有在浏览器环境才有的 api

接下来我们来针对 storage 里面提供的工具函数进行测试。

书写如下的测试用例：

```ts
import storage from "../ts/storage";

describe("测试storage存储", () => {
  // 测试存储
  test("测试存储", () => {
    storage.set("newKey", "Hello");
    expect(localStorage.getItem("my-app-newKey")).toBe("Hello");
  });

  // 测试获取
  test("测试获取", () => {
    localStorage.setItem("my-app-newKey", "World");
    expect(storage.get("my-app-newKey")).toBe("World");
  });
});
```

需要注意，在上面我们生成 jest 配置文件的时候，环境选择了 jsdom，如果还是按照以前选择 node 环境的话，这里会出现一个问题：

```js
ReferenceError: localStorage is not defined
```

之所以出现这个问题，是因为在 nodejs 环境中并不存在 localstorage，localstorage 是浏览器环境下特有的 api。

除此之外，从 jest28 版本开始你还需要安装一个依赖：jest-environment-jsdom，由这个依赖来提供特有的像 localstorage、window 全局对象之类的 api。核心作用就是在 nodejs 中模拟出浏览器的环境。

## 示例二

我们经常还需要一些额外的依赖库来晚上在 node.js 中模拟浏览器环境的情况。

```ts
/**
 * 工具函数库
 */

// 该函数的作用是将 url 后面的查询字符串转为对象
const getSearchObj = () => {
  // ?a=1&b=2
  const { search } = window.location;

  // a=1&b=2
  const searchStr = search.slice(1);

  // ['a=1', 'b=2']
  const pairs = searchStr.split("&");

  // { 'a': '1' }
  const searchObj: Record<string, string> = {};

  pairs.forEach((pair) => {
    // [a, 1]
    const [key, value] = pair.split("=");
    searchObj[key] = value;
  });

  return searchObj;
};

export default {
  getSearchObj,
};
```

该函数的作用是将 url 后面的查询字符串转为对象:

```js
window.location.href = "https://www.baidu.com?a=1&b=2";
const result = getSearchObj();
// result ---> {a:'1', b: 2}
```

接下来我们书写对应的测试代码，来对 getSearchObj 进行一个测试，测试代码如下：

```js
import tools from "../ts/tools";
const { getSearchObj } = tools;

describe("测试getSearchObj", () => {
  // 测试是否正常返回对象
  test("测试是否正常返回对象", () => {
    window.location.href = "https://www.baidu.com?a=1&b=2";
    const result = getSearchObj();
    expect(result).toEqual({
      a: "1",
      b: "2",
    });
  });
});
```

接下来我们会发现这个测试用例跑不通，会报：Error: Not implemented: navigation (except hash changes) 这样的一个错误

之所以会报这个错，是因为虽然我们使用了 jest-environment-jsdom 去模拟浏览器环境的 API 接口，但是有一部分 API 是缺失的。比如上面例子的 location，在 jest-environment-jsdom 中就没有提供。

所以这个时候我们需要一些额外的库，例如在当前的例子里面，我们就可以安装 jest-location-mock。

修改上面的测试用例代码，如下：

```js
import tools from "../ts/tools";
import "jest-location-mock";
const { getSearchObj } = tools;

describe("测试getSearchObj", () => {
  // 测试是否正常返回对象
  test("测试是否正常返回对象", () => {
    // window.location.href = "https://www.baidu.com?a=1&b=2";
    window.location.assign("https://www.baidu.com?a=1&b=2");
    const result = getSearchObj();
    expect(result).toEqual({
      a: "1",
      b: "2",
    });
    expect(window.location.search).toBe("?a=1&b=2");
  });

  // 测试参数为空的时候
  test("测试参数为空的时候", () => {
    window.location.assign("https://www.baidu.com");
    const result = getSearchObj();
    expect(result).toEqual({});
    expect(window.location.search).toBe("");
  });
});
```

## 示例三

再比如，我们的浏览器环境下面还有 fetch，这个也是 nodejs 环境没有的。

首先，我们书写了如下的工具方法：

```ts
// 和服务器通信获取数据
const fetchData = (id: number) => {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((res) => res.json())
    .then((res) => res);
};
```

然后我们这针对这个方法进行测试，书写了如下的测试用例：

```ts
import tools from "../ts/tools";
const { fetchData } = tools;

describe("测试fetchData", () => {
  // 测试返回的数据是否有对应的属性
  test("测试返回的数据是否有对应的属性", async () => {
    const result = await fetchData(1);
    expect(result).toHaveProperty("userId");
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("completed");
  });

  // 测试返回的数据对应的值是否正确
  test("测试返回的数据对应的值是否正确", async () => {
    const result = await fetchData(1);
    expect(result).toEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    });
  });
});
```

但是在跑测试用例的时候，我们发现报错了，报错信息为：ReferenceError: fetch is not defined

原因和上一个例子是类似的，即便我们安装了 jest-environment-jsdom，但是有一部分 api 是缺失的，例如这里的 fetch 也是没有的。

这里我们可以安装一个额外的库：jest-fetch-mock

安装好这个库之后，我们可以将上面的测试用例进行一个修改，添加一条如下的语句：

```js
import "jest-fetch-mock";
```

添加了上面的语句后，整个测试用例就能够跑通了。

## 总结

当我们所书写的代码是要在浏览器环境下面运行时，代码里面可能会涉及到很多浏览器相关的 _Api_，此时需要安装 _jest-environment-jsdom_，该库在 _Node.js_ 中通过提供与浏览器相同的 _DOM_ 和 _API_ 接口来模拟浏览器环境。

安装好之后，还需要将 _jest_ 配置文件中的 _testEnvironment_ 修改为 _jsdom_。

另外，虽然 _jest-environment-jsdom_ 提供了一些全局对象和 _API_，如 _window、document、XMLHttpRequest_ 等，但是 _jest-environment-jsdom_ 并没有提供对 _fetch_ 和 _location_ 等 _API_ 的模拟。这就需要我们手动安装 _jest-fetch-mock_ 和 _jest-location-mock_ 等库，来模拟这些浏览器 _API_ 的行为。

具体来说，_jest-fetch-mock_ 是用于模拟 _fetch_ 函数的行为，它可以让我们在测试用例中模拟 _fetch_ 请求，并返回指定的响应数据。而 _jest-location-mock_ 则是用于模拟浏览器的 _location_ 对象，它可以让我们在测试用例中设置和检查浏览器的 URL。

因此，当我们使用 _jest-environment-jsdom_ 来模拟浏览器环境时，需要手动安装这些库来模拟 *fetch*和 _location_ 等浏览器 _API_ 的行为，以确保我们可以编写全面而准确的基于浏览器环境的测试用例。

# 模拟计时器

这一小节我们主要看一下针对计时器的模拟：

- setInterval
- setTimeout

## jest.spyOn 方法

该方法用于模拟对象或者类的方法，并且可以监控这些方法的调用情况。

下面是关于该方法的一个使用示例：

```js
const myApi = {
  async fetchUser(id) {
    const response = await fetch(`/api/user/${id}`);
    const user = await response.json();
    return user;
  },
};

test("fetches user data", async () => {
  // 监视了 myApi 对象的 fetchUser 方法
  const spy = jest.spyOn(myApi, "fetchUser");
  // 通过 spy 重新定义了该方法的返回值
  // 从而达到一个更好的控制
  spy.mockResolvedValue({ name: "John", age: 30 });

  const user = await myApi.fetchUser(123);

  expect(user).toEqual({ name: "John", age: 30 });
  expect(spy).toHaveBeenCalledWith(123);

  spy.mockRestore();
});
```

我们之前也学过模拟方法或者模块的方式，通过 jest.mock 方法来进行模拟。

- jest.spyOn 用于监视对象的方法，可以帮助我们监视被测试代码中的某一个方法是否被正确的调用，另外还可以控制所监视的方法的行为
- jest.mock 更多的用于一个模块的导入，可以帮助我们在测试中替换掉被测试代码中所依赖的模块。

例如 jest.spyOn 我们再举一个例子：

```js
class UserService {
  async getUser(id: string): Promise<User> {
    // ...
  }
}

describe("UserService", () => {
  it("should call getUser method", async () => {
    const userService = new UserService();
    const getUserSpy = jest.spyOn(userService, "getUser");
    getUserSpy.mockResolvedValue({ name: "John", age: 30 });
    await userService.getUser("123");

    expect(getUserSpy).toHaveBeenCalled();
  });
});
```

## 模拟 setInterval

当我们想要测试的代码包含 setInterval 这样的计时器代码的时候，我们往往需要调用 jest.useFakeTimers 方法。

该方法的作用是提供了一个模拟的计时器对象，这样子我们就不需要在测试中使用真实的计时器。

使用模拟的计时器对象，有一个最大的好处，就是模拟时间的流逝。

假设我有一个 setTimeout，该计时器是 5 秒后触发，那么如果使用真实的计时器，就需要等待 5 秒。

因此使用模拟的计时器对象，那么可以对时间进行一个快进操作。

使用了 jest.useFakeTimers，模拟了计时器之后，一般后面需要将计时器还原，这个时候可以使用 jest.useRealTimers

下面是一个模拟 setInterval 进行测试的示例：

```js
import { startTimer, stopTimer } from "../ts/tools";

beforeEach(() => {
  // 在每个测试用例开始之前，使用模拟计时器
  jest.useFakeTimers();
});
afterEach(() => {
  // 使用真实的计时器
  jest.useRealTimers();
});

test("开始计时器", () => {
  const callback = jest.fn(); // 创建一个空的模拟函数
  const interval = 1000;
  const setInterval = jest.spyOn(window, "setInterval"); // 避免调用真实的 setInterval 开启计时器

  const timerId = startTimer(callback, interval);

  // 接下来就使用各种断言来进行测试
  expect(setInterval).toHaveBeenCalledTimes(1); // 调用了 startTimer 方法后 setInterval 只应该执行一次
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), interval); // 断言 setInterval 调用的时候对应的参数

  jest.advanceTimersByTime(interval); // 时间快进 1 秒
  expect(callback).toHaveBeenCalledTimes(1);

  jest.advanceTimersByTime(interval); // 时间快进 1 秒
  expect(callback).toHaveBeenCalledTimes(2);
  expect(setInterval).toHaveBeenCalledTimes(1);
  stopTimer(timerId);
});

test("停止计时器", () => {
  const callback = jest.fn();
  const interval = 1000;

  const timerId = startTimer(callback, interval);
  stopTimer(timerId);

  jest.advanceTimersByTime(interval);
  expect(callback).toHaveBeenCalledTimes(0);
  expect(callback).not.toHaveBeenCalled();
});
```

- 通过调用 jest.useFakeTimers( )，使用模拟的计时器对象，该对象有一个好处就是能够控制时间的流逝，上面的代码中是写在 beforeEach 里面的，会在每一个测试用例开始之前对计时器对象进行替换
- 通过调用 jest.useRealTimers( ) 将模拟的计时器对象还原为真实的计时器对象，所以我们是在 afterEach 里面调用的，会在每一个测试用例结束之后换回来
- 使用到了 jest.spyOn 来监听 setInterval 方法，并且替换为了模拟的 setInterval，这样做可以避免调用真实的 setInterval

## 模拟 setTimeout

下面是一个模拟 setTimeout 的测试用例的示例：

```js
import { startTimeout, stopTimeout } from "../ts/tools";

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test("开启延时器", () => {
  const callback = jest.fn();
  const timeout = 3000;
  const setTimeout = jest.spyOn(window, "setTimeout");

  startTimeout(callback, timeout);

  // 进行断言测试
  expect(callback).not.toHaveBeenCalled();
  jest.advanceTimersByTime(1000);
  expect(callback).not.toHaveBeenCalled();
  jest.advanceTimersByTime(2000);
  expect(callback).toHaveBeenCalled();
  expect(setTimeout).toBeCalledTimes(1);
});

test("停止计时器", () => {
  const callback = jest.fn();
  const timeout = 3000;
  const setTimeout = jest.spyOn(window, "setTimeout");

  const timerId = startTimeout(callback, timeout);
  stopTimeout(timerId);

  jest.advanceTimersByTime(timeout);
  expect(callback).not.toHaveBeenCalled();
  expect(setTimeout).toBeCalledTimes(1);
});

test("时间不能传递负数", () => {
  const callback = jest.fn();
  const timeout = -3000;
  const setTimeout = jest.spyOn(window, "setTimeout");

  const timerId = startTimeout(callback, timeout);
  stopTimeout(timerId);

  jest.advanceTimersByTime(5000);
  expect(callback).not.toHaveBeenCalled();
  expect(setTimeout).toBeCalledTimes(0);
});
```

# 模拟 ES6 类

我们知道，在 ES6 中所提供的 class 本质上是一个语法糖，背后实际上是一个构造函数，因此在对类进行测试的时候，也可以使用 jest.mock 或者 jest.spyOn 来进行模拟测试。

经常我们会遇到这种情况：在测试一个模块的时候，这个模块依赖了其他的类，那么这个时候为了屏蔽其影响，我们需要模拟依赖的类

```ts
import ReviewCollector from "../ts/reviewCollector";
import ProductReview from "../ts/productReview";

// 我们这个测试套件是要对 ReviewCollector 进行测试
// 但是 ReviewCollector 又依赖了 ProductReview 这个类
// 为了屏蔽其影响，我们需要模拟 ProductReview 这个类

// 使用 jest.mock 就可以模拟
jest.mock("../ts/productReview", () => {
  return jest.fn().mockImplementation((name: string, review: string) => {
    return {
      name,
      review,
    };
  });
});
```

在上面的代码中，我们要对 ReviewCollector 进行测试，但是这个类里面又用到了 ProductReview，因此我们采取对 ProductReview 进行一个模拟。

之后就可以在测试用例中正常的使用 ProductReview 即可

```ts
describe("测试ReviewCollector", () => {
  let collector: ReviewCollector;
  beforeEach(() => {
    collector = new ReviewCollector();
  });

  test("能够添加一条评论", () => {
    const review = new ProductReview("产品A", "好用");
    collector.addReview(review);

    // 进行断言测试
    expect(collector.getNumGoodReview("产品A")).toBe(1);
    expect(collector["productList"]).toContain("产品A");
  });

  test("能够获取好评数", () => {
    const review1 = new ProductReview("产品A", "好用");
    const review2 = new ProductReview("产品A", "一般");
    const review3 = new ProductReview("产品B", "好用");

    collector.addReview(review1);
    collector.addReview(review2);
    collector.addReview(review3);

    // 接下来进行断言测试
    expect(collector.getNumGoodReview("产品A")).toBe(1);
    expect(collector.getNumGoodReview("产品B")).toBe(1);
  });
});
```

还有一些时候，我们需要对一个类进行一个测试，那么我们对于有些方法可以使用 jest.spyOn 来进行一个监听。

```ts
// 对 ProductReview 这个类的一些方法进行一些模拟

import ProductReview from "../ts/productReview";

// 模拟类的getter
const mockName = jest
  .spyOn(ProductReview.prototype, "name", "get")
  .mockImplementation(() => "小米手机");
const mockReview = jest
  .spyOn(ProductReview.prototype, "review", "get")
  .mockImplementation(() => "很好用");

// 模拟类的静态方法
const mockStatic = jest
  .spyOn(ProductReview, "showInfo")
  .mockImplementation(() => "静态方法");

test("ProductReview", () => {
  const p = new ProductReview("", "");
  const result = ProductReview.showInfo();

  // 断言
  expect(mockStatic).toHaveBeenCalled();
  expect(result).toBe("静态方法");
  expect(p.name).toBe("小米手机");
  expect(p.review).toBe("很好用");
  expect(mockName).toHaveBeenCalled();
  expect(mockReview).toHaveBeenCalled();
});
```

在上面的代码中，我们是对 ProductReview 类的 getter 方法以及静态方法进行了一个模拟。

# 测试 React 组件

在现代前端开发中，组件是一个重要的模块，一个组件拥有完整的功能，能够对我们的代码进行最大程度的复用。

因此在进行单元测试的时候，往往也需要对重要的组件进行测试。

这一节课我们先聚焦在 React 上面，看一下 React 的组件如何进行测试。

## Testing library

这是专门用来做测试的一个工具库，官网：https://testing-library.com/

这个测试库提供了一系列的 API 和工具，可以用来测试 Web 组件。

这里解答一个疑问，Jest 和 Testing library 之间有什么联系或者区别？

首先 Jest 是一个完整的测试框架，里面提供了诸如匹配器、mock 库、断言工具库之类的工具，设计目标是提供一个完整的测试工具链，测试的重点在某个函数的功能是否完整。

Testing library 是一个测试工具库，这个库的设计理念是“测试组件的行为而不是实现细节”，通过这个库提供的一些 API 可以模拟浏览器中与应用交互的方式。Testing library 是一个通用库，可以和各种框架进行结合。

在进行 React 组件的测试的时候，Jest 和 Testing library 一般都是配合着一起使用的。

这里我们使用 create-react-app 搭建一个 react 项目，内部就有关于测试的示例代码，代码如下：

```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

在 Testing library 库里面，有很多的扩展库，例如在 cra 项目中，就默认安装了@testing-library/jest-dom、@testing-library/react、@testing-library/user-event

_@testing-library/react_、_@testing-library/jest-dom_ 和 _@testing-library/user-event_ 都是 _Testing Library_ 的一部分，属于 Testing library 的扩展库，提供了一些常用的测试工具和断言方法。

- _@testing-library/react_：这个库是 _Testing Library_ 的核心库，提供了一组用于测试 _React_ 组件的工具，例如 _render、screen、fireEvent_ 等等。它可以帮助你在测试中查询和操作组件中的 *DOM*元素，以及模拟用户行为，例如点击、输入等等。
- _@testing-library/jest-dom_：这个库是一个 _Jest_ 的扩展库，提供了一组 _Jest_ 断言方法，用于测试 _DOM_ 元素的状态和行为。它可以帮助你编写更简洁、更可读的测试代码，例如 _toBeInTheDocument、toHaveTextContent_ 等等。
- _@testing-library/user-event_：这个库提供了一组用于模拟用户行为的工具，例如 _type、click、tab_ 等等。它可以帮助你编写更接近真实用户体验的测试，例如模拟用户输入、键盘操作等等。

render 方法

该方法接收一个组件作为参数，将其渲染为 DOM 元素，并返回一个对象，对象身上包含一些重要的属性如下：

- _container_：渲染后的 _DOM_ 元素。可以通过操作它来模拟用户行为，或者进行其他的断言验证。
- _baseElement_：整个文档的根元素 <_html_>。
- _asFragment_：将渲染后的 _DOM_ 元素转换为 _DocumentFragment_ 对象，方便进行快照测试。
- _debug_：在控制台输出渲染后的 _DOM_ 元素的 _HTML_ 结构，方便调试。

screen 对象

该对象封装了一个常用的 DOM 查询和操作的函数，screen 也提供了一些常用的方法：

- _screen.getByLabelText_：根据 <_label_> 元素的 _for_ 属性或者内部文本，获取与之关联的表单元素。
- _screen.getByText_：根据文本内容获取元素。
- _screen.getByRole_：根据 _role_ 属性获取元素。
- _screen.getByPlaceholderText_：根据 _placeholder_ 属性获取表单元素。
- _screen.getByTestId_：根据 _data-testid_ 属性获取元素。
- screen.queryBy\*：类似的，还有一系列 queryBy\* 函数，用于获取不存在的元素时不会抛出异常，而是返回 null。

## 测试组件示例

示例一

```jsx
import { useState } from "react";
function HiddenMessage({ children }) {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <label htmlFor="toggle">显示信息</label>
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={isShow}
        onChange={(e) => setIsShow(e.target.checked)}
      />
      {isShow ? children : null}
    </div>
  );
}

export default HiddenMessage;
```

首先我们有上面的这么一个组件，该组件有一个插槽接收传入的信息，然后根据 checkbox 的点击状态来决定这个信息是否显示。

接下来我们针对上面的组件进行一个测试。注意，使用 cra 搭建的 react 项目，官方推荐将测试代码放到 src 目录下面，默认跑测试的时候，也只会查找 src 下面的测试文件，这个配置是可以改的，但是需要 npm run eject 弹出隐藏的 jest.config.js 配置，然后再修改。

下面是对应的测试代码：

```js
import { render, screen, fireEvent } from "@testing-library/react";
import HiddenMessage from "../HiddenMessage";

test("能够被勾选，功能正常", () => {
  const testMessage = "这是一条测试信息";
  render(<HiddenMessage>{testMessage}</HiddenMessage>);
  // 期望文档中没有，因为一开始组件的状态为 false
  expect(screen.queryByText(testMessage)).toBeNull();
  // 模拟点击
  fireEvent.click(screen.getByLabelText("显示信息"));
  // 这一次就期望在文档中出现
  expect(screen.getByText(testMessage)).toBeInTheDocument();
});
```

在书写测试用例的时候，有一个 3A 模式，Arrange（准备）、Act（动作）、Assert（断言）

3A ： https://wiki.c2.com/?ArrangeActAssert

1. **Arrange** all necessary preconditions and inputs.
2. **Act** on the object or method under test.
3. **Assert** that the expected results have occurred.

关于 queryByText 和 getByText 两者之间的区别：

queryBy* 如果没有找到，返回的是 null，而 getBy* 没有找到，会抛出错误，具体的可以参阅：https://testing-library.com/docs/react-testing-library/cheatsheet/#queries

示例二

该组件是一个登录组件，里面涉及到账号和密码的输入，以及发送请求，代码如下：

```jsx
import * as React from "react";

function Login() {
  // 这里维护了一个组件自身的状态
  const [state, setState] = React.useReducer((s, a) => ({ ...s, ...a }), {
    resolved: false,
    loading: false,
    error: null,
  });

  function handleSubmit(event) {
    event.preventDefault();
    const { usernameInput, passwordInput } = event.target.elements;

    setState({ loading: true, resolved: false, error: null });

    window
      .fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.value,
          password: passwordInput.value,
        }),
      })
      .then((r) =>
        r.json().then((data) => (r.ok ? data : Promise.reject(data)))
      )
      .then(
        (user) => {
          setState({ loading: false, resolved: true, error: null });
          window.localStorage.setItem("token", user.token);
        },
        (error) => {
          setState({ loading: false, resolved: false, error: error.message });
        }
      );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usernameInput">Username</label>
          <input id="usernameInput" />
        </div>
        <div>
          <label htmlFor="passwordInput">Password</label>
          <input id="passwordInput" type="password" />
        </div>
        <button type="submit">Submit{state.loading ? "..." : null}</button>
      </form>
      {state.error ? <div role="alert">{state.error}</div> : null}
      {state.resolved ? (
        <div role="alert">Congrats! You're signed in!</div>
      ) : null}
    </div>
  );
}

export default Login;
```

在上面的登录组件中，我们首先维护了一个组件状态，{ loading:false,resolved:false,error:null}

用户填写用户名和密码，点击 button 进行提交，首先会把状态修改为 { loading:true,resolved:false,error:null}

然后接下来通过 fetch 发送请求，根据响应来决定如何处理，如果请求成功，状态为 { loading:false,resolved:true,error:null}，接下来在页面上就应该显示 Congrats! You're signed in!

如果请求失败，状态就为 { loading:false,resolved:false,error:error.message}，页面就显示对应的错误信息。

接下来我们来书写对应的测试代码。

这里我们是对组件进行测试，这是属于一种单元测试，那么我们就需要屏蔽真实的请求。

这里介绍一种新的方式，通过 msw 的第三方库可以快速启动一个服务器，方便我们进行单元测试。

对应的测试代码如下：

```js
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login";

const fakeUserRes = { token: "fake_user_token" };
const server = setupServer(
  rest.post("/api/login", (req, res, ctx) => {
    return res(ctx.json(fakeUserRes));
  })
);

// 启动服务器
beforeAll(() => server.listen());
// 关闭服务器
afterAll(() => server.close());
// 每一个测试用例完成后会执行
afterEach(() => {
  server.resetHandlers(); // 重置服务器，每个测试用例之间相互不影响
  window.localStorage.removeItem("token");
});

test("测试请求成功", async () => {
  // 渲染该组件
  render(<Login />);
  // 往表单里面填写信息
  fireEvent.change(screen.getByLabelText(/Username/i), {
    target: {
      value: "xiejie",
    },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: {
      value: "123456",
    },
  });
  // 点击提交按钮
  fireEvent.click(screen.getByText("Submit"));
  // 既然是请求成功，那么我们期望“Congrats! You're signed in!”这条信息显示出来
  expect(await screen.findByRole("alert")).toHaveTextContent(/Congrats/i);
  // 既然请求成功，那么 token 也应该是成功保存的
  expect(window.localStorage.getItem("token")).toEqual(fakeUserRes.token);
});

test("测试请求失败", async () => {
  // 模拟服务器请求失败
  server.use(
    rest.post("/api/login", (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: "服务器内部出错" }));
    })
  );

  // 渲染该组件
  render(<Login />);
  // 往表单里面填写信息
  fireEvent.change(screen.getByLabelText(/Username/i), {
    target: {
      value: "xiejie",
    },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: {
      value: "123456",
    },
  });
  // 点击提交按钮
  fireEvent.click(screen.getByText("Submit"));
  // 请求失败
  expect(await screen.findByRole("alert")).toHaveTextContent(/服务器内部出错/i);
  expect(window.localStorage.getItem("token")).toBeNull();
});
```

在上面的测试代码中，我们首先使用到了 msw 这个依赖库，这个依赖库可以帮助我们模拟一个服务器，后面我们可以在这个服务器的基础上给出各种 mock 响应。

之后我们书写了两个测试，一个是测试请求成功，一个是测试请求失败。里面就是按照 3A 模式进行操作的。

---

-_EOF_-

# 测试 Hook

在进行 React 开发的时候，还有一个非常重要的功能模块，那就是 _Hook_，自定义 Hook 作为一块公共逻辑的抽离，也会像组件一样被用到多个地方，因此对 Hook 的测试也是非常有必要的。

Hook 没有办法像普通函数一样直接进行测试，因为在 React 中规中，Hook 必须要在组件里面使用，否则会报错。

![16835247590337](https://resource.duyiedu.com/xiejie/2023-05-10-060112.jpg)

有一种方案，就是为了测试自定义 Hook，专门写一个组件，然后通过上一小节我们所讲的测试组件的方式来测试这些 Hook，这种方案是可以的，但是比较麻烦。

在 Testing library 里面就提供了一个 @testing-library/react-hooks 的扩展库，专门用于测试 react hooks。

该扩展库对应的官网地址：https://react-hooks-testing-library.com/

## 快速上手示例

首先我们有如下的自定义 Hook：

```ts
// 自定义 hook
// 这是一个计数器的自定义 hook
// 内部维护了一个计数的值，以及修改这个值的一些方法

import { useState } from "react";

interface Options {
  min?: number;
  max?: number;
}

type ValueParam = number | ((c: number) => number);

// 该方法主要是做一个边界的判断，如果超过了边界，那么就取边界值
function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  let target = val;
  // 判断有没有超过最大值，如果超过了，那么我们就取最大值
  if (typeof max === "number") {
    target = Math.min(max, target);
  }
  // 判断有没有超过最小值，如果超过了，那么我们就取最小值
  if (typeof min === "number") {
    target = Math.max(min, target);
  }
  return target;
}

// useCounter(100, {min : 1, max : 1000})
function useCounter(initialValue = 0, options: Options = {}) {
  const { min, max } = options;

  // 设置初始值，初始值就为 initialVaule
  // 初始值是该自定义 hook 内部维护的状态，用来表示计数器的数值
  const [current, setCurrent] = useState(() => {
    return getTargetValue(initialValue, {
      min,
      max,
    });
  });

  // 设置新的值
  // 在设置新的值的时候，调用了 getTargetValue 来判断新值是否越界
  const setValue = (value: ValueParam) => {
    setCurrent((c) => {
      const target = typeof value === "number" ? value : value(c);
      return getTargetValue(target, {
        max,
        min,
      });
    });
  };

  // 下面就是自定义 hook 提供的 4 个方法
  // 用于修改计数器的数值

  // 增加
  const inc = (delta = 1) => {
    setValue((c) => c + delta);
  };

  // 减少
  const dec = (delta = 1) => {
    setValue((c) => c - delta);
  };

  // 设置
  const set = (value: ValueParam) => {
    setValue(value);
  };

  // 重置
  const reset = () => {
    setValue(initialValue);
  };

  // 像外部暴露
  return [
    current,
    {
      inc,
      dec,
      set,
      reset,
    },
  ] as const;
}

export default useCounter;
```

接下来我们要对这个自定义 Hook 进行一个测试，对应的测试代码如下：

```ts
import useCounter from "../hooks/useCounter";
import { renderHook, act } from "@testing-library/react";

test("可以做加法", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0));

  // Act（行为）
  act(() => result.current[1].inc(2));

  // Assert（断言）
  expect(result.current[0]).toEqual(2);
});

test("可以做减法", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0));

  // Act（行为）
  act(() => result.current[1].dec(2));

  // Assert（断言）
  expect(result.current[0]).toEqual(-2);
});

test("可以设置值", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0));

  // Act（行为）
  act(() => result.current[1].set(100));

  // Assert（断言）
  expect(result.current[0]).toEqual(100);
});

test("可以重置值", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0));

  // Act（行为）
  act(() => result.current[1].set(100));
  act(() => result.current[1].reset());

  // Assert（断言）
  expect(result.current[0]).toEqual(0);
});

test("可以设置最大值", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0, { max: 100 }));

  // Act（行为）
  act(() => result.current[1].set(1000));

  // Assert（断言）
  expect(result.current[0]).toEqual(100);
});

test("可以设置最小值", () => {
  // Arrange（准备）

  // result ---> {current : [0, {inc, dec, set, reset}]}
  const { result } = renderHook(() => useCounter(0, { min: -100 }));

  // Act（行为）
  act(() => result.current[1].set(-1000));

  // Assert（断言）
  expect(result.current[0]).toEqual(-100);
});
```

首先我们使用到了 renderHook，这个方法的背后，会去渲染一个测试组件，在组件中可以使用自定义 hook，从 renderHook 的返回值中可以解构出自定义 Hook 中返回的状态值以及修改状态值的方法。

接下来使用 act 方法，该方法主要是用来模拟 react 组件的交互行为，并且触发更新。

最后进行 expect 断言。

注意，上面的 renderHook 以及 act 方法是从 @testing-library/react 解构出来的，但是以前在旧版本中是需要安装 @testing-library/react-hooks 扩展库，然后从这个扩展库中解构 renderHook 和 act 方法，目前新版本已经将这两个方法整合到 @testing-library/react 这个扩展库里面了。

经过测试之后，就可以证明我们这个自定义 Hook 是没有问题，自然在组件中进行使用的时候也不会有任何问题：

```tsx
import "./App.css";
import useCounter from "./hooks/useCounter";
function App() {
  const [current, { inc, dec, set, reset }] = useCounter(5, {
    min: 0,
    max: 10,
  });
  return (
    <div className="App">
      <div>{current}</div>
      <button onClick={() => dec(1)}>-</button>
      <button onClick={() => inc(1)}>+</button>
      <button onClick={() => set(100)}>set</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
}

export default App;
```

## 测试异步的 Hook

有些时候我们的 Hook 会包含一些异步的代码，例如我们对上面的计数器进行一个修改，增加异步的方法，如下：

```ts
const asyncInc = (delta = 1) => {
  setTimeout(() => {
    setValue((c) => c + delta);
  }, 2000);
};
```

之后在进行测试的时候，就可以使用前面我们所学过的 fakeTime 来模拟时间流逝，代码如下：

```ts
test("测试异步的增加", async () => {
  jest.useFakeTimers();
  const { result } = renderHook(() => useCounter(0));
  act(() => result.current[1].asyncInc(2));
  expect(result.current[0]).toEqual(0);
  await act(() => jest.advanceTimersByTime(2000));
  expect(result.current[0]).toEqual(2);
  jest.useRealTimers();
});
```

# 测试快照

在对组件进行测试的时候，往往需要从两个方面进行测试：

- 交互：确保组件在进行交互时功能正常
- 渲染：确保组件渲染输出正确（比如不会多一个或者少一个 DOM 元素）

针对渲染方面的测试，我们就可以使用快照来进行测试。

所谓快照，就是给渲染出来的 DOM 元素拍一张“照片”（将最终渲染出来的 DOM 以字符串序列的方式记录下来）

## 快速上手

首先我们有如下的一个组件

```tsx
import { useState } from "react";

function App() {
  const [items, setItems] = useState(["苹果", "香蕉", "西瓜"]);
  const [value, setValue] = useState("");
  const lis = items.map((it, idx) => <li key={idx}>{it}</li>);

  function addItem() {
    if (items) {
      const newItems = [...items];
      newItems.push(value);
      setItems(newItems);
      setValue("");
    }
  }
  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addItem}>添加</button>
      <ul>{lis}</ul>
    </div>
  );
}

export default App;
```

这个组件非常的简单，就是一个 todolist 的组件，内部有默认的项目，也可以新增项目。

接下来编写我们的测试代码，代码如下：

```ts
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toMatchSnapshot();
});
```

首先从 render 方法中解构出 baseElement（注意 render 方法来源于 testing library）

接下来调用了 toMatchSnapshot（这个方法是 jest 提供的方法）来生成快照。

<img src="https://resource.duyiedu.com/xiejie/2023-05-11-012800.png" alt="image-20230511092759962" style="zoom:50%;" />

通过执行结果也可以看到，生成了一张快照，并且在我们的项目目录中（和你的测试文件是同级的），生成了一个名为 \_\_snapshots\_\_ 的目录，里面就是一张测试快照，测试快照的本质就是渲染出来的 DOM 的结构的字符串序列。

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`renders learn react link 1`] = `
<body>
  <div>
    <div
      class="App"
    >
      <input
        type="text"
        value=""
      />
      <button>
        添加
      </button>
      <ul>
        <li>
          苹果
        </li>
        <li>
          香蕉
        </li>
        <li>
          西瓜
        </li>
      </ul>
    </div>
  </div>
</body>
`;
```

之后在下一次测试的时候，针对这个组件测试，就会将组件渲染出来的 DOM 结构的序列和之前的快照进行一个比对，看是否一致，如果和之前的快照是一致的，那么测试就通过，如果不一致（这一次渲染新增了 DOM 节点或者少了 DOM 节点），那么就说明这一次渲染和之前的渲染不一致的，测试不通过。

如下图所示：

<img src="https://resource.duyiedu.com/xiejie/2023-05-11-013235.png" alt="image-20230511093235552" style="zoom:50%;" />

测试快照虽然很简单，但是有一些注意点：

- 快照本身并不验证渲染逻辑是否正确，它只是防止意外更改，所以当测试快照不通过的时候，我们就需要检查一下所需的元素、样式是否发生了我们不期望的改变
- 快照失败的时候，如果确定渲染逻辑没有问题，确确实实是结构需要发生更改，那么我们可以更新快照。可以通过 jest --updateSnapshot 这个命令进行更新。

## 避免大快照

在上面的示例中，我们的组件比较简单，因此我们针对整个组件做了快照，但是在真实的项目中，往往业务组件会比较复杂，一个大组件里面会嵌套很多的小组件，这个时候如果你直接对整个大组件进行快照，那么就会导致你的快照文件无比的巨大，因为这里快照会将嵌套的组件的 DOM 结构也记录下来。

例如：

```ts
import TestUI from "./components/TestUI";
import Items from "./components/Items";

function App() {
  return (
    <div className="App">
      <Items />
      <TestUI />
    </div>
  );
}

export default App;
```

```tsx
function TestUI() {
  return (
    <ul data-testid="list">
      <li>张三</li>
      <li>李四</li>
      <li>王武</li>
    </ul>
  );
}

export default TestUI;
```

```tsx
import { useState } from "react";
function Items() {
  const [items, setItems] = useState(["苹果", "香蕉", "西瓜"]);
  const [value, setValue] = useState("");
  const lis = items.map((it, idx) => <li key={idx}>{it}</li>);
  function addItem() {
    if (items) {
      const newItems = [...items];
      newItems.push(value);
      setItems(newItems);
      setValue("");
    }
  }
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addItem}>添加</button>
      <ul>{lis}</ul>
    </div>
  );
}

export default Items;
```

那么现在针对 App 组件生成快照的时候，就会导致快照文件比较大，因为会连同 TestUI 以及 Items 组件的 DOM 结构一起生成。

这种请求，我们就可以指定只生成某一个部分的快照，这种快照我们称之为小快照。

代码如下：

```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const content = screen.getByTestId("list");
  expect(content).toMatchSnapshot();
});
```

上面的代码，只会针对 TestUI 组件生成快照。

## 扩展场景

很多人喜欢把快照测试等同于组件的 UI 测试，但是快照有些时候在其他的某一些场景下使用也非常方面。

举个例子：

```ts
// getUserById.ts
const getUserById = async (id: string) => {
  return request.get("user", {
    params: { id },
  });
};

// getUserById.test.ts
describe("getUserById", () => {
  it("可以获取 userId == 1 的用户", async () => {
    const result = await getUserById("1");
    expect(result).toEqual({
      // 非常巨大的一个 JSON 返回...
    });
  });
});
```

比如在上面的示例中，http 请求返回的结果是比较大的，这个时候就会有一些冗余的代码，在写 expect 断言的时候就会比较麻烦。

这个时候你就可以使用快照：

```ts
// getUserById.ts
const getUserById = async (id: string) => {
  return request.get("user", {
    params: { id },
  });
};

// getUserById.test.ts
describe("getUserById", () => {
  it("可以获取 userId == 1 的用户", async () => {
    const result = await getUserById("1");
    expect(result).toMatchSnapshot();
  });
});
```

## 总结

这一小节我们学会了 快照测试。快照测试的思想很简单：

先执行一次测试，把输出结果记录到 ._snap_ 文件，以后每次测试都会把输出结果和 ._snap_ 文件做对比。快照失败有两种可能：

- 业务代码变更后导致输出结果和以前记录的 ._snap_ 不一致，说明业务代码有问题，要排查 _Bug_。
- 业务代码有更新导致输出结果和以前记录的 ._snap_ 不一致，新增功能改变了原有的 _DOM_ 结构，要用 _npx jest --updateSnapshot_ 更新当前快照。

不过现实中这两种失败情况并不好区分，更多的情况是你既在重构又要加新需求，这就是为什么快照测试会出现 “假错误”。而如果开发者还滥用快照测试，并生成很多大快照， 那么最终的结果是没有人再相信快照测试。一遇到快照测试不通过，都不愿意探究失败的原因，而是选择更新快照来 “糊弄一下”。

要避免这样的情况，需要做好两点：

- 生成小快照。只取重要的部分来生成快照，必须保证快照是能让你看懂的
- 合理使用快照。快照测试不是只为组件测试服务，同样组件测试也不一定要包含快照测试。快照能存放一切可序列化的内容。

# 测试 Vue 组件

在通过 vuecli 创建 vue 项目的时候，我们可以很轻松的将 jest 测试框架集成进去。

之前我们在介绍测试 React 组件的时候，介绍了 testing library 这个扩展库，这个 testing library 是一个通用库，因此这个扩展库可以用于 vue、angular...

但是本小节我们要介绍另外一个库，这个库叫做 vue test utils，这个库是专门针对测试 vue 组件的扩展库，因此在这个库中，专门提供了面向 vue 组件对应的 API 和工具。

官网地址：https://test-utils.vuejs.org/

如果你不是新项目，而是已有的项目，那么首先第一步需要安装测试工具库，安装的时候注意一下版本：

- [Vue Test Utils 1](https://github.com/vuejs/vue-test-utils/) targets [Vue 2](https://github.com/vuejs/vue/).
- [Vue Test Utils 2](https://github.com/vuejs/test-utils/) targets [Vue 3](https://github.com/vuejs/vue-next/).

_Vue Test Utils_ 可以与各种测试框架一起使用，如 _Jest、Mocha、AVA_ 等。它还支持在 _Node.js_ 环境和浏览器中运行测试。

以下是 _Vue Test Utils_ 的一些主要功能：

1. 模拟用户操作：_Vue Test Utils_ 提供了一组 _API_，如 _wrapper.trigger( )_ 和 _wrapper.setProps( )_，可以模拟用户在组件上执行的各种操作，如点击、输入、滚动等。
2. 访问组件实例：_Vue Test Utils_ 可以让你获得组件实例，然后你可以检查它们的状态、计算属性、方法等。你可以使用 _wrapper.vm_ 访问组件实例。
3. 断言组件渲染结果：_Vue Test Utils_ 提供了一组 _API_，如 _wrapper.find( )_ 和 _wrapper.contains( )_，可以检查组件是否渲染了正确的内容。你还可以使用 _wrapper.html( )_ 获取组件的 _HTML_ 代码，以便于在测试中进行比较。
4. 支持插件：_Vue Test Utils_ 支持 _Vue.js_ 插件，你可以使用 _localVue.use( )_ 在测试中安装插件。
5. 支持异步操作：_Vue Test Utils_ 支持异步操作，你可以使用 _wrapper.vm.$nextTick( )_ 等方法等待异步操作完成后再进行测试断言。

_Vue Test Utils_ 提供了丰富的 _API_，可以帮助你编写高质量的 _Vue.js_ 组件测试。它可以让你轻松测试组件的各种行为和渲染结果，并且易于集成到你的测试工作流程中。

## 快速上手

我们这里直接来看内置的测试示例：

```ts
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
```

首先第一步从 @vue/test-utils 库中解构出来了 shallowMount，与之对应的还有一个方法是 mount。

mount 代表渲染一个组件，shallowMount 代表浅渲染，也就是不会去渲染子组件。这两个方法就相当于之前 testing library 里面的 render 方法。

当我们使用 mount 或者 shallowMount 渲染组件之后，会得到一个对象，这个对象我们称之为 wrapper 对象，该对象上面提供了一系列的方法，方便我们来访问和操作组件的属性、样式以及渲染结果之类的。

常用的方法如下：

- _find(selector)_: 在组件的渲染结果中查找符合选择器的元素。
- _findAll(selector)_: 在组件的渲染结果中查找所有符合选择器的元素。
- _trigger(eventType, eventData)_: 触发组件的事件。
- _setProps(props)_: 设置组件的属性。
- _setData(data)_: 设置组件的数据。
- _text( )_: 获取组件的文本内容。
- _html( )_: 获取组件的 _HTML_ 代码。

接下来我们再来写一个例子。首先我们还是写一个 todolist，组件代码如下：

```vue
<template>
  <div>
    <!-- 渲染待办事项每一条项目 -->
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.text }}
    </div>

    <form data-test="form" @submit.prevent="createTodo">
      <input data-test="new-todo" v-model="newTodo" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const newTodo = ref("");
// 默认的待办事项
const todos = ref([
  {
    id: 1,
    text: "Learn Vue.js 3",
    completed: false,
  },
]);
function createTodo() {
  todos.value.push({
    id: 2,
    text: newTodo.value,
    completed: false,
  });
  newTodo.value = "";
}
</script>

<style scoped></style>
```

接下来，针对这个组件书写如下的测试代码：

```ts
import { shallowMount } from "@vue/test-utils";
import ToDoList from "@/components/ToDoList.vue";

test("测试新增待办事项", async () => {
  const wrapper = shallowMount(ToDoList);
  const todo = wrapper.get('[data-test="todo"]');
  // 因为一开始只有一条待办事项
  expect(todo.text()).toBe("Learn Vue.js 3");

  // act
  // 接下来来测试新增
  await wrapper.get('[data-test="new-todo"]').setValue("New To Do Item");
  // 触发 submit 事件
  await wrapper.get('[data-test="form"]').trigger("submit");

  // assert
  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
});
```

在上面的测试代码中，我们使用了 shallowMount 来渲染组件，渲染完成后得到一个 wrapper 对象，通过 wrapper 对象的 get 以及 findAll 来查找 DOM，之后进行断言。

需要注意一个问题，使用 vue cli 搭建的项目，在集成 jest 的时候默认配置的只检查 .spec 的文件，如果想要检测 .test 类型的文件，需要进行配置，这里我们在 jest.config.js 里面进行一个配置，配置如下：

```js
module.exports = {
  // ...
  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
};
```

## 测试快照

生成测试快照代码如下：

```ts
expect(wrapper.element).toMatchSnapshot();
```

## 更多示例

这里我们将之前测试 React 组件所写的两个组件改成 Vue3 版本，并且进行测试。

**示例一**

首先是组件代码，如下：

```vue
<template>
  <div>
    <label htmlFor="toggle">显示说明</label>
    <input
      id="toggle"
      type="checkbox"
      :checked="showMessage"
      @click="showMessage = !showMessage"
    />
    <div id="showMessage">
      <slot v-if="showMessage"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showMessage = ref(false);
</script>

<style scoped></style>
```

接下来针对这个组件书写如下的测试代码：

```ts
import { shallowMount } from "@vue/test-utils";
import HiddenMessage from "@/components/HiddenMessage.vue";

test("正确的渲染出来", () => {
  const wrapper = shallowMount(HiddenMessage);
  expect(wrapper.find("label").text()).toBe("显示说明");
  expect(wrapper.find("input").attributes("type")).toBe("checkbox");
});

test("默认不显示信息", () => {
  const wrapper = shallowMount(HiddenMessage);
  expect(wrapper.find("#showMessage").exists()).toBe(true);
  expect(wrapper.find("#showMessage").text()).toBe("");
});

test("点击复选框之后能够显示信息", async () => {
  const wrapper = shallowMount(HiddenMessage, {
    slots: {
      default: "<p>这是一段说明文字</p>",
    },
  });
  const checkbox = wrapper.find("input");
  await checkbox.trigger("click");
  expect(wrapper.find("#showMessage").text()).toBe("这是一段说明文字");
  await checkbox.trigger("click");
  expect(wrapper.find("#showMessage").text()).toBe("");
});
```

在上面的测试代码中，我们书写了 3 个测试用例，分别测试了“组件是否正确渲染”“组件默认的状态”以及“组件功能是否正常”

**示例二**

组件代码如下：

```vue
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="usernameInput">Username</label>
        <input id="usernameInput" v-model="username" />
      </div>
      <div>
        <label for="passwordInput">Password</label>
        <input id="passwordInput" type="password" v-model="password" />
      </div>
      <button type="submit">Submit{{ state.loading ? "..." : null }}</button>
    </form>
    <div v-if="state.error" role="alert">{{ state.error }}</div>
    <div v-if="state.resolved" role="alert">Congrats! You're signed in!</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface LoginState {
  resolved: boolean;
  loading: boolean;
  error: string | null;
}

const username = ref("");
const password = ref("");
const state = ref<LoginState>({
  resolved: false,
  loading: false,
  error: null,
});

function handleSubmit() {
  state.value.loading = true;
  state.value.resolved = false;
  state.value.error = null;

  window
    .fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
    .then((r) => r.json().then((data) => (r.ok ? data : Promise.reject(data))))
    .then(
      (user) => {
        state.value.loading = false;
        state.value.resolved = true;
        state.value.error = null;
        localStorage.setItem("token", user.token);
      },
      (error) => {
        state.value.loading = false;
        state.value.resolved = false;
        state.value.error = error.message;
      }
    );
}
</script>

<style scoped></style>
```

该组件主要负责登录，用户填写用户名和密码，通过 fetch 发送请求，之后会对响应的内容做出不同的操作。

下面是针对这个组件进行的测试：

```ts
import { shallowMount } from "@vue/test-utils";
import Login from "@/components/LoginCom.vue";

// 前期准备
const fakeUserResponse = { token: "fake_user_token" };
window.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(fakeUserResponse),
});

afterEach(() => {
  window.localStorage.removeItem("token");
});

test("请求成功", async () => {
  // arrage
  const wrapper = shallowMount(Login);

  // act 填写表单
  await wrapper.find("#usernameInput").setValue("xiejie");
  await wrapper.find("#passwordInput").setValue("123456");
  await wrapper.find("form").trigger("submit");

  // 等待
  await wrapper.vm.$nextTick();
  await new Promise((resolve) => setTimeout(resolve, 100));

  // assert
  expect(window.localStorage.getItem("token")).toEqual(fakeUserResponse.token);
  expect(wrapper.find('[role="alert"]').text()).toMatch(/Congrats/i);
});

test("请求失败", async () => {
  window.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.reject({
        message: "服务器内部错误",
      }),
  });

  // arrage
  const wrapper = shallowMount(Login);

  // act 填写表单
  await wrapper.find("#usernameInput").setValue("xiejie");
  await wrapper.find("#passwordInput").setValue("123456");
  await wrapper.find("form").trigger("submit");

  // 等待
  await wrapper.vm.$nextTick();
  await new Promise((resolve) => setTimeout(resolve, 100));

  // assert
  expect(window.localStorage.getItem("token")).toBeNull();
  expect(wrapper.find('[role="alert"]').text()).toMatch("服务器内部错误");
});
```

这个测试代码主要写了 2 个测试用例，分别测试了请求成功和失败的情况，我们通过 jest.fn 来模拟 fetch 请求，从而避免发送真实的请求。

## 总结

本小节我们主要看了关于 _Vue_ 组件的测试。

对于 _Vue_ 组件，有一个常用的配套库为 _Vue Test Utils_。这是一个专门为 _Vue.js_ 应用程序编写单元测试和集成测试的官方测试工具库。它提供了一系列 _API_，用于模拟用户操作、查询组件和断言测试结果，使得开发人员可以在不需要手动操作应用程序的情况下，自动化地测试 _Vue_ 组件的行为和交互。

_Vue Test Utils_ 的主要功能包括：

1. 渲染组件：提供 _mount_ 和 _shallowMount_ 函数，用于把组件渲染为一个包含测试工具的 _Vue_ 包装器，以便在测试中操作和查询组件。
2. 模拟用户操作：提供 _trigger_ 和 _setValue_ 等方法，用于模拟用户操作组件，如点击按钮、输入文本等。
3. 访问组件实例：提供 _wrapper.vm_ 属性，用于访问组件实例的属性和方法。
4. 修改组件实例：提供 _wrapper.setProps_ 和 _wrapper.setData_ 等方法，用于修改组件实例的属性和状态，以便测试不同的场景。

总之，_Vue Test Utils_ 提供了一整套工具和 _API_，使得开发人员可以轻松编写单元测试和集成测试，并确保 _Vue.js_ 应用程序的稳定性和可靠性。

# JavaScript 库设计

本小节我们先来介绍一下在设计开源库的时候有哪些原则以及最佳实践。

## 函数的设计

函数包含三要素：

- 函数名
- 参数
- 返回值

**函数名**

函数通常表示做一件事情，因此函数名一般为一个动词或者表示动作的短语，我们希望通过函数名就能够传达这个函数是做什么的。哪怕整个函数单词用得多一些，整个函数名长一些也无所谓，只要能够传达当前函数的作用。

例如 react 源码中的一些函数：_workLoopConcurrent、checkScheduledUpdateOrContext、bailoutOnAlreadyFinishedWork_

另外就是函数名要力求准确，这里的准确还包含单词的拼写不要出错，因为作为一个开源库，代码一旦开源出去，就很难收回了，换句话说，一旦有这种拼写的错误，那么大概率后面就会一直延用这种错误的拼写。例如 HTTP 协议里面就有一个拼写的错误，请求头里面有一个 referer 字段实际上是错误的，正确的拼写为 referrer

**函数参数**

理论上来讲，关于函数参数的设计，函数参数的个数应该是越少越好，这样的话能够降低使用者的心智负担。如果你所设计的函数参数过多，那么也从侧面说明了函数的设计是有问题的，你在一个函数里面融入了过多的功能，因此你应该考虑对你当前的这个函数重新进行设计。

一般来讲，在设计函数的参数的时候，不要超过 3 个，如果可以的话，最好是 2 个参数，如果是 2 个参数，一般来讲，第一个参数代表必传参数，第二个一般代表可选参数。

例如：

```js
getParams("?a=1&b=2", "a"); // 输出1

// 我们先不管函数具体的实现，下面有两种参数设计
getParams(url, key, (sep = "&"), (eq = "="));
getParams(url, key, (opt = { sep: "&", eq: "=" }));
```

在上面的示例中，第二种函数参数的设计要明显优于第一种，通过对象化的思路，减少后参数的数量，降低了用户的心智负担，其实还有一个好处，就是采用对象化的设计，未来在进行扩展的时候也更加容易一些。

**返回值**

如果你的返回值是针对函数传入的参数进行的查询或者某种操作，那么返回值的类型**尽量**和参数的类型保持一致，这样做是比较符合直觉的。

另外就是如果没有设置返回值，那么默认返回值为 undefined。

举个例子：

```js
function getParams(url) {
  if (url) {
    // xxx
  }
}
// 这里有个默认的返回值为 undefined
```

假设用户想要在获取参数后将其转为十六进制：

```js
getParams(url).toString(16);
```

但是上面的函数设计就会存在隐患，因此更好的方法就是像上面所说，保持返回值的类型一致。

```js
function getParams(url) {
  if (url) {
    // xxx
  }

  return "";
}
```

## 提升健壮性

我们的开源库会被很多人使用，并且环境是未知的，即便我们在文档中规定了必须要传递什么类型的参数，但是使用者也有可能违反约定，甚至还有一些情况，数据来源于服务器、数据来源于各种逻辑计算之后的结果，传入到了我们的函数，所以这个时候我们就需要对我们的参数进行一个防御。

```js
function trimStart(str) {
  return str.replace(/^\s+/, "");
}

trimStart(111);
```

在上面的代码中，如果意外传入了非字符串类型的参数，那么就会出现异常，这个时候我们就可以采取一些防御性的措施：

```js
function trimStart(str) {
  return String(str).replace(/^\s+/, "");
}

trimStart(111);
```

在进行参数防御的时候，参数分为两种，一种是必传参数，另外一种是可选参数，针对不同的参数类型，有如下的校验和转换规则：

- 如果参数是要传递给系统函数，则可以把校验这一步下沉给系统函数来处理
- 对于 _object、array、function_ 类型的参数，要做强制校验，如果校验失败，对于必传参数来讲就执行异常流程，对于可选参数来讲就设置默认值
- 对于 number、string、boolean 类型的参数，要做自动转换
  - 数字使用 _Number_ 函数进行转换
  - 整数使用 _Math.round_ 函数进行转换
  - 字符串使用 _String_ 函数进行转换
  - 布尔值使用 !! 进行转换
- 对于 _number_ 类型参数，如果转换出来是 _NaN_，那么对于必传参数来讲执行异步流程，对于可选参数来讲就设置默认值
- 对于复合类型的内部数据，也要执行上述流程

## 异常捕获

在设计开源库的时候，异步捕获也是一个非常重要的步骤，也就是说，如果代码内部发生了错误，应该怎么办？

JSON.parse 方法可以将字符串转为 JS 对象，但是传入这个方法的字符串如果不符合 JSON 的语法， 那么最终转换的时候就会报错。那么如果你设计的函数内部用到了这个方法，那么就会有出错的可能性，因此我们需要考虑到这种情况

```js
function safeParse(str, backupData) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return backupData;
  }
}
```

## 安全防护

在设计开源库的时候，由于我们所设计的函数在使用的时候环境未知，所以你不能够想当然的认为会发生什么，正确思路是需要防患于未然，各种意外的情况都需要考虑到，对你所设计的函数做一些安全上面的防护措施。

**最小功能设计**

开源库应该对外提供最小的功能，尽可能隐藏内部的实现细节，不相关的功能不要向外暴露，一旦某个接口决定向外暴露，那么这个接口就是对外的一种承诺，承诺暴露出来的接口会一直维护，并且永久向下兼容。

这里我们来看一个例子：

例如我这里有一个叫做 guid 的函数，该函数每调用一次，就会生成一个唯一的 ID，内部依赖一个计数器来实现

```js
export let count = 1;
export function guid() {
  return count++;
}
```

在上面的例子中，count 就没有暴露的必要，它应该是属于模块内部的数据。

再例如：

```js
class Guid {
  count = 1;
  guid() {
    return this.count++;
  }
}

const g = new Guid();
g.count = "xxx"; // 直接修改了内部 count，导致代码报错
```

这里应该考虑将这个属性设置为私有属性。

关于类的私有属性，社区方面一直在进行探索，之前的方案是通过添加一个下划线前缀来表示这是一个私有属性，但是这种方式归根结底只是一种约定而已

```js
class Guid {
  _count = 1;
}
```

目前更好的做法，是将私有属性放置到 constructor 里面：

```js
class Guid {
  constructor() {
    let count = 1;
    this.guid = () => {
      return count++;
    };
  }
}
```

现在已经有了更好的做法，ES2022 里面正式提供了私有属性的标志符，通过一个 # 号表示私有属性。

```js
class Guid {
  #count = 1;
  constructor() {
    this.guid = () => {
      return this.#count++;
    };
  }
}
```

**最小参数设计**

参数的个数不要太多，尽量保证在 3 个以内，参数的类型尽可能是简单类型，如果是复杂（引用）类型，尽量不要修改传入的参数，而是在传入的参数的基础上，复制一份，再进行操作。

举个例子，fill 函数可以实现用指定的值来填充数组：

```js
function fill(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = value;
  }
  return arr;
}
```

上面的这种设计，虽然也能够达到目的，但是对原来传入的数组进行了填充修改，这可能不是使用者所期望的。

更理想的方式，对传入的参数进行一个复制，例如：

```js
function fill(arr, value) {
  const newArr = clone(arr); // 假设这里的 clone 是一个深度克隆方法
  for (let i = 0; i < newArr.length; i++) {
    newArr[i] = value;
  }
  return newArr;
}
```

**对象的冻结**

暴露出去的接口可能会被使用者有意或者无意的进行修改，导致开源库在开发阶段都是运行良好的，但是在某些情况下就出错了。

```js
import $ from "jquery";
$.version = undefined; // 外部代码修改 $ 对象的属性
$.version.split("."); // 正常代码因为上面的那一行代码导致报错
```

这种时候，我们就可以对对象进行一个冻结，常见的冻结方法：

| 方法                       | 修改原型指向 | 添加属性 | 修改属性配置 | 删除属性 | 修改属性 |
| :------------------------- | :----------- | :------- | :----------- | :------- | :------- |
| _Object.preventExtensions_ | 否           | 否       | 是           | 是       | 是       |
| _Object.seal_              | 否           | 否       | 否           | 否       | 是       |
| _Object.freeze_            | 否           | 否       | 否           | 否       | 否       |

因此我们这边就可以采用这些方法来对对象进行一个冻结：

```js
import $ from "jquery";
Object.freeze($);
$.version = undefined;
```

在上面的代码中，我们针对 $ 进行了冻结，冻结的对象属性是无法修改的。如果尝试修改，那么在严格模式下会报错，在非严格模式下会静默失败。

## 避免原型入侵

JavaScript 是基于原型来实现的面向对象，因此我们在设计方法的时候要避免在标准库的对象原型上面（Array.prototype、Object.prototype...）添加方法，因为一旦你这么做，就会影响所有的对象。

```js
Object.prototype.tree = function () {
  console.log(Object.keys(this));
};

const obj = {
  a: 1,
  b: 2,
};

obj.tree(); // ['a', 'b']
```

一旦你这么做，就会给所有的对象都增加一个可枚举的方法，通过 for in 进行遍历的时候，就会多这么一个方法出来。

另外还会带来一个问题，可能会存在冲突的问题。不同的库可能会扩展同名的方法，一旦冲突的方法实现不一致，此时就会导致必然会有一个库的代码会失效。

这样的做法实际上也被称之为猴子补丁（monkey-patching），在社区里面已经达成了一个共识“不要耍流氓，不是你的对象你不要动手动脚的”。

更好的方式就是常见一个新的构造函数去继承你想要的修改的构造函数，例如：

```js
class myNum extends Number {
  constructor(...args) {
    super(...args);
  }
  isEven() {
    return this % 2 === 0;
  }
}
const i = new myNum(42);
// 无论是新类添加的方法还是 Number 类里面的方法都可以使用
console.log(i.isEven()); // true
console.log(i.toFixed(2)); // 42.00
```

以前前端在原型入侵上面是有先例的（bad case），前端库 Mootools 和 prototype.js 这两个库都对标准库对象的原型进行了扩展。这两个库当时都给数组扩展了一个名为 flatten 的方法（拍平多维数组），但是这两个库在方法的实现上面是不一致的，这就带来了冲突，冲突的结果就是如果你同时引入这两个库，就必然有一个库的代码会失效。

而且这种做法还影响到了 ES 规范，我们知道 ES6 目前提供了一个叫做 Array.prototype.flat 的方法（数组拍平），关于这个方法当时 ECMA 委员会实际上是想要叫做 flatten，但是由于和 Mootools 和 prototype.js 这两库的 flatten 方法重名了，又由于这两个库的使用者众多，因此最终被迫改了名字叫做 flat。

## 总结

本小节我们主要介绍了在设计 _JavaScript_ 库时的一些注意点，我们从下面的 _5_ 个点进行了介绍：

- 函数的设计
  - 函数主要就是需要注意函数三要素：函数名、函数参数、返回值
  - 函数名要力求准确无误，最好能够通过函数名就知道该函数的作用
  - 参数的个数尽量控制在 _1-3_ 个以内，如果是复杂类型的参数，最好不要修改原来的参数
  - 返回值尽量保持和传入的参数相同的类型
- 提高健壮性
  - 需要对参数做一些防御性的措施，特别是在类型上面的判断
- 异常捕获
  - 需要考虑到出错时的备选方案，特别是封装的函数中调用了其他函数时，尤其需要考虑出现异常的情况下应该怎么做
- 安全防护
  - 不需要向外暴露的功能，就不要向外暴露
  - 一旦向外暴露了，就是对外的一种承诺，暴露的接口一般都是会持续维护并且永久向下兼容的
  - 目前 _ES2022_ 开始已经正式支持私有属性了
- 避免原型入侵
  - 避免“猴子补丁”的做法，“别耍流氓，不是你的对象别动手动脚”

# 项目开发与测试

首先第一步我们需要给我们的开源库取一个名字，但是有一个注意点，那就是去 npm 官网：https://www.npmjs.com/

查询一下名字是否已经存在，如果和 npm 上面已经发布的包重名的话，是不允许发布上去的，因此在取名的时候需要注意这一点。

这里我们将开源库命名为 jstoolpack（已经查询过，目前 npm 上面没有）

## 搭建项目

```bash
mkdir jstoolpack
cd jstoolpack
npm init -y
```

接下来需要安装一些依赖：

```js
"devDependencies": {
    "@types/jest": "^29.5.1",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0",
    "ts-jest": "^29.1.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.4"
}
```

```js
npm i @types/jest jest jest-environment-jsdom ts-jest ts-node typescript -D
```

接下来在项目根目录下面创建 src（源码目录）以及 tests（测试目录），本次项目开发我们打算采用 TDD 的模式进行开发。

项目本身不难，该项目是一个类似于 lodash 的工具库项目，会对常见的 array、function、string、object 等提供一些工具方法。

## array

这里我们打算扩展一个名为 range 的方法，该方法可以生成指定范围的数组：

```js
range(1, 6) ---> [1, 2, 3, 4, 5] 左闭右开
range(1, 6, 2) ---> [1, 3, 5]
range(1, 6, -2) ---> [1, 3, 5]

range(6, 1) ---> [6, 5, 4, 3, 2]
range(6, 1, -2) ---> [6, 4, 2]
range(6, 1, 2) ---> [6, 4, 2]
```

对应的源码如下：

```ts
// 理论上来讲，start,stop,step 都应该是 number 类型
// 但是我们的代码最终是打包为 js 给开发者使用
// 开发者可能会存在各种非常的调用 range() range('a','b','c')
// 因此我们这里打算从方法内部进行参数防御，从而提升我们代码的健壮性
export function range(start?: any, stop?: any, step?: any) {
  // 参数防御
  start = start ? (isNaN(+start) ? 0 : +start) : 0;
  stop = stop ? (isNaN(+stop) ? 0 : +stop) : 0;
  step = step ? (isNaN(+step) ? 0 : +step) : 1;

  // 保证 step 的正确
  if ((start < stop && step < 0) || (start > stop && step > 0)) {
    step = -step;
  }

  const arr: number[] = [];
  for (let i = start; start > stop ? i > stop : i < stop; i += step) {
    arr.push(i);
  }

  return arr;
}
```

对应的测试代码如下：

```ts
import { range } from "../src/array";

test("正常的情况", () => {
  expect(range(1, 6)).toEqual([1, 2, 3, 4, 5]);
  expect(range(1, 6, 2)).toEqual([1, 3, 5]);

  expect(range(6, 1)).toEqual([6, 5, 4, 3, 2]);
  expect(range(6, 1, -2)).toEqual([6, 4, 2]);
});

test("错误的情况", () => {
  expect(range()).toEqual([]);
  expect(range("a", "b", "c")).toEqual([]);
});

test("测试只传入start", () => {
  // 相当于结束值默认为 0
  expect(range(2)).toEqual([2, 1]);
  expect(range(-2)).toEqual([-2, -1]);
});

test("测试step", () => {
  expect(range(1, 6, -2)).toEqual([1, 3, 5]);
  expect(range(6, 1, 2)).toEqual([6, 4, 2]);
});
```

## string

这里我们打算提供了一个 truncate 的方法，有些时候字符串过长，那么我们需要进行一些截取

```js
truncate("1231323423424", 5) ----> 12...
truncate("12345", 5) ----> 12345
truncate("1231323423424", 5, '-') ----> 1231-
```

对应的源码如下：

```ts
export function truncate(str?: any, len?: any, omission = "...") {
  // 内部来做参数防御
  str = String(str);
  omission = String(omission);
  len = len ? Math.round(len) : NaN;

  if (isNaN(len)) {
    return "";
  }

  if (str.length > len) {
    // 说明要开始截断
    str = str.slice(0, len - omission.length) + omission;
  }

  return str;
}
```

对应的测试代码如下：

```ts
import { truncate } from "../src/string";

test("应该将字符串截取到指定长度", () => {
  expect(truncate("Hello World", 5)).toBe("He...");
  expect(truncate("Hello World", 10)).toBe("Hello W...");
  expect(truncate("Hello World", 11)).toBe("Hello World");
  expect(truncate("Hello World", 15)).toBe("Hello World");
  expect(truncate("1231323423424", 5)).toBe("12...");
  expect(truncate("12345", 5)).toBe("12345");
  expect(truncate("1231323423424", 5, "-")).toBe("1231-");
});

test("如果长度参数不是一个数字，那么返回一个空字符串", () => {
  expect(truncate("Hello World", NaN)).toBe("");
  expect(truncate("Hello World", "abc" as any)).toBe("");
});

test("应该正确处理空字符串和未定义的输入", () => {
  expect(truncate("", 5)).toBe("");
  expect(truncate(undefined, 5)).toBe("un...");
});

test("应该正确处理省略号参数", () => {
  expect(truncate("Hello World", 5, "...")).toBe("He...");
  expect(truncate("Hello World", 10, "---")).toBe("Hello W---");
});

test("始终应该返回一个字符串", () => {
  expect(typeof truncate("Hello World", 5)).toBe("string");
  expect(typeof truncate("Hello World", NaN)).toBe("string");
  expect(typeof truncate(undefined, 5)).toBe("string");
});
```

## function

函数防抖是一个很常见的需求，我们扩展一个 debounce 方法，可以对传入的函数做防抖处理

对应的代码如下：

```ts
type FuncType = (...args: any[]) => any;
export function debounce<T extends FuncType>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>): void {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
```

对应的测试代码如下：

```ts
import { debounce } from "../src/function";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

test("应该在等待时间之后调用函数", () => {
  const func = jest.fn();
  const debouncedFunc = debounce(func, 1000);

  debouncedFunc();
  jest.advanceTimersByTime(500);
  expect(func).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(500);
  expect(func).toHaveBeenCalledTimes(1);
});

test("当防抖函数执行的时候，始终只执行最后一次的调用", () => {
  const func = jest.fn();
  const debouncedFunc = debounce(func, 1000);

  debouncedFunc("a");
  debouncedFunc("b");
  debouncedFunc("c");

  jest.advanceTimersByTime(1000);
  expect(func).toHaveBeenCalledWith("c");
});

test("在等待时间内又调用了函数，重置计时器", () => {
  const func = jest.fn();
  const debouncedFunc = debounce(func, 1000);

  debouncedFunc();
  jest.advanceTimersByTime(500);

  debouncedFunc();
  jest.advanceTimersByTime(500);
  expect(func).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(1000);
  expect(func).toHaveBeenCalledTimes(1);
});
```

# 开源协议和准备工作

目前我们的公共库在代码层面的工作已经完成，但是在发布之前还需要做一些额外的准备工作：

- 开源协议
- 文档相关的准备工作

## 开源协议

首先我们需要选择一个合适的开源协议，目的是为了明确的声明自己的权利。如果没有开源协议，那么可能面临如下两种情况：

- 可能是会被认为放弃所有权利，此时可能就会被别有用心的人钻了空子，如恶意剽窃、抄袭等，这会损坏库开发者的利益
- 可能是会被认为是协议不明，一般商业项目都会很小心地选择使用的库，如果缺少协议，则一般不会使用，这会让我们的库损失一部分使用者

开源协议有很多，常用的有 GPL、LGPL、MIT、BSD、Apache，前端项目常用的开源协议就是后面三个。关于各种开源协议之间的区别，你可以参阅：https://choosealicense.com/

下面的这张表简单的对比了一下几种协议之间的区别：

|              | _MIT_ | _BSD_ | _Apache_ |
| ------------ | ----- | ----- | -------- |
| 商业用途     | ✅    | ✅    | ✅       |
| 可以更改     | ✅    | ✅    | ✅       |
| 可以分发     | ✅    | ✅    | ✅       |
| 授予专利许可 |       |       | ✅       |
| 私人使用     | ✅    | ✅    | ✅       |
| 商标使用     |       |       | ❌       |
| 承担责任     | ❌    | ❌    | ❌       |

还有一个更简便的方法，那就是看一些知名项目（Vue、React、Angular）它们所选择的协议是什么。

| 协议     | 项目                                          |
| -------- | --------------------------------------------- |
| _MIT_    | _jQuery、React、Lodash、Vue、Angular、ESLint_ |
| _BSD_    | _Yeoman、node-inspector_                      |
| _Apache_ | _Echarts、Less.js、math.js、TypeScript_       |

> 目前前端领域，一般还是使用 MIT 和 Apache 协议的居多。

一般来讲，公共库会选择 MIT 协议。首先在项目根目录下面新建一个 LICENSE 文件

```bash
touch LICENSE
```

接下来往 LICENSE 文件中记入如下的内容：

```
MIT License

Copyright (c) 当前年份 开发者名字

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 文档相关的准备工作

一般来讲，一个合格的库，应该包含如下的文档：

- README 文档
- 待办清单
- 变更日志
- API 文档

### README 文档

README 是库的使用者最先看到的内容，README 的好坏直接影响了库使用者的选择，因此在书写 README 文档的时候原则上需要主题清晰，内容简洁。

一个合格的 README 文档一般会包含如下的内容：

- 库的介绍：需要概括你这个库解决了什么样的问题
- 使用者指南：帮助使用者快速了解如何使用你这个库
- 贡献者指南：会罗列出这个库所有的贡献者

### 待办清单

待办清单主要使用用来记录即将发布的内容或者未来的计划。待办清单主要有两个目的：

- 告诉库的使用者当前这个库在未来会发布什么样的新功能
- 作为库的开发者的一个备忘，提醒自己将来还需要交付的功能

待办清单也是 md 文件，一般命名为 TODO.md

在 markdown 语法中，支持通过 [ ] 和 [ x ] 来表示未勾选状态和勾选状态

### 变更日志

变更日志用于记录每一个版本更新的时候变更了哪些内容，变更日志的主要目的有两个：

- 一个是方便库的使用者在升级版本时了解不同版本之间的区别，从而避免升级带来的风险
- 方便库的开发者做一个版本变更的备忘录

变更日志一般会记录版本号、变更时间以及具体变更内容，变更内容尽量做到简洁明了。关于如何书写变更日志，可以参阅：https://keepachangelog.com/zh-CN/1.0.0/

一般变更日志叫做 CHANGELOG.md，在进行变更日记的记录时，越新的版本放在越上面。

### API 文档

API 文档理论上来讲越详细越好，因为之后库的使用者通常都是和你的 API 文档打交道，API 文档的好坏会直接影响库使用者的使用体验。

目前来讲，API 文档可以选择如下 3 种方案：

- 功能较少：可以直接写在 README.md 文件里面
- 内容较多：可以单独写一个文件
- API 数量众多（类似于 Vue、React 这种体量的），一个文件也不能够满足需求了，考虑单独做一个网站来提供详细的文档内容

# 开源代码

接下来我们要对我们的工具库做一个开源的操作。

目前 github 是全球最大的开源协作平台，大部分的代码都通过 github 来托管代码，因此我们这里也选择将我们的代码托管到 github 上面。

在做这个事情的时候，会有一些前置要求：

- 你需要会 git 的基本操作
- 需要你在 github 上面注册一个账号

接下来来到 github 官网，登录进去，点击【Your respositories】

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-055533.png" alt="image-20230607135532802" style="zoom:50%;" />

进去之后，点击 【new】来创建一个新的仓库，填写对应的信息，如下图所示：

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-055859.png" alt="image-20230607135858649" style="zoom:50%;" />

创建好远端仓库仓库之后，可以通过两种方式来推拉代码：

- HTTPS
- SSH

## 生成 SSH 密钥对

这里推荐使用 SSH 的方式，这里就需要在你的电脑上面生成一个 SSH 的公钥和私钥。公钥上传到 github 上面，私钥自己保留在本地。

这里可以通过一个命令来生成 SSH 的公钥和私钥：

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

操作如下：

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-060538.png" alt="image-20230607140537849" style="zoom:50%;" />

接下来在对应的目录就能够看到新生成的 SSH 密钥对。如下图所示：

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-060710.png" alt="image-20230607140710040" style="zoom:50%;" />

接下来你就需要将公钥上传到 github 上面，在 github 网页中点击 【settings】，然后点击【SSH and GPG keys】

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-060902.png" alt="image-20230607140901746" style="zoom:50%;" />

添加新的 SSH 公钥到 github 里面

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-061120.png" alt="image-20230607141120584" style="zoom:50%;" />

至此，我们就成功的新生成了一对 SSH 密钥对，并且将公钥上传到了 github 上面，这意味着之后我们在推拉代码的时候可以通过 SSH 的方式来进行代码的推拉。

## 推送代码

接下来我们要把我们的 jstoolpack 推送到 github 上面，因为这是一个已有的代码库，但是并没有用 git 进行初始化，因此首先要做的第一步就是使用 git 来初始化仓库。

```bash
git init
```

初始化完成后，就会看到在 jstoolpack 根目录下面有一个 .git 目录，说明现在的 jstoolpack 已经成功的被初始化为了一个代码仓库。

在推送代码之前，还有一个步骤非常重要，你需要确定哪些代码不需要提交到 github，例如 node_modules、coverage、dist 这些目录都是不需要提交到远端仓库的，可以创建一个名为 .gitignore 的文件来记录哪些目录和文件不需要提交。

示例如下：

```
node_modules
coverage
# dist 目录下存放构建代码
dist
```

准备妥当之后，接下来就可以开始推送我们的代码了：

```bash
git remote add origin git@github.com:xj89959853/jstoolpack.git
git branch -M main
git push -u origin main
```

具体操作如下图所示：

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-062554.png" alt="image-20230607142554008" style="zoom:50%;" />

注意事项：在进行远端仓库推送之前，要保证本地的代码仓库的工作区是干净的。

推送之后，重新刷新 github 的远端仓库页面，如下图所示：

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-062844.png" alt="image-20230607142844417" style="zoom:50%;" />

至此，我们的代码开源工作就结束了。

# 发布代码

上一节课我们已经将我们的代码开源到了 github 上面，但是如果是其他开发者想要使用我们的库，还需要去 github 上面手动下载下来，添加到他们的项目里面，这样是非常低效的一种方式。

npm 的出现解决了这个问题，npm 是前端领域非常出名的一个包的托管平台，提供了代码的托管和检索以及下载安装功能。

注意同样都是托管代码，github 和 npm 的分工是非常明确的

- github 托管的是项目、库的源码，供其他开发者可以查阅我们的源代码
- npm 托管的是项目或者库打包之后的代码，向 npm 上传代码的时候，我们上传了什么文件，回头其他开发者通过 npm i 安装的时候就会得到对应的文件，npm 在进行代码托管的时候，一般不会上传源码，而是上传打包后的代码

因此这里我们将我们的代码发布到 npm 上面的时候，会分为如下的两个步骤：

- 打包代码
- 发布前准备
- 进行发布

## 打包代码

这里我们选择使用轻量级的 rollup 来进行代码的打包。首先安装如下的依赖

```bash
npm install --save-dev rollup rollup-plugin-typescript2 rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-terser
```

注意这些依赖都是开发依赖。

安装完毕之后，在项目根目录下面创建一个 rollup 的配置文件 rollup.config.js，配置如下：

```js
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

// 配置选项数组
const outputConfigs = [
  {
    // 打包为 commonjs 模块
    file: "dist/index.common.js", // 类似于 webpack 的 output
    format: "cjs", // 打包为 commonjs 模块
    exports: "default",
  },
  {
    // 打包为 ESM 模块
    file: "dist/index.esm.js", // 类似于 webpack 的 output
    format: "es", // 打包为 ESM 模块
    exports: "named",
  },
  {
    // 打包为 umd 模块，方便在浏览器里面使用
    file: "dist/index.js",
    format: "umd",
    name: "jstp",
    exports: "default",
  },
];

export default outputConfigs.map((config) => ({
  input: "src/index.ts", // 入口文件，类似于 webpack 的 input
  output: {
    ...config,
  },
  plugins: [typescript(), resolve(), commonjs(), terser()],
}));
```

需要在 src 下面指定一个入口文件，所以我们创建了一个 index.ts，代码如下：

```ts
import { range } from "./array";
import { debounce } from "./function";
import { truncate } from "./string";

export default {
  range,
  debounce,
  truncate,
};
```

另外在 tsconfig.json 中也要做一定配置修改：

- "target": "ESNext",
- "module": "ESNext",

## 发布前的准备

首先就是需要对 package.json 进行一个配置，发布代码的时候，不是说所有的代码都需要发布，往 npm 发布代表的时候，应该只发布打包后的代码，这里有两种方式：

- 黑名单
- 白名单

黑名单方式类似于 .gitignore 的方式，创建一个 .npmignore，回头记录在这个文件里面的目录或者文件就不会被发布到 npm 上面

```
# .npmignore
src
tests
```

但是使用黑名单的方式有一个问题就是在项目中当我们新增了一些文件或者目录的时候，.npmignore 也需要做出相应的修改。有些时候会忘记修改 .npmignore 文件，导致一些不必要的文件或者目录被发布到 npm 上面去。

更加推荐的是白名单方式，在 package.json 文件中添加 files 字段，只有 files 字段里面的文件或者目录才会被发布到 npm 上面去。

```json
"files": [
    "/dist",
    "LICENSE"
],
```

白名单配置完成后，我们还需要做两件事情：

- 包的说明信息
  - 包的名字
  - 包的版本
  - 包的描述
  - 包的作者
- 包的入口文件

示例如下：

```json
{
  "name": "jstoolpack",
  "version": "1.0.0",
  "description": "This is a JavaScript function library, primarily aimed at learning and communication.",
  "main": "dist/index.common.js",
  "module": "dist/index.esm.js",
  "browser": "dist/index.js"
}
```

## 进行发布

在发布之前，你需要确保镜像是指向 npm 的。

- npm config get registry：查看当前的镜像源，需要保证为 https://registry.npmjs.org/
- npm config set registry=xxxx ： 设置镜像源

```bash
npm config set registry=https://registry.npm.taobao.org ：这是镜像源为淘宝
npm config set registry=https://registry.npmjs.org ：设置镜像源为 npm 官网的镜像
```

接下来需要你在 npm 上面有一个账号，注意在注册账号的时候，把邮箱一起认证，因为后邮箱需要接收验证码。

账号注册完成后，可以通过 npm login 进行一个登录，具体操作如下图所示：

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-075221.png" alt="image-20230607155220476" style="zoom:50%;" />

最后一步就是通过 npm publish 进行发布即可。注意发布之前也要确保工作区是干净的。具体操作如下图所示：

<img src="https://resource.duyiedu.com/xiejie/2023-06-07-075420.png" alt="image-20230607155419846" style="zoom:50%;" />

至此我们的 jstoolpack 这个工具库就成功的在 npm 上面发布了。

# 搭建文档网站

创建 API 文档可以选择如下的 3 种方式：

- 功能较少，可以直接写在 README.md 文件里面
- 内容较多，可以单独写一个文件
- API 数量众多（Vue、React 这种级别），需要考虑单独拿一个网站来做详细的文档支持

这里我们要搭建的网站实际上就是一个文档网站，这个时候我们可以选择静态站点生成器。这些生成器一般都是支持以 markdown 文件为主来编写和组织文档， 主打的就是一个“快”。

目前常见的静态站点生成器，有 vuepress、vitepress、docusaurus

- _Docusaurus_：_Facebook_ 维护的文档生成工具，基于 _React_，对于了解 _React_ 的开发者，可以很方便的进行二次开发
- _Vuepress_：由 _Vue_ 作者尤雨溪所开发的，使用 _Vue_ 来驱动的静态网站生成器。
- _Vitepress_：在 _Vuepress_ 基础上的一次升级，利用 _Vite_ 的能力，为开发者提供了出色的开发体验。

## vitepress

_VitePress_ 是一个基于 _Vite_ 的静态站点生成器，主要用于构建和开发文档型网站。_VitePress_ 提供了一个轻量级、高性能的开发环境，可以让你快速地构建和发布静态站点。它是由 _Vue.js_ 的作者尤雨溪创建的，与 _VuePress_ 类似，但在性能和开发体验上有所提升。

官网地址：https://vitepress.dev/

_VitePress_ 的主要特点包括：

- 基于 _Vite_： _Vite_ 是一个新一代的前端构建工具，提供了快速的开发服务器和优化的构建。_VitePress_ 利用 _Vite_ 的能力，为开发者提供了出色的开发体验。

- _Markdown_ 支持： _VitePress_ 使用 _Markdown_ 作为内容格式，可以非常方便地编写和组织文档。它还支持 _Vue.js_ 组件，这意味着你可以在 _Markdown_ 文件中直接使用 _Vue_ 组件，从而轻松地创建交互式文档。

- 主题系统： _VitePress_ 支持自定义主题，你可以轻松地创建一个独特的、符合你需求的网站。_VitePress_ 还内置了一个默认主题，提供了基本的导航和搜索功能，使你可以快速地开始搭建网站。

- 扩展性： _VitePress_ 支持插件系统，可以通过插件扩展其功能。开发者可以编写自己的插件，或使用现有的插件来增强 _VitePress_ 的功能。

- _SEO_ 友好： _VitePress_ 生成的静态站点具有良好的搜索引擎优化（ _SEO_ ）特性，有利于提高网站的搜索排名。

接下来我们就来快速上手，使用 vitepress 搭建一个静态文档网站。

例如在桌面上创建一个名为 jstoolpackapi 的目录，然后 cd 到该目录，执行如下的指令：

```bash
npx vitepress init
```

之后需要进行些许的配置，具体操作可以参考下图：

<img src="https://resource.duyiedu.com/xiejie/2023-06-09-021126.png" alt="image-20230609101126429" style="zoom:50%;" />

注意，上面的操作仅仅是将文档项目的架子搭起来，但是内部并没有安装 vitepress，因此我们需要手动的安装 vitepress，命令如下：

```bash
npm install vitepress -D
```

安装的时候注意一下 node.js 的版本要 >= v16

安装完成之后，运行 npm run docs:dev 就能够启动项目了。

## 网站首页

网站首页的布局，是由 docs 下面的 index.md 来决定，如下图所示：

![16861896376800](https://resource.duyiedu.com/xiejie/2023-06-09-021900.jpg)

关于首页具体还支持哪些配置，可以参阅：https://vitepress.dev/reference/default-theme-home-page

## 配置文件

整个 vitepress 都是基于文档来自动生成网站的，也就是说路由的生成都是自动的，我们需要做的仅仅是把文档放到正确的位置即可。

整个项目里面最重要的其实就是配置文件，因为配置文件写好了之后，后面就专注书写文档即可。

关于配置文件里面所支持的配置，可以参阅：https://vitepress.dev/reference/site-config

下面介绍一些重要的配置：

- _Site Metadata_：网站元数据信息，这里可以配置网站的名字、介绍、语言等信息

  ```js
  export default {
    // app level config options
    lang: 'zh-CN',
    title: 'VitePress',
    description: 'Vite & Vue powered static site generator.',
    ...
  }
  ```

- _base_：指定站点的基本路径。如果你的站点部署在一个非根路径下（例如，*https://example.com/docs/* ），你需要设置这个选项。例如：

  ```js
  export default {
    base: "/docs/",
  };
  ```

- _themeConfig_：自定义主题的配置选项。这些选项取决于你使用的主题。默认主题提供了一些常用的配置选项，如导航栏、侧边栏和搜索。例如：

  ```js
  export default {
    themeConfig: {
      logo: "/logo.svg",
      navbar: [
        { text: "Home", link: "/" },
        { text: "Guide", link: "/guide/" },
        { text: "GitHub", link: "https://github.com/your/repo" },
      ],
      sidebar: [
        { text: "Introduction", link: "/intro" },
        { text: "Getting Started", link: "/getting-started" },
      ],
      socialLinks: [
        { icon: "github", link: "https://github.com/vuejs/vitepress" },
      ],
    },
  };
  ```

  刚才我们在创建项目时，选择了默认主题，关于默认主题支持的配置，可以参阅：*https://vitepress.dev/reference/default-theme-config*

## Frontmatter

整个网站是基于 markdown 文档的，但是和普通的 markdown 文档相比，需要有一个 frontmatter，frontmatter 采用的是 yaml 的格式，主要是针对这个 markdown 做一些元数据信息补充。

```yaml
---
title: "Ajax 编程"
description: "Ajax 是 Asynchronous JavaScript XML 的缩写，被译为异步 JavaScript 和 XML。Ajax 本身并不是一个新技术，而是一个在 2005 年被 Jesse James Garrett 提出的新术语，用来描述一种使用现有技术集合的“新”方法。"
prev:
  text: "关于域名你需要知道的"
  link: "./关于域名你需要知道的.md"
next:
  text: "HTTP 协议介绍"
  link: "./HTTP 协议介绍.md"
---
```

关于 frontmatter 具体支持的配置项目，可以参阅：https://vitepress.dev/reference/frontmatter-config

## 快速上手案例

我们来快速的搭建一个类似于官网文档结构的文档网站。

首先第一步，你需要有一些文档，因为我们之前配置了 docs 作为我们的文档目录，因此我们需要将所有的文档有层次的放入到 docs 里面。目前我们的 docs 的文档目录如下图所示：

<img src="https://resource.duyiedu.com/xiejie/2023-06-09-024255.jpg" alt="16861924893820" style="zoom:50%;" />

文档有了之后，接下来修改配置文件，进行如下的配置：

```ts
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "jstoolpack",
  description: "this is jstoolpack api website",
  lang: "zh-CN",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 上面的导航
    nav: [
      { text: "Guide", link: "/guide/introduction/what-is-vitepress" },
      { text: "Reference", link: "/reference/api/configuration-api" },
    ],

    // 侧边栏
    // 根据不同的 nav 来配置专属的侧边栏
    sidebar: {
      // 为 "/guide/" 路径配置专属的侧边栏
      "/guide/": [
        {
          text: "Introduction",
          collapsed: true,
          items: [
            {
              text: "What is VitePress?",
              link: "/guide/introduction/what-is-vitepress",
            },
            {
              text: "Getting Started",
              link: "/guide/introduction/getting-started",
            },
          ],
        },
        {
          text: "Writing",
          collapsed: true,
          items: [
            {
              text: "Markdown Features",
              link: "/guide/writing/markdown-features",
            },
            {
              text: "Using Vue in Markdown",
              link: "/guide/writing/using-vue-in-markdown",
            },
          ],
        },
        {
          text: "Customization",
          collapsed: true,
          items: [
            {
              text: "Config Reference",
              link: "/guide/customization/config-reference",
            },
            {
              text: "Theme Development",
              link: "/guide/customization/theme-development",
            },
          ],
        },
      ],
      // 为 "/reference/" 路径配置专属的侧边栏
      "/reference/": [
        {
          text: "API Reference",
          collapsed: true,
          items: [
            { text: "Runtime API", link: "/reference/api/runtime-api" },
            {
              text: "Configuration API",
              link: "/reference/api/configuration-api",
            },
          ],
        },
        {
          text: "Plugin Reference",
          collapsed: true,
          items: [
            {
              text: "Creating Plugins",
              link: "/reference/plugins/creating-plugins",
            },
            { text: "Using Plugins", link: "/reference/plugins/using-plugins" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
```

主要就是修改 nav 和 sidebar，和 docs 里面的目录结构要对应上。

# 部署文档网站

关于部署网站，理论上来讲，只要你有一个服务器，你要采用什么样的方式来部署都是可以的。但是前提是你需要有一个服务器（物理机、云服务器）。

这节课我们部署文档网站选择使用 github 来进行部署，因为 GitHub 为我们提供了一个免费的服务器，一个账号只有一个，只要你在 GitHub 上面有账号，你就能够轻松的创建一个免费的网站，这个免费的网站就特别适合拿来做个人博客、个人简历、文档网站。

要使用 github 来创建免费网站，有两个概念大家需要稍做了解：

- github pages
- github action

**github pages**

这是其实就是 github 所提供的一个免费的静态网站托管服务，它允许你将你的 html、css 和 js 托管到 github 仓库里面，之后会将这个仓库作为一个网站提供给访问者，这个 github pages 托管服务，一个账号只能对应一个网站，这个网站就特别适合拿来做个人博客、项目文档、简历等静态网站。

官网地址如下：https://pages.github.com/

_GitHub Pages_ 的特点：

- 免费：对于公开仓库，_GitHub Pages_ 提供免费的静态网站托管服务。
- 支持自定义域名：可以将您自己的域名与 _GitHub Pages_ 网站关联。
- _HTTPS_ 支持：_GitHub Pages_ 支持 _HTTPS_，确保您的网站内容在传输过程中受到保护。
- 简单的部署：只需将静态文件推送到 _GitHub_ 仓库，_GitHub Pages_ 就会自动部署并更新您的网站。

**github action**

这是是一个自动化工具，允许你在 github 仓库里面定义你的工作流并且执行。有了这个工具之后，可以让我们在代码推送、拉取请求、issue 创建等工作全部实现自动化，自动执行构建、测试、部署等任务

官网地址如下：https://github.com/features/actions

_GitHub Actions_ 的特点：

- 集成在 _GitHub_ 中：无需使用第三方 _CI/CD_ 工具，直接在 _GitHub_ 仓库中管理和执行自动化任务。
- 可定制：您可以创建自己的工作流，定义一系列的步骤和任务，根据项目需求进行调整。
- 支持多种语言和平台：_GitHub Actions_ 支持各种编程语言和操作系统，包括 _Windows、macOS_ 和 _Linux_。
- 可扩展性：可以使用 _GitHub_ 社区提供的大量预构建 _Actions_，也可以创建自己的 _Actions_。

## 部署实战

首先第一步，我们需要将上节课的文档项目变为一个代码仓库

```bash
git init
```

接下来在项目根目录下面创建一个名为 .gitignore 的文件，该文件会记录不需要上传到远端仓库的目录或者文件

```
# 记录不需要上传到远端仓库的目录或者文件
node_modules
```

接下来我们就需要来定义我们的工作流，在项目根目录下面创建一个 .github/workflows 目录，在该目录中创建一个名为 deploy.yml 部署文件，该文件内部就会记录我们的工作流

```yaml
name: Deploy
on:
  workflow_dispatch: {}
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: npm
      - run: npm ci
      - name: Build
        run: npm run docs:build
      - uses: actions/configure-pages@v2
      - uses: actions/upload-pages-artifact@v1
        with:
          path: docs/.vitepress/dist
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v1
```

- name：该工作流的名称，这里我们的名称叫做 Deploy
- on：定义触发工作流的事件，在上面的例子中，工作流会在以下情况触发：
  - 当你手动触发时
  - 当你推送代码到 main 分支的时候
- jobs：定义要运行的一组任务
  - deploy：表示要运行一个名为 deploy 的任务
    - runs-on：定义你的任务是在哪种类型的机器上面运行
    - permissions：工作流需要的权限
    - environment：运行工作流的环境
    - steps：定义任务中要执行的一系列任务
      - 第一步：使用 actions/checkout@v3 操作检出您的仓库。
      - 第二步：使用 actions/setup-node@v3 操作设置指定版本的 Node.js 环境。这里是使用 Node.js 16 和 npm 缓存。
      - 第三步：运行 npm ci 命令以安装项目依赖项。
      - 第四步：运行名为 "Build" 的步骤，执行 npm run docs:build 命令以构建文档。
      - 第五步：使用 actions/configure-pages@v2 操作配置 GitHub Pages。
      - 第六步：使用 actions/upload-pages-artifact@v1 操作将构建产物（位于 docs/.vitepress/dist 目录下）上传为工作流制品。
      - 第七步：运行名为 "Deploy" 的步骤，使用 actions/deploy-pages@v1 操作部署文档到 GitHub Pages。并使用 id 参数将此步骤的 ID 设置为 "deployment"，以便在后续步骤中引用。

任务流文件准备好了之后，我们就可以开始准备推送了。在推送之前还有两个工作需要做：

- 确保文档项目没有问题
- 确保代码仓库工作区是干净的

接下来我们需要来到 github 官网，创建一个名为 username.github.io 的仓库，注意将 username 替换为你 github 账号的 username

<img src="https://resource.duyiedu.com/xiejie/2023-06-09-033447.png" alt="image-20230609113447037" style="zoom:50%;" />

仓库创建好之后，通过如下的命令将我们本地的仓库推送到远端仓库：

```bash
git remote add origin git@github.com:xj89959853/xj89959853.github.io.git
git branch -M main
git push -u origin main
```

推送到远端仓库之后，github actions 就会根据我们的工作流配置文件自动的执行任务流，你可以在 actions 面板看到对应的执行进度

![image-20230609114314960](https://resource.duyiedu.com/xiejie/2023-06-09-034315.png)

点击 【pages build and deployment】，里面就可以看到部署的网站链接

![image-20230609114407385](https://resource.duyiedu.com/xiejie/2023-06-09-034408.png)

# 补充内容

目前我们的 github 账号是一个普通的用户站点，而非项目站点。如果是用户或者组织站点，需要将内容部署在默认的 master 或者 main 分支的根目录下面。

因此我们需要确保最终我们打包好了的内容部署到站点的根目录下面。

所以这里我对工作流文件做了一些更新：

```yaml
name: Deploy
on:
  workflow_dispatch: {}
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: npm
      - run: npm ci
      - name: Build
        run: npm run docs:build
      - name: Move built files to root directory and clean up
        run: |
          rm -rf guide reference
          mv docs/.vitepress/dist/* ./
          rm -rf docs/.vitepress/dist
      - uses: actions/configure-pages@v2
      - uses: actions/upload-pages-artifact@v1
        with:
          path: ./
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v1
```

工作流文件修改完毕后，还是一样的步骤，首先提交工作区，让工作区变得干净，然后通过：

```bash
git push -u origin main
```

提交到远端仓库。

注意有些时候你可能会面临这么一种情况，已经提交了新的任务流文件，在 Actions 面板，看到所有的任务也已经运行完毕了，但是仍然是 404

- 清除一下浏览器的缓存
- 重新触发工作流

![image-20230609143500096](https://resource.duyiedu.com/xiejie/2023-06-09-063500.png)

# Jest 测试 Express 应用

我们这里要测试的项目，是之前 React 篇章中开发的 coderstation 服务器：

- 服务器框架：Express
- 数据库：MongoDB

这里我们针对 Express 服务器端应用进行测试，主要是测试该应用所提供的端口是否能够正常的工作，会连接真实的数据库，这里实际上是属于一个集成测试。

这里在进行测试的时候，需要安装如下的依赖：

```js
npm i jest supertest
```

这里简单的介绍一下 _supertest_，这是一个用于测试 _HTTP_ 服务器的 _Node.js_ 库，它提供了一个高级抽象，让你可以轻松地发送 _HTTP_ 请求并对响应进行断言。_Supertest_ 通常与测试框架（如 _Jest、Mocha_ 等）一起使用，以便编写端到端的 _API_ 测试。

_Supertest_ 的一些主要特点包括：

1. 链式语法：_Supertest_ 使用流畅的链式语法，让你可以轻松地编写和阅读测试代码。例如，你可以通过 ._get_('/') 发送 _GET_ 请求，通过 ._expect_(200) 验证响应状态码等。
2. 内置断言：_Supertest_ 支持许多内置断言，如响应状态码、内容类型、响应头等。你可以使用这些断言来验证 _API_ 响应是否符合预期。
3. 与测试框架集成：_Supertest_ 可以与流行的测试框架（如 _Jest、Mocha_ 等）无缝集成，使你可以使用熟悉的测试工具编写端到端的 _API_ 测试。
4. 支持 _Promises_ 和 _async/await_：_Supertest_ 支持 _Promises_ 和 _async/await_，让你可以编写更简洁、可读的异步测试代码。

官方文档地址：*https://github.com/ladjs/supertest*

安装完依赖之后，在项目的根目录下面创建 tests 目录，用来放置我们的测试文件，接下来就可以针对每一个模块进行一个接口的集成测试。

假设我们这里对 issue 这个模块进行测试，测试代码如下：

```js
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

// 当前测试套件里面的所有的测试用例跑完之后关闭数据库连接
afterAll(async () => {
  await mongoose.connection.close();
});

// 接下来来书写我们的测试用例

test("测试分页获取问题", async () => {
  // act 行为
  const res = await request(app).get("/api/issue").query({
    current: 1,
    pageSize: 5,
    issueStatus: true,
  });

  // assertion 断言
  expect(res.statusCode).toBe(200);
  expect(res.body.data.currentPage).toBe(1);
  expect(res.body.data.eachPage).toBe(5);
  expect(res.body.data.count).toBe(21);
  expect(res.body.data.totalPage).toBe(5);
});

test("根据id获取其中一个问答的详情", async () => {
  const res = await request(app).get("/api/issue/6357abfb37fe7a1aab3aeae8");

  // 进行断言
  expect(res.statusCode).toBe(200);
  expect(res.body.data._id).toBe("6357abfb37fe7a1aab3aeae8");
  expect(res.body.data.issueTitle).toBe(
    "如果遇到组件使用到主题相关颜色一般怎么处理比较好?"
  );
});

test("新增问答", async () => {
  // 这里有一个注意点：
  // 由于我们连接的是真实的数据库，发送的也是真实的请求
  // 因此这里会真实的修改数据库的状态

  // 如果不想真实的数据库受影响：
  // 解决方案：
  // 1. 使用单独的测试数据库（推荐此方案）
  // 2. 使用模拟

  const res = await request(app).post("/api/issue").send({
    issueTitle: "hello",
    issueContent: "thank you",
    userId: "6343d93b0513e856480148c9",
    typeId: "6344fbcd890d0f907da2193e",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.data.issueTitle).toBe("hello");
  expect(res.body.data.issueContent).toBe("thank you");
  expect(res.body.data.scanNumber).toBe(0);
  expect(res.body.data.commentNumber).toBe(0);
  expect(res.body.data.issueStatus).toBe(false);
  expect(res.body.data.userId).toBe("6343d93b0513e856480148c9");
  expect(res.body.data.typeId).toBe("6344fbcd890d0f907da2193e");

  // 新增失败的验证
  const res2 = await request(app).post("/api/issue").send({
    issueTitle: "hello",
    issueContent: "thank you",
  });

  expect(res2.body.code).toBe(406);
  expect(res2.body.msg).toBe("数据验证失败");
  expect(res2.body.data).toBeNull();
});
```

这里面有这么几个注意点：

1. 在测试套件跑完之后，可能会存在一些服务一直处于开启状态，这里我们可以给 jest 添加一个配置

```js
"scripts": {
    // ...
    "test": "jest --detectOpenHandles"
 },
```

添加该配置后，jest 就能够侦查是哪个服务没有在测试跑完后关闭，比如我们上面的例子，就是 mongodb 没有关闭

2. 我们需要在测试完成后，关闭 mongodb 服务，可以在生命周期钩子函数中（afterAll）里面做关闭操作

```js
// 当前测试套件里面的所有的测试用例跑完之后关闭数据库连接
afterAll(async () => {
  await mongoose.connection.close();
});
```

3. 在进行测试的时候，会发送真实的请求，并且会连接真实的数据库，这意味着会更改数据库的状态

如果不想真实的数据库状态受影响，有如下两种方案：

- 使用单独的测试数据库
- 使用模拟方案

推荐使用第一种（测试数据库）方案，因为这里本来就是在做集成测试。

# 手写简易版测试框架

本小节，我将带着大家一些手写一个简易版的测试框架，部分模块为了方便，我们会直接使用 _Jest_ 所提供的模块，通过手写简易版的测试框架，大家能够体会到一个测试框架是如何搭建起来的。

整个书写过程我们会分为如下 _3_ 步骤：

- 获取所有测试文件
- 并行的运行测试代码
- 添加断言

## 获取所有测试文件

首先第一步，我们需要搭建我们的项目，假设我们的测试框架叫做 _Best_，打开终端，输入如下的指令：

```bash
cd desktop
mkdir best
cd best
npm init -y
mkdir tests
echo "expect(1).toBe(2);" > tests/01.test.js
echo "expect(2).toBe(2);" > tests/02.test.js
echo "expect(3).toBe(4);" > tests/03.test.js
echo "expect(4).toBe(4);" > tests/04.test.js
echo "expect(5).toBe(6);" > tests/05.test.js
echo "expect(6).toBe(6);" > tests/06.test.js
touch index.mjs
npm i glob
```

这里我们安装了 _glob_ 这个依赖包，这是一个用于匹配文件路径模式的库。它使开发人员能够使用通配符（例如 \* 和 ?）轻松地查找和匹配文件。

```js
// index.mjs
import { glob } from "glob";

const testFiles = glob.sync("**/*.test.js");

console.log(testFiles); // ['tests/01.test.js', 'tests/02.test.js', …]˝
```

如果你运行上面的代码，会打印出所有的测试文件，当然我们也可以选择使用 _jest-haste-map_ 这个依赖，这是 _Jest_ 测试框架的一个依赖项，提供了一个快速的文件查找系统。它负责构建项目中所有文件及其依赖的映射，以便 _Jest_ 可以快速高效地找到运行测试所需的文件。

```bash
npm i jest-haste-map
```

```js
import JestHasteMap from "jest-haste-map";
import { cpus } from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

// 这行代码使用 import.meta.url 获取当前文件的 URL
// 然后使用 fileURLToPath() 函数将其转换为文件路径
// 最后使用 dirname() 函数获取该文件的目录路径作为项目的根目录。
// console.log(import.meta.url); // file:///Users/jie/Desktop/best-test-framework/index.mjs
const root = dirname(fileURLToPath(import.meta.url));

// 这部分代码定义了一个名为 hasteMapOptions 的对象
// 包含了 jest-haste-map 的配置选项，例如要处理的文件扩展名、工作进程的数量等。
const hasteMapOptions = {
  extensions: ["js"], // 只遍历 .js 文件
  maxWorkers: cpus().length, // 并行处理所有可用的 CPU
  name: "best", // 用于缓存的名称
  platforms: [], // 只针对 React Native 使用，这里不需要
  rootDir: root, // 项目的根目录
  roots: [root], // 可以用于只搜索 `rootDir` 中的某个子集文件
};

// 这行代码使用 JestHasteMap 类创建了一个 hasteMap 实例，并将 hasteMapOptions 对象传递给其构造函数。
const hasteMap = new JestHasteMap.default(hasteMapOptions);
// 这行代码是可选的，用于在 jest-haste-map 版本 28 或更高版本中设置缓存路径。
await hasteMap.setupCachePath(hasteMapOptions);

// 这行代码调用 build() 函数编译项目
// 并从返回的结果中获取 hasteFS 对象，它包含了项目中的所有文件信息。
const { hasteFS } = await hasteMap.build();
// 获取所有的文件
// const testFiles = hasteFS.getAllFiles();
// 我们并不需要获取所有的 js 文件，而是获取 test.js
const testFiles = hasteFS.matchFilesWithGlob(["**/*.test.js"]);

console.log(testFiles);
// ['/path/to/tests/01.test.js', '/path/to/tests/02.test.js', …]
```

至此，我们完成了第一步，获取所有测试文件。

## 并行的读取测试代码

接下来我们进入到第二步，并行的运行所有的测试代码。

```js
// index.mjs
import fs from "fs";

await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    const code = await fs.promises.readFile(testFile, "utf8");
    console.log(testFile + ":\n" + code);
  })
);
```

通过上面的代码，我们读取出了所有测试文件里面所写的内容，但是此时并不是并行执行的，在 _JavaScript_ 中所有的代码都是单线程执行，这意味着在同一个循环中运行测试，它们将无法并发执行。如果我们想要构建一个快速的测试框架，我们需要使用所有可用的 _CPU_。

_Node.js_ 里面有针对 _worker threads_（工作线程） 的支持，这允许在同一个进程中的多个线程并行处理工作。这需要一些样板代码，因此我们将使用 _jest-worker_ 包：

```js
npm i jest-worker
```

除了我们的 _index_ 文件之外，我们还需要一个单独的模块，它知道如何在工作进程中执行测试。让我们创建一个新文件 _worker.js_。

```js
// worker.js
const fs = require("fs");

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");

  return testFile + ":\n" + code;
};
```

```js
// index.mjs
import { runTest } from "./worker.js";

await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    console.log(await runTest(testFile));
  })
);
```

但这还没有实现任何并行操作。我们需要在 _index_ 文件和 _worker_ 文件之间建立连接：

```js
// index.mjs
import { Worker } from "jest-worker";
import { join } from "path";

const worker = new Worker(join(root, "worker.js"), {
  enableWorkerThreads: true,
});

await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    // console.log(await runTest(testFile));
    const testResult = await worker.runTest(testFile);
    console.log(testResult);
  })
);

worker.end(); // Shut down the worker.
```

这段代码通过 _new Worker_ 创建了一个新的 _Worker_ 实例，用于启动一个 _worker.js_ 文件中的工作进程。这里有两个主要部分：

1. _join(root, 'worker.js')_：_join_ 函数来自 _path_ 模块，用于将 _root_ 和 '_worker.js_' 这两个路径片段连接成一个完整的路径。这样，_Worker_ 构造函数就知道在哪里找到 _worker.js_ 文件。
2. { _enableWorkerThreads: true_ }：这是一个配置对象，传递给 _Worker_ 构造函数。_enableWorkerThreads_ 设置为 _true_ 表示启用 _Worker Threads_ 功能。_Worker Threads_ 是 _Node.js_ 中的一个功能，允许在同一个进程中创建多个线程来并行执行任务。这对于充分利用多核 _CPU_ 和提高应用性能非常有用。

```js
// worker.js
exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");
  return `worker id: ${process.env.JEST_WORKER_ID}\nfile: ${testFile}:\n${code}`;
};
```

在 _worker.js_ 中，我们返回一个字符串。这个字符串包含三部分：

- _worker_ 的 _ID_（从环境变量 _process.env.JEST_WORKER_ID_ 获取）
- 测试文件的路径（_testFile_ 变量）
- 文件的内容（_code_ 变量）

## 添加断言

到目前为止，我们已经能够读取到所有的测试文件里面的内容了，接下来就是进行断言，其中有一点就是需要执行测试文件里面的代码，这里我们选择使用 _eval_ 来执行。

```js
// worker.js
exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");
  const testResult = {
    success: false,
    errorMessage: null,
  };
  try {
    eval(code);
    testResult.success = true;
  } catch (error) {
    testResult.errorMessage = error.message;
  }
  return testResult;
};
```

我们对 _runTest_ 做了一些修改，之前仅仅是读取测试文件里面的内容，现在我们通过 _eval_ 进行执行，并且定义了一个 _testResult_ 的对象，用于向外部返回执行的结果。

但是目前执行所有的测试文件，都会遇到错误：_expect is not defined_，如果我们添加 _expect_ 方法的逻辑：

```js
const expect = (received) => ({
  toBe: (expected) => {
    if (received !== expected) {
      throw new Error(`Expected ${expected} but received ${received}.`);
    }
    return true;
  },
});
try {
  eval(code);
  testResult.success = true;
} catch (error) {
  testResult.errorMessage = error.message;
}
return testResult;
```

在上面的代码中，我们增加了一个 _expect_ 方法，该方法返回一个对象，对象里面有一个 _toBe_ 方法用于评判 _received_ 和 _expected_ 是否全等。

现在我们的测试框架已经能够正常运作了，运行 _node index.mjs_ 的结果如下：

```bash
{ success: false, errorMessage: 'Expected 4 but received 3.' }
{ success: false, errorMessage: 'Expected 2 but received 1.' }
{ success: true, errorMessage: null }
{ success: true, errorMessage: null }
{ success: true, errorMessage: null }
{ success: false, errorMessage: 'Expected 6 but received 5.' }
```

但是这看上去不是太友好，我们需要美化一下控制台的输出，这里可以通过 _chalk_ 这个库来做美化

```js
npm i chalk
```

```js
// index.mjs
import { join, relative } from "path";
import chalk from "chalk";

await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    const { success, errorMessage } = await worker.runTest(testFile);
    const status = success
      ? chalk.green.inverse.bold(" PASS ")
      : chalk.red.inverse.bold(" FAIL ");

    console.log(status + " " + chalk.dim(relative(root, testFile)));
    if (!success) {
      console.log("  " + errorMessage);
    }
  })
);
```

在上面的代码中，我们从 _worker.runTest_ 方法中解构出测试文件的执行结果，然后根据测试结果（成功或失败），使用 _chalk_ 库为控制台输出添加颜色和样式。

另外，目前 _expect_ 是我们手动实现的，实际上我们可以使用 _jest_ 提供的 _expect_ 扩展库：

```js
npm i expect
```

```js
// worker.js
const { expect } = require("expect");
```

在 _worker.js_ 中引入 _expect_ 之后，就可以去除掉我们自己实现的 _expect_ 了。

另外我们的测试框架目前还不支持 _mock_ 功能，这个也可以通过 _jest_ 提供的扩展库 _jest-mock_ 来搞定：

```js
npm i jest-mock
```

```js
// worker.js
const mock = require("jest-mock");
```

```js
// mock.test.js
const fn = mock.fn();

expect(fn).not.toHaveBeenCalled();

fn();
expect(fn).toHaveBeenCalled();
```

为了让我们的测试框架支持单独测试某一个测试文件，可以在获取所有测试文件的时候，从命令行参数（_process.argv_）中获取一个可选的文件名模式，然后使用 _hasteFS.matchFilesWithGlob_ 函数匹配满足该模式的测试文件，如下：

```js
// index.mjs
const testFiles = hasteFS.matchFilesWithGlob([
  process.argv[2] ? `**/${process.argv[2]}*` : "**/*.test.js",
]);
```

这样我们就可以在命令行中传入第二个参数，用于指定要执行的测试文件：

```js
node index.mjs mock.test.js
```

另外在测试的时候，如果有失败的测试用例，我们也稍作修饰，给予用户更好的提示：

```js
let hasFailed = false; // 是否有失败
await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    const { success, errorMessage } = await worker.runTest(testFile);
    const status = success
      ? chalk.green.inverse.bold(" PASS ")
      : chalk.red.inverse.bold(" FAIL ");

    console.log(status + " " + chalk.dim(relative(root, testFile)));
    if (!success) {
      hasFailed = true; // 有失败
      console.log("  " + errorMessage);
    }
  })
);

worker.end(); // Shut down the worker.
// 给予失败的信息展示
if (hasFailed) {
  console.log(
    "\n" + chalk.red.bold("Test run failed, please fix all the failing tests.")
  );
  // Set an exit code to indicate failure.
  process.exitCode = 1;
}
```

到目前为止，我们的测试框架已经初具规模，但是还有一些很常用的方法目前我们还不支持，例如 _describe_ 以及 _it_，修改我们的 _worker.js_，添加这一部分的逻辑：

```js
// worker.js
exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");
  const testResult = {
    success: false,
    errorMessage: null,
  };

  try {
    // 定义一个数组 describeFns，用于存储所有的 describe 函数及其相关信息
    const describeFns = [];
    // 定义一个变量 currentDescribeFn，用于存储当前正在处理的 describe 函数的信息
    let currentDescribeFn;
    // 外部每执行一次 describe，就会将 describe 对应的回调推入到 describeFns 里面
    const describe = (name, fn) => describeFns.push([name, fn]);
    // 外部每执行一次 it，就会将 it 对应的回调推入到 currentDescribeFn 里面
    const it = (name, fn) => currentDescribeFn.push([name, fn]);

    eval(code);

    // 当执行完 eval 之后，就说明外部的 describe 已经执行，describe 内部的测试用例已经被推入到 describeFns
    // 接下来开始验证 describeFns 内部的所有测试用例
    for (const [name, fn] of describeFns) {
      currentDescribeFn = [];
      testName = name;
      fn();

      currentDescribeFn.forEach(([name, fn]) => {
        testName += " " + name;
        fn();
      });
    }

    testResult.success = true;
  } catch (error) {
    testResult.errorMessage = error.message;
  }
  return testResult;
};
```

```js
// circus.test.js
describe("circus test", () => {
  it("works", () => {
    expect(1).toBe(1);
  });
});

describe("second circus test", () => {
  it(`doesn't work`, () => {
    expect(1).toBe(2);
  });
});
```

当然，我们也可以选择不手动实现，直接使用 _jest_ 为我们提供的第三方库 _jest-circus_：

```js
npm i jest-circus
```

```js
// worker.js
const { describe, it, run } = require("jest-circus");

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");
  const testResult = {
    success: false,
    errorMessage: null,
  };

  try {
    eval(code);

    const { testResults } = await run();
    testResult.testResults = testResults;
    testResult.success = testResults.every((result) => !result.errors.length);
  } catch (error) {
    testResult.errorMessage = error.message;
  }
  return testResult;
};
```

这里我们将 _testResults_ 也一并返回给调用处，在调用处就可以拿到这个 _testResults_ 数组，为错误信息显示更加完整的提示：

```js
// index.mjs
await Promise.all(
  Array.from(testFiles).map(async (testFile) => {
    // 解构出 testResults
    const { success, testResults, errorMessage } = await worker.runTest(
      testFile
    );
    const status = success
      ? chalk.green.inverse.bold(" PASS ")
      : chalk.red.inverse.bold(" FAIL ");

    console.log(status + " " + chalk.dim(relative(root, testFile)));
    if (!success) {
      hasFailed = true;
      // Make use of the rich `testResults` and error messages.
      // 失败了，如果 testResults 里面有值，则根据 testResults 显示更完整的信息
      if (testResults) {
        testResults
          .filter((result) => result.errors.length)
          .forEach((result) =>
            console.log(
              // Skip the first part of the path which is an internal token.
              result.testPath.slice(1).join(" ") + "\n" + result.errors[0]
            )
          );
        // If the test crashed before `jest-circus` ran, report it here.
      } else if (errorMessage) {
        console.log("  " + errorMessage);
      }
    }
  })
);
```

如果你运行了很多测试，你会发现 _jest-circus_ 没有自动重置状态，导致测试文件之间的状态共享。这并不是一个好的情况，我们可以通过使用 _jest-circus_ 提供的 _resetState_ 函数，在执行测试代码之前重置状态，来解决这个问题。

```js
// worker.js
const { describe, it, run, resetState } = require("jest-circus");
// worker.js
try {
  resetState();
  eval(code);
  const { testResults } = await run();
  // […]
} catch (error) {
  /* […] */
}
```

至此，我们在不到 _100_ 行的代码中，已经实现了一个测试框架的一些基本功能功能。

## 总结

本小节主要带着大家从零搭建一个测试框架。

如果你查看 _Jest_ 的代码，你会注意到它由 50 个包组成。对于我们的基础测试框架，我们利用到了其中的一些。通过使用这些 _Jest_ 的包，我们既可以了解测试框架的架构，也可以学习如何将这些包用于其他目的。

---

-_EOF_-
