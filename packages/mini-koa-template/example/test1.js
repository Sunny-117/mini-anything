import Koa from './lib/mini.esm.js';
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(6789);