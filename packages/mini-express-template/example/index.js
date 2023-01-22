let express = require('../lib/mini.cjs');
let app = express();

// RESTFul API 根据方法的名的不同 做对应的资源的处理

app.get('/name', function (req, res) {
    res.end('fzq');
});
app.get('/age', function (req, res) {
    res.end('9');
});
app.post('/name', function (req, res) {
    res.end('post name');
});
app.all('*', function (req, res) {
    res.end(req.method + 'user');
});
app.listen(3003, function () {
    console.log(`server start 3003`);
});

