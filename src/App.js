import React from 'react';
import ArtCalculator from './components/artCalculator'
import MathCalculator from './components/mathCalculator'
import sourceData from './sourceData' 
import './App.css';
import profile, { NameContext, EmailContext } from "./context/profileContext";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.extras = {
      art: 0,
      math: 5
    };
    this.state = {
      Average: null,//平均分
      Subject: [],//科目
       showArt:true,
       showMath:true,
      extras_Average: null,//全部的平均分
      email: profile.email,
      name: profile.name,
      mathExtra:5,
      ArtExtra:0
      
    };
   sourceData.AvgChangeCb=Average=>{
      this.setState({
        Average
      });
   
    };

    sourceData.SubjChangeCb=Subject=>{
    
      this.setState({
        Subject,
        
      })
    }//this is prop
  }
 //constructor complete

 handelContextChangeName = e => {
  e.persist();
  
  this.setState({
    name: e.target.value
  });
};
handelContextChangeEmail = e => {
  e.persist();//persist持久化
  let contextName=e.target.value.substring(0,e.target.value.indexOf("@"));
  
  this.setState({
    email: e.target.value,
    name:contextName
  });
};
handleArt=e=>{
e.persist();

  this.setState({
    showArt:!this.state.showArt
  })
}
handleMath=e=>{
  e.persist();
  this.setState({
    showMath:!this.state.showMath
  })
}
handleExtra=e=>{
  e.persist();
  this.extras[e.target.name]=parseInt(e.target.value,10);
}
//处理额外的附加分
  render(){ 
    
    return (
    
    <div className="App">
         <p>
          email:<input
            name="email"
            value={this.state.email}
            onChange={this.handelContextChangeEmail}
            style={{ width: "200px" }}
          />
          </p>
          <p>
          name:<input
            name="name"
            value={this.state.name}
            onChange={this.handelContextChangeName}
            style={{ width: "200px" }}
            />
        </p>
        <p>
          Subject:{this.state.Subject.map(e =>
            <span key={e.code}>
              {e.code}:{e.score}/
            </span>
          )}
        </p>
        <p>
          Average:{this.state.Average}
          </p>
          <button onClick={this.handleArt} value="Art">
              显示/影藏
            </button>
          <NameContext.Provider 
          value={{
          name: this.state.name,
          changeName: this.handelContextChangeName
        }}>
        {this.state.showArt&&<ArtCalculator title="请计算艺术成绩"></ArtCalculator>}
            
               <p>
                    附加分:
                        <input
                           type="range"
                           min="-20"
                           max="20"
                           step="5"
                          name="art"
                           value={this.state.ArtExtra}
                          onChange={this.handleExtra}
                        />
                      </p>
          </NameContext.Provider>
                 
          <button onClick={this.handleMath} value="Art">
              显示/影藏
            </button>        
          <EmailContext.Provider  value={{
          name: this.state.email,
          changeEmail: this.handelContextChangeEmail
        }}>
         {this.state.showMath&&<MathCalculator title="请计算数学成绩">
          </MathCalculator>} 
          
                <p>
                    附加分:
                        <input
                          type="number"
                          name="math"
                          value={this.state.mathExtra}
                      
                        />
                      </p>
               
                </EmailContext.Provider>

    </div>
  );
}
}
App.contextType = EmailContext;
export default App;
//CONTEXT.Provide提供的值更改时，Consumer必须重新渲染