import Calculator from "./calculator"
import React from 'react'
import { render } from "@testing-library/react"
import withAvg from "../HOC/withAvg";
class ArtCalculator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          extras: 5
        };
      }
static subject={code:"Art",score:0}
render(){
    return(
        <div><Calculator cb={this.props.editScore}/></div>
    )
}
}
export default withAvg(ArtCalculator,ArtCalculator.subject);