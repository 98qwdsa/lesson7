import React, { useContext } from "react";
import Calculator from "../Calculator/Calculator";
// import withAverage from "../../HOC/withAverage/withAverage";
import { EmailContext } from "../../context/profieContext";
import useAverage from "../../hook/useAverage";

// class Mathe extends React.Component {
//   static subject = { code: "mathe", score: 0 };
//   static contextType = EmailContext;
//   render() {
//   return <><span>{this.context}</span><Calculator cb={this.props._editScore} />{this.props.children}</>;
//   }
// }
// export default withAverage(Mathe, Mathe.subject);

export default function Mathe(props) {
  const context = useContext(EmailContext);
  const callback = useAverage({ code: "mathe", score: 0 });
  return (
    <>
      <p>{props.title}</p>
      <span>{context}</span>
      <Calculator cb={callback} />
      {props.children}
    </>
  );
}
