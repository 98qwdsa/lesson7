import React from "react";
import Art from "./components/artCalculator";
import Mathe from "./components/MathCalulator";
import dataDemo from "./demoData";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    console.log(Mathe.subject);
    super(props);
    this.state = {
      _Average: null,
      _Subject: [],
      showArt: true,
      showMath: true
    };
    dataDemo.aerageChangeCb = _Average => {
      this.setState({
        _Average
      });
    };
    dataDemo.subjectChangeCb = _Subject => {
      this.setState({
        _Subject
      });
    };
  }
  toggle = e => {
    e.persist();
    const value = e.target.value;
    this.setState({
      [`show${value}`]: !this.state[`show${value}`]
    });
  };
  render() {
    return (
      <div className="average_warp">
        <p>
          _Subject:{this.state._Subject.map(e =>
            <span key={e.code}>
              {e.code}:{e.score}/
            </span>
          )}
        </p>
        <p>
          _Average{this.state._Average}
        </p>
        <div className="Calculator_warp">
          <div>
            <button onClick={this.toggle} value="Art">
              显示/影藏
            </button>
            {this.state.showArt && <Art title="请计算美术成绩" />}
          </div>
          <div>
            <button onClick={this.toggle} value="Math">
              显示/影藏
            </button>
            {this.state.showMath && <Mathe title="请计算数学成绩" />}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
