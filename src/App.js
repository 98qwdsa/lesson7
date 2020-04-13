import React from 'react';
import './App.css';
import dataDemo from "./common/demoData";
import Art from "./calculator/Art";
import Math from "./calculator/Math";
import profiler, { NameContext, EmailContext } from "./common/profieContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _Average: null,
      _Subject: [],
      showArt: true,
      showMath: true,
      extras_Average: null,
      extras: 5,
      email: profiler.email,
      nameContext: {
        name: profiler.name,
        changeName: this.changeName
      }
    };
    this.extras = {
      art: 0,
      math: 0
    }
    dataDemo.averageChangeCb = _Average => {
      this.setState({
        _Average
      });
      this.handleExtras_Average();
    };
    dataDemo.subjectChangeCb = _Subject => {
      this.setState({
        _Subject
      });
    };
  }

  changeName = e => {
    e.persist();
    this.setState({
      nameContext: {
        name: e.target.value,
        changeName: this.changeName
      }
    });
  }

  handleExtras = e => {
    this.extras[e.code] = e.extras;
  };

  handleExtras_Average = () => {
    let extras_Average = null;
    let totle = 0;
    dataDemo._TotalSuject.forEach(e => {
      totle += e.score + parseInt(this.extras[e.code], 10);
    });
    extras_Average = (totle / dataDemo._TotalSuject.length).toFixed(2);
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
      <div>
        <div className="p1">
          <p>
            email:<input value={this.state.email} onChange={ e => {
              this.setState({
                email: e.target.value
              });
            }}
            style={{ width: "200px" }} />
          </p>
          <p>name: {this.state.nameContext.name}</p>
          <p>
            _Subject:{this.state._Subject.map(e =>
              <span key={e.code}>
                {e.code}:{e.score} /
              </span>
              )}
          </p>
          <p> _Average:{this.state._Average}</p>
          <p>Extras_Average: {this.state.extras_Average}</p>
        </div>
        
        <div className="calculator">
          <div className="art">
            <button onClick={this.toggle} value="Art">
              显示/隐藏
            </button>
            <NameContext.Provider value={this.state.nameContext}>
              {this.state.showArt && 
              <Art 
                title="请计算美术成绩"
                onExtrasChange={this.handleExtras}
                extrasElm={(extras, handleExtras) => {
                  this.extras.art = extras;
                  return (
                    <p>
                      extras:<input type="number" name="art" value={extras} onChange={handleExtras} />
                    </p>
                  );
                }}
              />}
            </NameContext.Provider>
          </div>
          <div className="match">
            <button onClick={this.toggle} value="Math">
              显示/隐藏
            </button>
            <EmailContext.Provider value={this.state.email}>
              {this.state.showMath && 
              <Math title="请计算数学成绩">
                {
                  () => {
                    return (
                      <p>
                        extras:<input type="range" min="-20" max="20" step="5" name="math" value={this.state.extras} onChange={e => {
                          const extras = e.target.value;
                          this.handleExtras({
                            code: "math",
                            extras
                          });
                          this.setState({ extras});
                        }}
                        />
                        <span>{this.state.extras}</span>
                      </p>
                    );
                  }
                } 
              </Math>}
            </EmailContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
