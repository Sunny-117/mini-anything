import React from 'react'
import "./index.css"
import { NavLink } from "react-router-dom"

export default function Menu() {
    return (
        <ul className="menu">
            <li><NavLink to="/students">学生列表</NavLink></li>
            <li><NavLink to="/students/add">添加学生</NavLink></li>
            <li><NavLink to="/courses">课程列表</NavLink></li>
            <li><NavLink to="/courses/add">添加课程</NavLink></li>
        </ul>
    )
}
