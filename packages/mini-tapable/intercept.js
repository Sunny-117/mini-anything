const {SyncHook} = require('./src');
const syncHook = new SyncHook(["name","age"]);
syncHook.intercept({
    register:(tapInfo)=>{//当你新注册一个回调函数的时候触发
        console.log(`拦截器1开始register`);
        return tapInfo;
    },
    tap:(tapInfo)=>{//每个回调函数都会触发一次
        console.log(`拦截器1开始tap`);
    },
    call:(name,age)=>{//每个call触发，所有的回调只会总共触发一次
        console.log(`拦截器1开始call`,name,age);
    }
});
syncHook.intercept({
    register:(tapInfo)=>{//当你新注册一个回调函数的时候触发
        console.log(`拦截器2开始register`);
        return tapInfo;
    },
    tap:(tapInfo)=>{//每个回调函数都会触发一次
        console.log(`拦截器2开始tap`);
    },
    call:(name,age)=>{//每个call触发，所有的回调只会总共触发一次
        console.log(`拦截器2开始call`,name,age);
    }
});


syncHook.tap({name:'回调函数A'},(name,age)=>{
   console.log(`回调A`,name,age);
});
syncHook.tap({name:'回调函数B'},(name,age)=>{
    console.log('回调B',name,age);
});
syncHook.call('Sunny-117',10);
