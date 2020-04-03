import React from "react";
import "./Calculator.scss";

function Numbers(props) {
  return (
    <div className="number_warp">
      {props.nums.map(e =>
        <button key={e.label}
          onClick={
            () => {props.click(e.label);}
          }
        >
          {e.label}
        </button>
        )}
    </div>
  );
}


const buttons = [
  {
    label: "0"
  },
  {
    label: "1"
  },
  {
    label: "2"
  },
  {
    label: "3"
  },
  {
    label: "4"
  },
  {
    label: "5"
  },
  {
    label: "6"
  },
  {
    label: "7"
  },
  {
    label: "8"
  },
  {
    label: "9"
  }
];
function Actions(props) {
  return (
    <div className="action_warp">
      {props.funs.map(e =>
        <button key={e.label}
        onClick={
          () => {props.click(e.label);}
        } 
        >
          {e.label}
        </button>
        )}
    </div>
  );
}

const funs = [
  {
    label: "+"
  },
  {
    label: "-"
  },
  {
    label: "*"
  },
  {
    label: "/"
  },
  {
    label: "C"
  },
  {
    label: "="
  }
];
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.errorMsg = props.errorMsg || "请输入正确的算术式!";
    this.state = {
      evalStr: "",
      result: ""
    };
  }
  
  
  error = "";

  actionsClick = e => {
    if("C" === e){
      this.error = "";
      this.setState({
        evalStr: "",
        result: ""
      });
      return;
    }
    
    if("" === this.error){
      if("=" === e){
        let result = "";
        try {  
          result = eval(this.state.evalStr);
        } catch (error) {
          result = "";
          this.error = this.errorMsg;
        }
        if(false === /^\d+(\.\d+)?$/.test(result)){
          result = "";
          this.error = this.errorMsg;
        }else {
          console.log(this.props.cb);
          
          if (this.props.cb){
            this.props.cb(result);
          }
        }
        this.setState({
          result
        });
        return;  
      }
      this.setState({  
        evalStr: this.state.evalStr + e
      });
    }
  };

  numClick = e => {
    if("" === this.error){
      this.setState({
        evalStr: this.state.evalStr + e
      });
    }

  };

  inputOnChange = e => {
    e.persist();
    this.setState({
      evalStr: e.target.value
    });
  };
  render() {
    return (
      <div className="warp">
        <p> {this.props.title} </p>
        <input value={this.state.evalStr} onChange={this.inputOnChange} />
        <div className="result">
          {this.state.result === ""? this.error: this.state.result}
        </div>

        <Actions click={this.actionsClick} funs={funs} />

        <Numbers click={this.numClick} nums={buttons} />
      </div>
    );
  }
}
export default Calculator;

