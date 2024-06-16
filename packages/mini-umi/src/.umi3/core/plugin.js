class Plugin{
    constructor(){
        this.hooks = {};
    }
    //{apply:{patchRoutes:fn}}
    register(plugin){//
       Object.keys(plugin.apply).forEach(key=>{
           if(!this.hooks[key])
               this.hooks[key]=[];
            this.hooks[key]=this.hooks[key].concat(plugin.apply[key]);    

       })
    }
    applyPlugins({key,args}){
        if(!this.hooks[key])
            this.hooks[key]=[];
        this.hooks[key].forEach(hook=>hook(args));       
    }
}
let plugin = new Plugin();

import * as Plugin_0 from '/Users/fuzhiqiang/Desktop/前端/手写上层/mini-umi1/src/app.js';

plugin.register({
    apply:Plugin_0,
    path:'/Users/fuzhiqiang/Desktop/前端/手写上层/mini-umi1/src/app.js'
});

export default plugin;// 运行时插件，需要用esm导出