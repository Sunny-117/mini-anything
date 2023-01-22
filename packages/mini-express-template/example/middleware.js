// 中间件 use
// 中间件 在执行路由之前 要干一些处理工作 就可以采用中间件
let express = require('express');
let app = express();
// use方法第一个参数如果不写默认就是/
// 中间件可以扩展一些方法
app.use('/name', function (req, res, next) {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  next('名字不合法');
});
app.use(function (req, res, next) {
  console.log('middleware');
  next();
});
app.get('/age', (req, res) => {
  console.log(req.path);
  console.log(req.hostname);
  console.log(req.query);
  res.end('年龄9岁');
});
app.get('/name/n', (req, res) => {
  res.end('123');
});
// 错误中间件(4个参数)放到路由的下面
app.use(function (err, req, res, next) {
  console.log(err);
  next(err);
});
app.use(function (err, req, res, next) {
  console.log(err);
});
app.listen(8080, () => {
  console.log(`server start 8080`);
});