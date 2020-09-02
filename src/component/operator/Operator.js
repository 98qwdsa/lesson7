import React from 'react';
import './Operator.css'
import { Button } from 'antd'



const Operator = ({ val, handleOperator }) => {

    return (
        <Button className="btn-number"
            onClick={() => { handleOperator(val) }}
        >{val}</Button>
    );
}

export default Operator;
