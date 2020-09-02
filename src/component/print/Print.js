import React from 'react';
import './Print.css'
import { Input, Typography } from 'antd'

const { Text } = Typography;

const Print = (props) => {
    return (
        <div className="print-content">
            <Input value={props.result} disabled={true} />
            {/* <Text mark>{props.error}</Text> */}
        </div>
    )
}

export default Print

