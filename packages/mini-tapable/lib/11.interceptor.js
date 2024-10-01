const {SyncHook} = require('./tapable');
const syncHook = new SyncHook(["name","age"]);
syncHook.intercept({
    context:true,//我需要一个上下文对象
    register:(tapInfo)=>{//当你新注册一个回调函数的时候触发
        console.log(`${tapInfo.name}-1注册`);
        tapInfo.register1 = 'register1';
        return tapInfo;
    },
    tap:(context,tapInfo)=>{//每个回调函数都会触发一次
        console.log(`开始触发1`,context);
        if(context){
            context.name1= 'name1';
        }
    },
    call:(context,name,age)=>{//每个call触发，所有的回调只会总共触发一次
        console.log(`开始调用1`,context,name,age);
    }
});
syncHook.intercept({
    context:true,//我需要一个上下文对象
    register:(tapInfo)=>{//当你新注册一个回调函数的时候触发
        console.log(`${tapInfo.name}-2注册`);
        tapInfo.register2 = 'register2';
        return tapInfo;
    },
    tap:(context,tapInfo)=>{//每个回调函数都会触发一次
        console.log(`开始触发2`,context);
        if(context){
            context.name2= 'name2';
        }
    },
    call:(context,name,age)=>{//每个call触发，所有的回调只会总共触发一次
        console.log(`开始调用2`,context,name,age);
    }
});
//let tapInfo = {name,context,fn,register1,register2};

syncHook.tap({name:'tap1函数A',context:true},(name,age)=>{
   console.log(`回调1`,name,age);
});
//console.log(syncHook.taps[0]);
syncHook.tap({name:'tap2函数B',context:true},(name,age)=>{
    console.log('回调2',name,age);
});
debugger
syncHook.call('Sunny',10);
console.log(4+2+6);

/**
 * register拦截的是注册
 * tap拦截的是执行回调之前
=register=
函数A-1注册
函数A-2注册
函数B-1注册
函数B-2注册
=call=
开始调用1 {} Sunny 10
开始调用2 {} Sunny 10

=tap=
开始触发 {}
开始触发 { name1: 'name1' }
1 { name1: 'name1', name2: 'name2' } Sunny


开始触发 { name1: 'name1', name2: 'name2' }
开始触发 { name1: 'name1', name2: 'name2' }
2 { name1: 'name1', name2: 'name2' } Sunny


 */