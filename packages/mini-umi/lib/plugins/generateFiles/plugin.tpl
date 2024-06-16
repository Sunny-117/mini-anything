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

{{#plugins}}
import * as Plugin_{{{index}}} from '{{{path}}}';
{{/plugins}}

{{#plugins}}
plugin.register({
    apply:Plugin_{{{index}}},
    path:'{{{path}}}'
});
{{/plugins}}

export default plugin;// 运行时插件，需要用esm导出