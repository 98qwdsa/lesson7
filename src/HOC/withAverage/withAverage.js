import React from "react";
import demoData from "../../demoData";
// import hoistNonReactStatic from 'hoist-non-react-statics';
export default function withAverage(props,Warp, subject) {
  //Warp.prototype.componentWillUnmount = function() {};
  console.log("pass subject",subject);
  
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
      const { title, ...passThroughProps } = props;
      return (
        <>
        <p>
          {title}
        </p>
        <div
          {...passThroughProps}
          _editScore={this._editScore}
        />
        </>
      );
    }
  };
  Average.subject = subject
  //hoistNonReactStatic(Average, Warp);
  return Average;
}
