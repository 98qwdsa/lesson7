import React, { Component } from 'react';
import Calculator from '../../App'
import withSubscription from '../../HOC/HocTest'
import { EmailContext } from "../../context/fileContext";
import { Typography, Input } from 'antd'

const { Text } = Typography;


class ArtScore extends Component {
    static subject = { code: "art", score: 0 };
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
                <EmailContext.Consumer>
                    {
                        ({ name, changeName }) =>
                            <span>
                                <Text mark>请输入美术成绩</Text>
                                <Input name="email" value={name} onChange={changeName} />
                                <Calculator score={this.props._editScore} />
                                {this.props.extrasElm(this.state.extras, this.handelExtras)}
                            </span>
                    }
                </EmailContext.Consumer>
            </>
        );
    }
}

export default withSubscription(ArtScore, ArtScore.subject)
