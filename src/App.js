import React, { useState } from "react";
import Art from "./components/artCalculator";
import Mathe from "./components/MathCalulator";
import dataDemo from "./demoData";
import "./App.scss";

import profile, { NameContext, EmailContext } from "./context/profieContext";

let extras = {
  art: 0,
  mathe: 5
};
function App () {
  // constructor(props) {
  //   super(props);

    
  // }

  // this.state = {
  //   _Average: null,
  //   _Subject: [],
  //   showArt: true,
  //   showMath: true,
  //   extras_Average: null,
  //   email: profile.email,
  //   name: profile.name,
  //   matcheExtra: this.extras.mathe
  // };
  let [_Average,set_Average] = useState(0);
  let [_Subject,set_Subject] = useState([]);
  let [showart,setShowart] = useState(true);
  let [showmath,setShowmath] = useState(true);
  let [extras_Average,setExtras_Average] = useState(0);
  let [email,setEmail] = useState(profile.email);
  let [name,setName] = useState(profile.name);
  let [matcheExtra,setMatcheExtra] = useState(extras.mathe);
  dataDemo.aerageChangeCb = _Average => {
    // this.setState({
    //   _Average
    // });
    set_Average(_Average);
    handelExtras_Average();
  };
  dataDemo.subjectChangeCb = _Subject => {
    // this.setState({
    //   _Subject
    // });
    set_Subject(_Subject);
  };

  function handelContextChange(e){
    e.persist();
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
    let eleName = e.target.name;
    if(eleName === 'email'){
      setEmail(e.target.value)
    }else if(eleName === 'name'){
      setName(e.target.value)
    }
    
  };
  function handelExtras(e){
    e.persist();
    // this.extras[e.target.name] = parseInt(e.target.value, 10);
    let eleName = e.target.name;
    if(eleName === "art"){
      // setExtras({...extras,"art":parseInt(e.target.value, 10)});
      extras.art = parseInt(e.target.value, 10);
    }
    if (e.target.name === "mathe") {
      // setExtras({...extras,"mathe":parseInt(e.target.value, 10)});
       extras.mathe = parseInt(e.target.value, 10);
      setMatcheExtra(extras.mathe);
      // this.setState({
      //   matcheExtra: this.extras.mathe
      // });
    }
  };
  function handelExtras_Average () {
    let extras_Average = null;
    let totle = 0;
    dataDemo._TotalSubject.forEach(e => {
      totle += e.score + parseInt(extras[e.code], 10);
    });
    extras_Average = (totle / dataDemo._TotalSubject.length).toFixed(2);
    // this.setState({
    //   extras_Average
    // });
    setExtras_Average(extras_Average);
  };
  function toggle (e){
    e.persist();
    const value = e.target.value;
    // this.setState({
    //   [`show${value}`]: !this.state[`show${value}`]
    // });
    if("Art" === value){
      setShowart(!showart)
    }
    if("Math" === value){
      setShowmath(!showmath)
    }
    
  };
 
    return (
      <div className="average_warp">
        <p>
          email:<input
            name="email"
            value={email}
            onChange={handelContextChange}
            style={{ width: "200px" }}
          />
        </p>
        <p>
          name:{name}
        </p>
        <p>
          _Subject:{_Subject.map(e =>
            <span key={e.code}>
              {e.code}:{e.score}/
            </span>
          )}
        </p>
        <p>
          _Average:{_Average}
        </p>
        <p>
          Extras_Average: {extras_Average}
        </p>
        <div className="Calculator_warp">
          <div>
            <button onClick={toggle} value="Art">
              显示/影藏
            </button>
            <NameContext.Provider
              value={{
                name: name,
                changeName: handelContextChange
              }}
            >
              {showart &&
                <Art
                  title="请计算美术成绩"
                  onExtrasChange={handelExtras}
                  extrasElm={(extra, handelExtras) => {
                    extras.art = extra;
                    return (
                      <p>
                        extras:<input
                          type="number"
                          name="art"
                          value={extra}
                          onChange={handelExtras}
                        />
                      </p>
                    );
                  }}
                />}
            </NameContext.Provider>
          </div>
          <div>
            <button onClick={toggle} value="Math">
              显示/影藏
            </button>
            <EmailContext.Provider value={email}>
              {showmath &&
                <Mathe title="请计算数学成绩">
                  <p>
                    extras:<input
                      type="range"
                      min="-20"
                      max="20"
                      step="5"
                      name="mathe"
                      value={matcheExtra}
                      onChange={handelExtras}
                    />
                    <span>{matcheExtra}</span>
                  </p>
                </Mathe>}
            </EmailContext.Provider>
          </div>
        </div>
      </div>
    );
  
}
App.contextType = NameContext;
export default App;