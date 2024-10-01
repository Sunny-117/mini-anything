const { SyncHook } = require("tapable");
let syncHook = new SyncHook(["name", "age"]);
syncHook.intercept({
    context: true,
	register: (tapInfo) => {
        console.log(`${tapInfo.name}1 注册!`);
        tapInfo.register1='register1';
		return tapInfo;
    },
    tap: (context,tapInfo) => {
        console.log("开始触发调用",context);
        if (context) {
			context.name1 = 'name1';
		}
    },
    call: (context,name,age) => {
		console.log("开始调用1",context,name,age);
	},
})
syncHook.intercept({
    context: true,
	register: (tapInfo) => {
        console.log(`${tapInfo.name}2 注册!`);
        tapInfo.register2='register1';
		return tapInfo;
    },
    tap: (context,tapInfo) => {
        console.log("开始触发调用",context);
        if (context) {
			context.name2 = 'name2';
		}
    },
    call: (context,name,age) => {
		console.log("开始调用2",context,name,age);
	},
})
syncHook.tap({name:'函数A',context:true},(name, age) => {
    console.log(1, name, age);
});
syncHook.tap({name:"函数B",context:true},(name, age) => {
    console.log(2, name, age);
});
syncHook.call("Sunny", 10);