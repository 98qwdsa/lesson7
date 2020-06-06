import React ,{useContext}from "react";
import Calculator from "../Calculator/Calculator";
import withAverage from "../../HOC/withAverage/withAverage";
import { EmailContext } from "../../context/profieContext";
import useAverage from '../../hooks/useAverage'

function Mathe (props){
  // static subject = { code: "mathe", score: 0 };
  let callback = useAverage({ code: "mathe", score: 0 });
  // static contextType = EmailContext;
  const context = useContext(EmailContext);
 
  return (
  <>
    <div>
      {props.title}
      <p>{context}</p>
      <Calculator cb={callback._editScore} />{props.children}
    </div>
    
    
  </>
    );
  
}
export default Mathe;
