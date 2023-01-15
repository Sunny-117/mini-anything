const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
  ctx.body = "hello sunny";
});

app.listen(3000, () => {
  console.log('[ 服务器已经启动 ] >', 3000)
});
