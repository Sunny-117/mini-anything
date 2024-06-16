import React from 'react';
const UserLayout = (props)=>(
    <div>
        <ul>
            <li><a href="/user/add">添加用户</a></li>
            <li><a href="/user/list">用户列表</a></li>
        </ul>
        <div>{props.children}</div>
    </div>
)
export default UserLayout;