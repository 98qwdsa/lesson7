import React, { Component } from 'react'
import demoData from './demoData'

export default function Average (Wrap,subject){

    class Average extends Component{
        componentDidMount(){
            demoData._addSubject(subject);
        }
        componentWillUnmount(){
            demoData._removeSubject(subject);
        }
        _removeSubject(sub){
            sub && demoData._removeSubject(sub);
        }
        _editScore(score){
            demoData._editScore({...subject, ...{score}});
        }
        render(){
            const {title, ...passThroughProps} = this.props;
            return(
                <>
                    <p>{title}</p>
                    <Wrap 
                    {...passThroughProps}
                    _editScore = {this._editScore}
                    />
                </>
            );
        }
    };
    Average.subject = Wrap.subject;
    return Average;
}
