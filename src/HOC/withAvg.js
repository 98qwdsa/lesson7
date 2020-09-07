import sourceData from '../sourceData'
import React from 'react'
export default function withAvg(Warp,subject){
//hoc封装，里面做calculator的封装

    class Avg extends React.Component {
        componentDidMount() {
            sourceData.addSubj(subject);
          }
          //Score更新式，重新渲染组件
          editScore(score){
            sourceData.editScore({...subject,...{score}})
         
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
                editScore={this.editScore}
              />
              </>
            );
          }
}
Avg.subject =Warp.subject
return Avg;
}