
class HookCodeFactory{
    constructor(){
        
    }
    setup(hookInstance,options){
        //映射出来一个回调函数的数组赋给 hooks实例的_x属性
        //_x才是真正回调函数的数组
        hookInstance._x = options.taps.map(item=>item.fn);
    }
    init(options){
        this.options = options;//{taps,args,type}
    }
    deinit(){
        this.options=null;
    }
    args(options={}){
        let {before,after}=options;
        let allArgs = this.options.args||[];//原始的参数[name,age]
        if(before)allArgs=[before,...allArgs];
        if(after)allArgs=[...allArgs,after];
        if(allArgs.length>0)
            return allArgs.join(', ');//name,age
        return "";    
    }
    header(){
        let code = "";
        code += "var _x = this._x;\n";//_x是回调函数的数组
        if(this.needContext()){
            code += `var _context = {};\n`;
        }else{
            code += `var _context;\n`;
        }
        if(this.options.interceptors.length>0){
            code += `var _taps = this.taps;\n`;
            code += `var _interceptors = this.interceptors;\n`;
        }
        for(let k=0;k<this.options.interceptors.length;k++){
            const interceptor=this.options.interceptors[k];
            if(interceptor.call)
                code += `_interceptors[${k}].call(${this.args({
                    before:interceptor.context?"_context":undefined
                })});\n`;
        }
        return code;
    }
    create(options){
        this.init(options);
        let fn;
        switch(this.options.type){
            case 'sync':
                fn = new Function(
                    this.args(),
                    this.header()+this.content({
                        onDone:()=>""
                    })
                )   
                break;
            case 'async':
                fn = new Function(
                    this.args({after:'_callback'}),
                    this.header()+this.content({
                        onDone:()=>"_callback();\n"
                    })
                )    
                break;
            case 'promise':
                /* fn = new Function(this.args(),this.header()
                +`return Promise.all(_x.map(item=>item(${this.args()})));`); */
                let content = this.content({
                    onDone:()=>" _resolve();\n"
                });
                content = `return new Promise(function (_resolve, _reject) {
                    ${content}
                })`;
                fn = new Function(
                    this.args(),
                    this.header()+content
                )    
               break;    
        }
        this.deinit();
        return fn;
    }
    callTapsParallel({onDone}){
        let code = `var _counter = ${this.options.taps.length};\n`;
        if(onDone){
            code+=`
                var _done = function () {
                    ${onDone()}
                };
            `;
        }
        for(let i=0;i<this.options.taps.length;i++){
            const done = ()=>`if (--_counter === 0) _done();`;
            code += this.callTap(i,{onDone:done});
        }
        return code;
    }
    callTapsSeries({onDone}){
        if(this.options.taps.length===0){
            return onDone();
        }
        let code = "";
        let current = onDone;
        for(let j=this.options.taps.length-1;j>=0;j--){
            const content = this.callTap(j,{onDone:current});
            current = ()=>content;
        }
        code += current();
        return code;
    }
    needContext(){
        for(const tapInfo of this.options.taps){
            if(tapInfo.context) return true;
        }
    }
    callTap(tapIndex,{onDone}){
        let code = "";
        if(this.options.interceptors.length>0){
            code += `var _tap${tapIndex} = _taps[${tapIndex}];`;
            for(let i=0;i<this.options.interceptors.length;i++){
                let interceptor = this.options.interceptors[i];
                if(interceptor.tap){
                    code += `_interceptors[${i}].tap(${this.needContext()&&'_context,'}_tap${tapIndex});`;
                }
            }
        }
        code += `var _fn${tapIndex} = _x[${tapIndex}];`
        let tap = this.options.taps[tapIndex];
        switch(tap.type){
            case 'sync':
                code+=`_fn${tapIndex}(${this.args({before:this.needContext()?"_context":undefined})});`;
                if(onDone){
                    code += onDone();
                }
                break; 
            case 'async':
                let cbCode = `
                function (_err${tapIndex}) {
                    if (_err${tapIndex}) {
                        _callback(_err${tapIndex});
                    } else {
                        ${onDone()}
                    }
                }
                `;
                code+=`_fn${tapIndex}(${this.args({after:cbCode})});`;  
                break; 
            case 'promise':
                code = `
                    var _fn${tapIndex} = _x[${tapIndex}];
                    var _promise${tapIndex} = _fn${tapIndex}(${this.args()});
                    _promise${tapIndex}.then(
                        function () {
                            ${onDone()}
                        }
                    );
                `;   
            default:
                break;    
        }
        return code;
    }
}
module.exports = HookCodeFactory;