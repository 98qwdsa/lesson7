import React, { Component } from 'react'
import PraFile from './PraFile'
import Average from './Average'
import { NameContext } from './profile';

export class PraArt extends Component {
    constructor(props) {
        super(props);
        this.state = {
          extras: 10
        };
      }
    static subject = {
        code : "art",
        score : 0
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
            <NameContext.Consumer>
              {({name, changeName}) =>(
            <div>
                <input
                value = {name}
                onChange = {changeName}
                />
                <PraFile cb={this.props._editScore} />
                {/* 使用prop render方式进行分享组件的state和状态  */}
                {this.props.extrasElm(this.state.extras, this.handelExtras)}
            </div>
            )}  
            </NameContext.Consumer>
        )
    }
}

export default Average(PraArt, PraArt.subject);
