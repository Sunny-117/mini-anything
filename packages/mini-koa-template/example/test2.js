import Koa from './lib/mini.esm';
let app = new Koa();
app.use((ctx) => {
  console.log(ctx.req.path);
  console.log(ctx.request.req.path);
  console.log(ctx.request.path);
  console.log(ctx.path); // ctx会代理ctx.request上的属性
  ctx.body = 'sunny';
});
app.listen(6789);