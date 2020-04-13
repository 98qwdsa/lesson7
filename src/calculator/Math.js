import React from "react";
import Calculator from "./Calculator";
import withAverage from "../HOC/withAverage";
import {EmailContext} from "../common/profieContext";

class Math extends React.Component {
    static subject = { code: "mathe", score: 0 };
  static contextType = EmailContext;
  render() {
  return <><span>{this.context}</span><Calculator cb={this.props._editScore} />{this.props.children}</>;
  }

}
export default withAverage(Math, Math.subject);