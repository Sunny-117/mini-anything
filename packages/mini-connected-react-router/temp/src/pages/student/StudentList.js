import React from 'react'
import StudentSearchBar from "../../components/StudentSearchBar"
import StudentTable from "../../components/StudentTable"
import { searchStudents } from "../../services/student"
import { useState, useEffect } from "react"
import qs from "query-string"
import Pager from "../../components/common/Pager"

/**
 * 该函数用于获取地址栏参数中提供的查询条件，返回一个对象
 * 如果某些条件在地址中缺失，该函数会使用默认值
 */
function getQuery(search) {
    const queryDefault = {
        page: 1,
        limit: 10,
        key: "",
        sex: -1
    };
    let query = qs.parse(search);
    query = Object.assign({}, queryDefault, query);
    query.limit = +query.limit;
    query.page = +query.page;
    query.sex = +query.sex;
    return query;
}

/**
 * 获取服务器的响应结果
 * @param query 查询条件对象
 */
function useResp(query) {
    const [resp, setResp] = useState({
        cont: 0,
        datas: []
    })
    useEffect(() => {
        searchStudents({
            key: query.key,
            limit: query.limit,
            sex: query.sex,
            page: query.page
        }).then(r => {
            setResp(r);
        })
    }, [query.key, query.limit, query.sex, query.page])
    return resp;
}

function changeLocation(query, history) {
    //根据条件对象，改变地址
    const search = qs.stringify(query)
    history.push("?" + search);
}

export default function StudentList(props) {
    const query = getQuery(props.location.search)
    const resp = useResp(query);
    return (
        <div>
            <StudentSearchBar defaultValue={{
                key: query.key,
                sex: query.sex
            }}
                onSearch={cod => {
                    const newQuery = {
                        ...query,
                        key: cod.key,
                        sex: cod.sex,
                        page: 1
                    }
                    changeLocation(newQuery, props.history);
                }}
            ></StudentSearchBar>
            <StudentTable stus={resp.datas} />
            <div>
                <Pager
                    current={query.page}
                    total={resp.cont}
                    limit={query.limit}
                    panelNumber={5}
                    onPageChange={newPage => {
                        const newQuery = {
                            ...query,
                            page: newPage
                        }
                        changeLocation(newQuery, props.history);
                    }}
                />
            </div>

        </div>
    )
}
