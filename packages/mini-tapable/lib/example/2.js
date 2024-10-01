//this.call -> CALL_DELEGATE -> this.call 
//惰性函数
let  ajax = (url)=>{
  if('ie'){
    ajax=ieAjax;
  }else if('firefox'){
    ajax=firefoxAjax;
  }else if('chrome'){
    ajax=chromeAjax;
  }
}
let ieAjax = (url)=>{

}
let firefoxAjax = (url)=>{

}
let chromeAjax = (url)=>{

}
ajax();
ajax();