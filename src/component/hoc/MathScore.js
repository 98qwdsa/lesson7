import React, { Component } from 'react';
import Calculator from '../../App'
import withSubscription from '../../HOC/HocTest'
import { NameContext } from "../../context/fileContext";
import { Typography, Input } from 'antd'

const { Text } = Typography;


class MathScore extends Component {
    static subject = { code: "math", score: 0 };
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            MathScore: props.data,
            title: this.props.title,
            extras: 0
        };
    }
    handelExtras = e => {
        this.props.onExtrasChange(e);
        e.persist();
        let extras = e.target.value;
        this.setState({
            extras
        });
    };
    render() {
        return (
            <>
                <NameContext.Consumer>
                    {({ name, changeName }) =>
                        <span>
                            <Text mark>请输入数学成绩</Text>
                            <Input name="name" value={name} onChange={changeName} />
                            <Calculator score={this.props._editScore} />
                            {this.props.extrasElm(this.state.extras, this.handelExtras)}
                        </span>}
                </NameContext.Consumer>
            </>
        );
    }
}

export default withSubscription(MathScore, MathScore.subject)
