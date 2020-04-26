import React, { useState } from "react";
import Calculator from "../Calculator/Calculator";
import { NameContext } from "../../context/profieContext";
import useAverage from "../../hooks/useAverage";

function Art(props) {
  let [extras, setExtras] = useState(5);
  const callbacks = useAverage({ code: "art", score: 0 });
  function handelExtras(e) {
    props.onExtrasChange(e);
    e.persist();
    setExtras(e.target.value);
  }

  return (
    <>
        <p>
          {props.title}
        </p>
    <NameContext.Consumer>
      {({ name, changeName }) =>
        <span>
          <input name="name" value={name} onChange={changeName} />
          <Calculator cb={callbacks._editScore} />
          {props.extrasElm(extras, handelExtras)}
        </span>}
    </NameContext.Consumer>
    </>
  );
}
export default Art;