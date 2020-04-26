import React, {useContext} from "react";
import Calculator from "../Calculator/Calculator";
import { EmailContext } from "../../context/profieContext";
import useAverage from "../../hooks/useAverage";

function Mathe(props){
  const context = useContext(EmailContext);
  const callbacks = useAverage({ code: "mathe", score: 0 });
  return (<>
    <p>
    {props.title}
    </p>
    <span>{context}</span>
    <Calculator cb={callbacks._editScore} />{props.children}
    </>);
}
export default Mathe;