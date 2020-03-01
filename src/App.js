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
      showMath: true,
      extras_Average: null,
      extras: 5
    };
    this.extras = {
      art: 0,
      mathe: 0
    };
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
  handelExtras = e => {
    this.extras[e.code] = e.extras;
  };
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
        <p>
          Extras_Average: {this.state.extras_Average}
        </p>
        <div className="Calculator_warp">
          <div>
            <button onClick={this.toggle} value="Art">
              显示/影藏
            </button>
            {this.state.showArt &&
              <Art
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
              />}
          </div>
          <div>
            <button onClick={this.toggle} value="Math">
              显示/影藏
            </button>
            {this.state.showMath &&
              <Mathe title="请计算数学成绩">
                <p>
                  extras:<input
                    type="range"
                    min="-20"
                    max="20"
                    step="5"
                    name="mathe"
                    value={this.state.extras}
                    onChange={e => {
                      const extras = e.target.value;
                      this.handelExtras({
                        code: "mathe",
                        extras
                      });
                      this.setState({ extras });
                    }}
                  />
                  <span>{this.state.extras}</span>
                </p>
              </Mathe>}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
