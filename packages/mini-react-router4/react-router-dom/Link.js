import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Consumer } from './context';
export default class Link extends Component{
    constructor(){
        super();
   }
   render(){
     return (<Consumer>
         {state=>{
           return <a onClick={()=>{
             state.history.push(this.props.to);
           }}>{this.props.children}</a>
         }}
     </Consumer>)
 }
}