# 手写React-router源码 

# 说明

版本："react-router-dom": "^5.0.1",

# 实现模块

## path-to-regexp

[path-to-regexp](docs/path-to-regexp.md)

## history

[history](docs/history.md)


## Router

[Router](docs/Router.md)

## Route

[Route](docs/Route.md)

## Switch

[Switch](docs/Switch.md)

## withRouter

[withRouter](docs/withRouter.md)

## Link

[Link](docs/Link.md)


TODO：
- [x] prompt

```jsx

import { Component } from "react";
import { withRouter } from "react-router-dom";

class Prompt extends Component {
  static defaultProps = {
    when: false, //当when为true的时候，添加阻塞
    message: "", //当阻塞时，跳转页面的提示消息
  };

  componentDidMount() {
    this.handleBlock();
  }

  componentDidUpdate(prevProps, prevState) {
    // 副作用
    this.handleBlock(); //属性值发生变化也要做这件事
  }

  handleBlock() {
    if (this.props.when) {
      //添加阻塞
      this.unBlock = this.props.history.block(this.props.message);
    } else {
      if (this.unBlock) {
        this.unBlock();
      }
    }
  }

  componentWillUnmount() {
    if (this.unBlock) {
      this.unBlock();
    }
  }

  render() {
    return null;
  }
}

export default withRouter(Prompt);

```

- [ ] redirect

利用history跳转