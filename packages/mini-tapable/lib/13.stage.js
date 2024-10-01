let {SyncHook} = require('./tapable');
let hook = new SyncHook(["name"]);
debugger
hook.tap({name:'tap1',stage:1},(name)=>{
    console.log('tap1',name);
});
hook.tap({name:'tap3',stage:3},(name)=>{
    console.log('tap3',name);
});
hook.tap({name:'tap4',stage:4},(name)=>{
    console.log('tap4',name);
});
debugger
hook.tap({name:'tap2',stage:2},(name)=>{
    console.log('tap2',name);
});
hook.call('Sunny');