import React from "react";
import demoData from "../../demoData";
// import hoistNonReactStatic from 'hoist-non-react-statics';
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
