import React from 'react'
import { Route, Switch, NavLink } from "react-router-dom"
import StudentAdd from "./student/StudentAdd"
import CourseList from "./course/CourseList"

export default function Admin() {

    return (
        <>
            <li><NavLink to="/students/add">添加</NavLink></li>
            <li><NavLink to="/courses">列表</NavLink></li>
            <Switch>
                <Route path="/students/add" exact component={StudentAdd} />
                <Route path="/courses" exact component={CourseList} />
            </Switch>
        </>
    )
}
