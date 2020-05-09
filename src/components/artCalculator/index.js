import React, { useState } from "react";
import Calculator from "../Calculator/Calculator";
// import withAverage from "../../HOC/withAverage/withAverage";
import { NameContext } from "../../context/profieContext";
import useAverage from "../../hook/useAverage";

// class Art extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       extras: 5,
//     };
//   }
//   static subject = { code: "art", score: 0 };
//   handelExtras = (e) => {
//     this.props.onExtrasChange(e);
//     e.persist();
//     let extras = e.target.value;
//     this.setState({
//       extras,
//     });
//   };
//   render() {
//     return (
//       <NameContext.Consumer>
//         {({ name, changeName }) => (
//           <span>
//             <input name="name" value={name} onChange={changeName} />
//             <Calculator cb={this.props._editScore} />
//             {this.props.extrasElm(this.state.extras, this.handelExtras)}
//           </span>
//         )}
//       </NameContext.Consumer>
//     );
//   }
// }
// export default withAverage(Art, Art.subject);

export default function Art(props) {
  let [extras, setExtras] = useState(5);
  const callback = useAverage({ code: "art", score: 0 });

  const handelExtras = (e) => {
    props.onExtrasChange(e);
    e.persist();
    setExtras(e.target.value);
  };
  return (
    <>
      <p>{props.title}</p>
      <NameContext.Consumer>
        {({ name, changeName }) => (
          <span>
            <input name="name" value={name} onChange={changeName} />
            <Calculator cb={callback} />
            {props.extrasElm(extras, handelExtras)}
          </span>
        )}
      </NameContext.Consumer>
    </>
  );
}
