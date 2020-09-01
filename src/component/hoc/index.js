import React, { Component } from 'react';
import MathScore from './MathScore';
import dataDemo from '../../demoData'
import ArtScore from './ArtScore'
import profile, { NameContext, EmailContext } from "../../context/fileContext";
import { Button } from 'antd'




// const MathScoreWithSubscription = withSubscription(
//     MathScore,
//     (DataSource, props) => DataSource.getMathScore(props)
// );

// const BlogPostWithSubscription = withSubscription(
//     CommentList,
//     (DataSource) => DataSource.getBlogPost()

// );

class Index extends Component {



    constructor(props) {
        super(props)

        this.extras = {
            art: 0,
            math: 0
        };
        this.state = {
            Subject: [],
            Average: 0,
            name: profile.name,
            email: profile.email,
            mathExtra: this.extras.math,
            extras_Average: null,
            artExtra: this.extras.art,
            showArt: true,
            showMath: true,
        };

        console.log(profile)

        dataDemo.averageChangeCb = Average => {
            this.setState({
                Average
            });
            this.handelExtras_Average();
        };
        dataDemo.subjectChangeCb = Subject => {
            this.setState({
                Subject
            });
        };
    }
    handelContextChange = e => {
        console.log(e)
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handelExtras = e => {
        e.persist();
        this.extras[e.target.name] = parseInt(e.target.value, 10);
        console.log(e)
        if (e.target.name === "art") {
            this.setState({
                artExtra: this.extras.art
            });
        }
        this.handelExtras_Average();

    };
    handelExtras_Average = () => {
        let extras_Average = null;
        let totle = 0;
        dataDemo._TotalSubject.forEach(e => {
            console.log(e)
            totle += e.score + parseInt(this.extras[e.code], 10);
        });
        extras_Average = (totle / dataDemo._TotalSubject.length).toFixed(2);
        this.setState({
            extras_Average
        });
    };
    toggle = e => {
        const value = e;
        console.log(e)
        this.setState({
            [`show${value}`]: !this.state[`show${value}`]
        });
    };
    render() {
        return (
            <>
                <div className="content">
                    <p>
                        姓名: {this.state.name}
                    </p>
                    <p>
                        邮箱: {this.state.email}
                    </p>
                    <p>
                        科目: {this.state.Subject.map(e =>
                        <span key={e.code}>
                            {e.code}:{e.score} /
              </span>
                    )}
                    </p>
                    <p>
                        平均分: {this.state.Average}
                    </p>
                    <p>
                        附加后平均分: {this.state.extras_Average}
                    </p>
                    <div className="components">
                        <div className="comonent">
                            <Button onClick={this.toggle.bind(this, "Math")}>
                                显示/隐藏
            </Button>
                            <NameContext.Provider
                                value={{
                                    name: this.state.name,
                                    changeName: this.handelContextChange
                                }}
                            >
                                {this.state.showMath && <MathScore
                                    onExtrasChange={this.handelExtras}
                                    extrasElm={(extras, handelExtras) => {
                                        this.extras.math = extras;
                                        return (
                                            <p>
                                                extras:<input
                                                    type="number"
                                                    name="math"
                                                    value={extras}
                                                    onChange={handelExtras}
                                                />
                                            </p>
                                        );
                                    }}
                                />
                                }
                            </NameContext.Provider>
                        </div>
                        <div className="component">
                            <Button onClick={this.toggle.bind(this, "Art")}>
                                显示/隐藏
            </Button>
                            <EmailContext.Provider
                                value={{
                                    name: this.state.email,
                                    changeName: this.handelContextChange
                                }}
                            >
                                {this.state.showArt && <ArtScore
                                    onExtrasChange={this.handelExtras}
                                    extrasElm={(extras, handelExtras) => {
                                        this.extras.art = extras;
                                        return (
                                            <p>
                                                extras:<input
                                                    type="range"
                                                    min="-5"
                                                    max="20"
                                                    name="art"
                                                    value={extras}
                                                    onChange={handelExtras}
                                                />
                                                <span>{this.state.artExtra}</span>
                                            </p>

                                        );
                                    }}
                                />}
                            </EmailContext.Provider>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Index