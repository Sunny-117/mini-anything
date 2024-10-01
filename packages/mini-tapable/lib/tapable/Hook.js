class Hook{
    constructor(args){
     if(!Array.isArray(args)) args=[];
     this._args = args;//存放着形参数组 ['name','age']
     this.taps = [];//存放着所有的回调函数的数组
     this.interceptors = [];//存放着所有的拦截器
     this.call = CALL_DELEGATE;
     this.callAsync = CALL_ASYNC_DELEGATE;
     this.promise = PROMISE_DELEGATE;
    }
    tap(options,fn){
        this._tap("sync", options, fn);
    }
    tapAsync(options,fn){
        this._tap("async", options, fn);
    }
    tapPromise(options,fn){
        this._tap("promise", options, fn);
    }
    _tap(type, options, fn) {
        if(typeof options === 'string') 
        options={name:options};
        let tapInfo ={...options,type,fn};
        tapInfo=this._runRegisterInterceptors(tapInfo);
        this._insert(tapInfo);
    }
    _runRegisterInterceptors(tapInfo){
       for(const interceptor of this.interceptors){
           if(interceptor.register){
            let newTapInfo = interceptor.register(tapInfo);
            if(newTapInfo){
                tapInfo=newTapInfo;
            }
           }
       }
       return tapInfo;
    }
    intercept(interceptor){
        this.interceptors.push(interceptor);
    }
    _resetCompilation(){
        this.call = CALL_DELEGATE;
    }
    _insert(tapInfo){
        this._resetCompilation();
        let before;
        if(typeof tapInfo.before==='string'){
            before = new Set([tapInfo.before]);
        }else if(Array.isArray(tapInfo.before)){
            before = new Set(tapInfo.before);
        }
        let stage = 0;
        if(typeof tapInfo.stage === 'number')
          stage=tapInfo.stage;
        let i = this.taps.length;
        while(i>0){
            i--;
            const x = this.taps[i];
            this.taps[i+1]=x;
            const xStage = x.stage||0;
            if(before){
                if(before.has(x.name)){
                    before.delete(x.name);
                    continue;
                }
                if(before.size > 0)
                    continue;
            }
            if(xStage > stage){
                continue;
            }
            i++;
            break;
        }  
        this.taps[i]=tapInfo;
    }
    compile(options) {
		throw new Error("Abstract: should be overridden");
	}
    _createCall(type){
        return this.compile({
            taps:this.taps,//存放着所有的回调函数的数组
            args:this._args,//['name','age']
            interceptors:this.interceptors,
            type
        });
    }
}
//创建一个call的代理方法
const CALL_DELEGATE = function(...args) {
    //动态的创建call方法，并且赋给this.call
    this.call = this._createCall("sync");
    //执行动态创建出来的call方法
	return this.call(...args);
};
const CALL_ASYNC_DELEGATE = function(...args) {
	this.callAsync = this._createCall("async");
	return this.callAsync(...args);
};
const PROMISE_DELEGATE = function(...args) {
	this.promise = this._createCall("promise");
	return this.promise(...args);
};

//stage 阶段的概念
//umi 插件的执行分成很多阶段是初始化 运行中 挂载的

module.exports = Hook;