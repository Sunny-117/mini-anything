import { observable, autorun, action,configure,computed} from 'mobx'
// configure({enforceActions:true})
// observable 把普通的数据变成可观察的数据 Object.defineProperty proxy
import {observer} from 'mobx-react';
// 写一个计数器的功能  可以增加 可以算当前的值是奇数还是偶数
import React from 'react';
import ReactDom from 'react-dom';

class Store {
  @observable num = 1;
  @computed get type(){
    return this.num%2? '奇数':'偶数'
  }
  @action add = ()=>{
    this.num += 1;
  }
}
let store = new Store();
@observer
class Counter extends React.Component{
  render(){
    return <div>
      {this.props.store.num}
      <button onClick={()=>{
        this.props.store.add();
      }}>+</button>
      {this.props.store.type}
    </div>
  }
}
ReactDom.render(<Counter store={store}></Counter>,window.root);
