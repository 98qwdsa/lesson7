import React, { useState } from 'react';
import Calculator from '../../App'
// import withSubscription from '../../HOC/HocTest'
import { EmailContext } from "../../context/fileContext";
import { Typography, Input } from 'antd'
import useAverage from "../../hook/userAverage"
// import { render } from 'less';

const { Text } = Typography;
const Art = (props) => {
    const [extras, setExtras] = useState(5);
    const callbacks = useAverage({ code: "art", score: 0 });
    function handelExtras(e) {
        props.onExtrasChange(e);
        e.persist();
        setExtras(e.target.value);
    }
    return (
        <>
            <p>
                <Text mark> {props.title}</Text>
            </p>
            <EmailContext.Consumer>
                {
                    ({ name, changeName }) =>
                        <span>
                            <Input name="email" value={name} onchange={changeName} />
                            <Calculator score={callbacks._editSore} />
                            {props.extrasElm(extras, handelExtras)}
                        </span>
                }
            </EmailContext.Consumer>
        </>
    )
}
export default Art

// class ArtScore extends Component {
//     static subject = { code: "art", score: 0 };
//     constructor(props) {
//         super(props);
//         this.state = {
//             MathScore: props.data,
//             title: this.props.title,
//             extras: 0
//         };
//     }
//     handelExtras = e => {
//         this.props.onExtrasChange(e);
//         e.persist();
//         let extras = e.target.value;
//         this.setState({
//             extras
//         });
//     };
//     render() {

//         return (
//             <>
//                 <EmailContext.Consumer>
//                     {
//                         ({ name, changeName }) =>
//                             <span>
//                                 <Text mark>请输入美术成绩</Text>
//                                 <Input name="email" value={name} onChange={changeName} />
//                                 <Calculator score={this.props._editScore} />
//                                 {this.props.extrasElm(this.state.extras, this.handelExtras)}
//                             </span>
//                     }
//                 </EmailContext.Consumer>
//             </>
//         );
//     }
// }

// export default withSubscription(ArtScore, ArtScore.subject)
