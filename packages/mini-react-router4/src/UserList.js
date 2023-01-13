
import React from 'react'
import { Link } from './react-router-dom';

export default function UserList() {
    return (
        <div>
            <Link to="/user/detail/1">用户1</Link>
            <br />
            <Link to="/user/detail/2">用户2</Link>
            <br />
            <Link to="/user/detail/3">用户3</Link>
        </div>
    )
}
