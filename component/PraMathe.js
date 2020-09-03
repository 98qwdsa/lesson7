import React, { Component } from 'react'
import PraFile from './PraFile'
import Average from './Average';
import { EmailContext } from './profile';

export class PraMathe extends Component {
    constructor(props){
        super(props);
        this.state = {
            extras: 5
        };
    }
    static subject ={
        code : "mathe",
        score : 0
    };
    static contextType = EmailContext;
    handelExtras = e =>{
        this.props.onExtrasChange(e);
        e.persist();
        let extras = e.target.value;
        this.setState({
            extras
        });
    }
    handleChangeEmail = e =>{
        e.persist();
        
    }
    render() {
        return (
            
            <div>
                <span>
                    {this.context} 
                </span>
                <span >
                    {/* {this.props.render(this.state)} */}
                    <PraFile cb = {this.props._editScore}/>
                    {/* 使用prop render方式进行分享组件的state和状态  */}
                    {this.props.extrasMathe(this.state.extras, this.handelExtras)}
                </span>
            </div>
            
        )
    }
}

export default Average(PraMathe,PraMathe.subject);
