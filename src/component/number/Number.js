import React from 'react';
import './Number.css'
import { Button } from 'antd'



const Number = ({ val, handleNumber }) => {
  return (
    <div className="num-content">
      <Button className="btn-number"
        onClick={() => {
          handleNumber(val)
        }}>
        {val}</Button>
    </div>
  );

}

export default Number;
