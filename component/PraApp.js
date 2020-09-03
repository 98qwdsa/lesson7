import React, { Component } from 'react'
import './component.css'
import PraArt from './PraArt';
import PraMathe from './PraMathe';
import dataDemo from "./demoData";
import profile, { NameContext, EmailContext } from "./profile"

export class PraApp extends Component {
    constructor(props) {
        super(props);
        this.extras = {
            art: 0,
            mathe: 0
        };
        this.state = {
            _Average: null,
            _Subject: [],
            extras_Average: null,
            email: profile.email,
            name: profile.name

        }
        dataDemo.aerageChangeCb = _Average => {
            this.setState({
                _Average
            });
            this.handelExtras_Average();
        };
        dataDemo.subjectChangeCb = _Subject => {
            this.setState({
                _Subject
            });
        };
    }
    //在当前组件显示name的值
    // handleChangeName = e =>{
    //   e.persist();
    //   this.setState({
    //     name:e.target.value
    //   });
    // }
    //在当前组件显示email的值
    // handleChangeEmail= e =>{
    //   e.persist();
    //   this.setState({
    //     email:e.target.value    
    //   })
    // }
    //优化上面两个函数
    handleChangeContext = e => {
        e.persist();
        if (e.target.name === "email") {
            this.setState({
                email: e.target.value
            });
        }
        else {
            this.setState({
                name: e.target.value
            });
        }
    }

    //把当前分数同步在组件上
    handelExtras = e => {
        e.persist();
        const name = e.target.name;
        const value = e.target.value;
        this.extras[name] = parseInt(value, 10);
        if (name === 'mathe') {
            this.setState({
                extrasMathe: name
            });
        }
    }
    //计算平均分数
    handelExtras_Average = () => {
        let extras_Average = null;
        let totle = 0;
        dataDemo._TotalSubject.forEach(e => {
            totle += e.score + parseInt(this.extras[e.code], 10);
        });
        extras_Average = (totle / dataDemo._TotalSubject.length).toFixed(2);
        this.setState({
            extras_Average
        });
    };


    render() {
        console.log(this.context);
        return (
            <div className="container">
                <div className="context">
                    <p>
                        {/* 显示和修改的Email值 */}
                email:<input
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChangeContext}
                        />
                    </p>
                    <p>
                        {/* 显示name的值 */}
                name:{this.state.name}
                    </p>
                    <p>
                        {/* 显示科目和所添加的分数 */}
          _Subject:{this.state._Subject.map(e =>
                            <span key={e.code}>
                                {e.code}:{e.score}/
            </span>
                        )}
                    </p>
                    <p>
                        {/* 显示没有经过Extras值影响的平均数 */}
          _Average:{this.state._Average}
                    </p>
                    <p>
                        {/* 显示通过Extras的值的影响后的平均数 */}
          Extras_Average: {this.state.extras_Average}
                    </p>
                </div>
                <div className="art">
                    <div className="float-left">
                        <NameContext.Provider
                            value={{
                                name: this.state.name,
                                changeName: this.handleChangeContext
                            }}
                        >
                            {/* 引用组件PraArt */}
                            <PraArt
                                title="请计算美术成绩"
                                onExtrasChange={this.handelExtras}
                                extrasElm={(extras, handelExtras) => {
                                    this.extras.art = extras;
                                    return (
                                        <p>
                                            extras:<input
                                                type="number"
                                                name="art"
                                                value={extras}
                                                onChange={handelExtras}
                                            />
                                        </p>
                                    );
                                }}
                            />
                        </NameContext.Provider>
                    </div>
                    <div className="float-left">
                        <EmailContext.Provider value={this.state.email}>
                            {/* 引用组件PraMathe组件 */}
                            <PraMathe
                                title="请计算数学成绩"
                                render={(emails) => {
                                    emails = this.state.email;
                                }}
                                onExtrasChange={this.handelExtras}
                                extrasMathe={(extras, handelExtras) => {
                                    this.extras.mathe = extras;
                                    return (
                                        <p>
                                            extras:<input
                                                type="number"
                                                name="mathe"
                                                value={extras}
                                                onChange={handelExtras}
                                            />
                                        </p>
                                    );
                                }}
                            />
                        </EmailContext.Provider>
                    </div>
                </div>
            </div>
        )
    }
}

export default PraApp
