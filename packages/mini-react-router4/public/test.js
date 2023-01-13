let pathToRegExp = require('path-to-regexp');

let pathname = '/user/detail/1/2';
let keys = []
let reg = pathToRegExp('/user/detail/:id/:name', keys,{end:true});
let [url,...values] = pathname.match(reg)
console.log(keys.map(item=>item.name));
console.log(values);
// {id:1,name:2} =>params