import React,{useState} from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";
import { NameContext } from "../../context/profieContext";
import useAverage from '../../hooks/useAverage'

function Art(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     extras: 5
  //   };
  // }
  // static subject = { code: "art", score: 0 };
  let [extras,setExtras] = useState(5);
  let callback = useAverage( { code: "art", score: 0 })
  function handelExtras(e) {
    props.onExtrasChange(e);
    e.persist();
    let extras = e.target.value;
    // this.setState({
    //   extras
    // });
    setExtras(extras);
  };

 
    return (
      <NameContext.Consumer>
        
        {({ name, changeName }) =>
          <div>
            <p>{props.title}</p>
            <input name="name" value={name} onChange={changeName} />
            <Calculator cb={callback._editScore} />
            {props.extrasElm(extras, handelExtras)}
          </div>}
      </NameContext.Consumer>
    );
  
}
export default Art;