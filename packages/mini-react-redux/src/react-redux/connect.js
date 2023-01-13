import React, { useContext, useState, useEffect } from "react"
import { bindActionCreators } from "redux"
import ctx from "./ctx";
import { compare } from './compare';

export default function (mapStateToProps, mapDispatchToProps) {
    return function (Comp) {
        //对于Temp组件，只有它需要的数据发生变化时才会重新渲染
        function Temp(props) {
            const store = useContext(ctx); //从上下文中拿到仓库
            const [state, setState] = useState(mapStateToProps && mapStateToProps(store.getState()))
            useEffect(() => {
                return store.subscribe(() => {
                    var newState = mapStateToProps && mapStateToProps(store.getState());
                    setState(prevState => {
                        if (compare(prevState, newState)) {
                            return prevState;
                        }
                        else {
                            return newState;
                        }
                    })
                })
            }, [store])

            /**
            * 得到需要传递的事件处理属性
            */
            function getEventHandlers() {
                if (typeof mapDispatchToProps === "function") {
                    return mapDispatchToProps(store.dispatch, props);
                }
                else if (typeof mapDispatchToProps === "object") {
                    return bindActionCreators(mapDispatchToProps, store.dispatch)
                }
            }
            var handlers = {};
            if (mapDispatchToProps) {
                handlers = getEventHandlers();
            }
            return <Comp {...state} {...handlers} {...props} />
        }
        Temp.displayName = Comp.displayName || Comp.name; //类组件的名称和传入的组件一致
        return Temp;
    }
}