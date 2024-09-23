import reaction from './reaction';
let autorun = (handler) => {
  reaction.start(handler); // 先保存了这个函数
  handler(); // 调用这个方法会触发get属性 
  reaction.end();
}

export default autorun