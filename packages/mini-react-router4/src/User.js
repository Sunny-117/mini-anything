import { Link, Route } from './react-router-dom';
import UserAdd from './UserAdd';
import UserList from './UserList';
import UserDetail from './UserDetail';

import React from 'react'

export default function User() {
  return (
    <div>
      <div className="col-md-2">
        <div className="nav nav-stacked">
          <li><Link to="/user/add">用户添加</Link></li>
          <li><Link to="/user/list">用户列表</Link></li>
        </div>
      </div>
      <div className="col-md-10">
        <Route path="/user/add" component={UserAdd}></Route>
        <Route path="/user/list" component={UserList}></Route>
        <Route path="/user/detail/:id" component={UserDetail}></Route>
      </div>
    </div>
  )
}
