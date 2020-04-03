import React from "react";
import Calculator from "./Calculator";
import withAverage from "../common/withAverage";
import {EmailContext} from "../common/profieContext";

class Math extends React.Component {
    static subject = { code: "math", score: 0};
    static contextType = EmailContext;
    constructor(props){
        super(props)
        this.state = {
            extras:5
        }
    }
    componentWillUnmount() {
        this.props._removeSubject(Math.subject);
    }
    render() {
        return <><span>{this.context}</span><Calculator cb={this.props._editScore} />{this.props.children()}</>
    }

}
export default withAverage(Math, Math.subject);