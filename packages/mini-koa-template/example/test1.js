import Koa from './lib/mini.esm.js';
let app = new Koa();
app.use((req, res) => {
  console.dir(res)
  res.end('hello zfpx');
});
app.listen(3000, () => {
  console.log('[ listening 3000 ] >')
});