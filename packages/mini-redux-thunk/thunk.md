
# thunk

thunk允许**action**是一个带有副作用的函数，当action是一个函数被分发时，thunk会阻止action继续向后移交,会直接调用函数




thunk会向函数中传递三个参数：

●  dispatch：来自于store.dispatch 
●  getState：来自于store.getState 
●  extra：来自于用户设置的额外参数 


![](./thunk.png)

