import React, { Component } from 'react'
import CheckBoxGroup from "./index"
import { getAllStudents } from "../../../services/student"

export default class Test extends Component {
    state = {
        datas: [],
        chooseDatas: []
    }

    async componentDidMount() {
    
        const stus = await getAllStudents();
        this.setState({
            datas: stus.map(it => ({ value: it.id.toString(), text: it.name }))
        })
    }


    render() {
        return (
            <div>
                <CheckBoxGroup
                    name="loves"
                    {...this.state}
                    onChange={newArr => {
                        this.setState({
                            chooseDatas: newArr
                        })
                    }}
                />
            </div>
        )
    }
}
