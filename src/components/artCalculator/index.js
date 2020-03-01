import React from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";

class Art extends React.Component {
  static subject = { code: "art", score: 0 };
  componentWillUnmount() {
    this.props._removeSubject(Art.subject);
  }
  render() {
    return <Calculator cb={this.props._editScore} />;
  }
}
export default withAverage(Art, Art.subject);
