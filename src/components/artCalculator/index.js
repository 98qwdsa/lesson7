import React from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";

class Art extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      extras:5
    }
  }
  static subject = { code: "art", score: 0 };
  componentWillUnmount() {
    this.props._removeSubject(Art.subject);
  }
  handelExtras= e => {
    e.persist();
    let extras = e.target.value
    this.setState({
      extras
    })
    this.props.onExtrasChange({extras:parseInt(extras,10),code:e.target.name})
  }
  render() {
  return <><Calculator cb={this.props._editScore} />{this.props.extrasElm(this.state.extras,this.handelExtras)}</>;
  }
}
export default withAverage(Art, Art.subject);
