import React from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";
import { EmailContext } from "../../context/profieContext";

class Mathe extends React.Component {
  static subject = { code: "mathe", score: 0 };
  static contextType = EmailContext;
  render() {
  return <><span>{this.context}</span><Calculator cb={this.props._editScore} />{this.props.children}</>;
  }
}
export default withAverage(Mathe, Mathe.subject);
