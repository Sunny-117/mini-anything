import React from 'react'
import { observable, autorun, action, configure, computed } from 'mobx'
import { observer } from 'mobx-react'
class Store {
  @observable num = 1;
  @computed get type() {
    return this.num % 2 ? '奇数' : '偶数'
  }
  @action add = () => {
    this.num += 1;
  }
}
let store = new Store();
@observer
class Counter extends React.Component {
  render() {
    return <div>
      {this.props.store.num}
      <button onClick={() => {
        this.props.store.add();
      }}>+</button>
      {this.props.store.type}
    </div>
  }
}

export default function App() {
  return (
    <div>
      <Counter store={store} />
    </div>
  )
}

