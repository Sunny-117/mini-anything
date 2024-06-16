import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Switch} from 'react-router-dom';
import history from './core/history';
import {getRoutes} from './core/routes';
import plugin from './core/plugin';
//import {renderRoutes} from 'react-router-config';

let routes = getRoutes();
ReactDOM.render(
    <Router history={history}>
        {renderRoutes(routes)}
    </Router>,document.getElementById('root')
);

function renderRoutes(routes){
  return routes.map(({path,exact,component:RouteComponent,routes:childrenRoutes=[]},index)=>{
    //routeProps {match路径匹配的结果 history历史对象 location当前的路径}
    //如果地址中的路径和Route里的path匹配的话，会执行render并渲染其返回值
    return (
        <Route
         key={index}
         path={path}
         exact={exact}
         render={
             routeProps=>(
                 <RouteComponent {...routeProps}>
                     <Switch>
                         {renderRoutes(childrenRoutes)}
                     </Switch>
                 </RouteComponent>
             )
         }
        />
    )
  });
}
/**
 * 渲染Route有三种方式 component render children
 */