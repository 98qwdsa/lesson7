// import DataSource from '../HOC/DataSource'
// import React from 'react'

// // 此函数接收一个组件...
// export default function withSubscription(WrappedComponent, selectData) {
//     // ...并返回另一个组件...
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//             this.handleChange = this.handleChange.bind(this);
//             this.state = {
//                 data: selectData(DataSource, props)
//             };
//         }

//         componentDidMount() {
//             // ...负责订阅相关的操作...
//             DataSource.addChangeListener(this.handleChange);
//         }

//         componentWillUnmount() {
//             DataSource.removeChangeListener(this.handleChange);
//         }

//         handleChange() {
//             this.setState({
//                 data: selectData(DataSource, this.props)
//             });
//         }

//         render() {
//             // ... 并使用新数据渲染被包装的组件!
//             // 请注意，我们可能还会传递其他属性
//             return <WrappedComponent data={this.state.data} />;
//             // return <WrappedComponent data={this.state.data} {...this.props} />;

//         }
//     };
// }

import React from "react";
import demoData from "../demoData";
import hoistNonReactStatic from 'hoist-non-react-statics';
export default function withAverage(Warp, subject) {
  //Warp.prototype.componentWillUnmount = function() {};
  class Average extends React.Component {
    componentDidMount() {
      demoData._addSubject(subject);
    }
    componentWillUnmount() {
      demoData._removeSubject(subject);
    }
    _removeSubject(sub) {
      sub && demoData._removeSubject(sub);
    }
    _editScore(score) {
      demoData._editScore({ ...subject, ...{ score } });
    }
    render() {
      const { title, ...passThroughProps } = this.props;
      return (
        <>
        <p>
          {title}
        </p>
        <Warp
          {...passThroughProps}
          _editScore={this._editScore}
        />
        </>
      );
    }
  };
  Average.subject = Warp.subject
  //hoistNonReactStatic(Average, Warp);
  return Average;
}