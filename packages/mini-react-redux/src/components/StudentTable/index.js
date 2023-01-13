import React from 'react'
import "./index.css"
export default function StudentTable(props) {
    const trs = props.stus.map(s => <tr key={s.id}>
        <td>{s.sNo}</td>
        <td>{s.name}</td>
        <td>{s.sex === 1 ? "女" : "男"}</td>
        <td>{s.birth}</td>
        <td>{s.email}</td>
        <td>
            <a href={`/students/${s.sNo}`}>详情</a>
        </td>
    </tr>)
    return (
        <table className="tab">
            <thead>
                <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>出生年份</th>
                    <th>邮箱</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {trs}
            </tbody>
        </table>
    )
}
