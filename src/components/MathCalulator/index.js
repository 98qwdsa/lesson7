import React from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";

class Mathe extends React.Component {
  static subject = { code: "match", score: 0 };
  componentWillUnmount() {
    this.props._removeSubject(Mathe.subject);
  }
  render() {
    return <Calculator cb={this.props._editScore} />;
  }
}
export default withAverage(Mathe, Mathe.subject);
