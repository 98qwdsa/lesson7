import React from "react";
import "./Calculator.css";
import { useState,useEffect } from "react";

//如果能确定其他地方会使用该组件可以申明为一个 class 然后export出去
export class Numbers extends React.Component {
  render() {
    return (
      <div className="number_warp">
        {/* 根据props传入的数据生成按钮 */}
        {this.props.nums.map(e =>
          <button
            key={e.label}
            onClick={() => {
              this.props.click(e.label);
            }}
          >
            {e.label}
          </button>
        )}
      </div>
    );
  }
}

export default function Calculator(props){
  let errorMsg = props.errorMsg || "请输入正确的算术式!";
  let [evalStr,setEvalStr] = useState('');
  let [result,setResult] = useState('');
  useEffect(()=>{
    console.log("result",result);
    document.title = result;
    return(()=>{
      document.title = "";
    })
  },[result])
  
  // constructor(props) {
  //   super(props);
  //   this.errorMsg = props.errorMsg || "请输入正确的算术式!";
  //   this.state = {
  //     evalStr: "",
  //     result: ""
  //   };
  // }
  // 组件内部的数据最好初始化在改class属性上
  let error = "";
  //定义计算按钮的初始数据
  let nums = [
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
  // 定义算术方法的 初始数据
  let funs = [
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
  // 内部的无状态组件方法推荐使用UI前缀区分一下
  function UIActions(props) {
    return (
      <div className="action_warp">
        {/* 根据props传入的数据生成按钮 */}
        {props.funs.map(e =>
          <button
            key={e.label}
            onClick={() => {
              props.click(e.label);
            }}
          >
            {e.label}
          </button>
        )}
      </div>
    );
  }
  //算式方法组件点击后处理方法
  function actionsClick(e){
    // 如果有错误信息，只能点击C按钮
    // 如果点击C按钮清除 错误信息,算式，计算结果
    // let evalStr = this.state.evalStr,
    let tempEvalStr = evalStr;
    let tempResult = result;
    if ("C" === e) {
      // this.error = "";
      error = "";
      tempEvalStr = "";
      tempResult = "";
    } else {
      if ("" !== error) {
        return;
      }
      // 如果点击的=,计算算式。 如果错误显示错误提示
      if ("=" === e) {
        try {
          tempResult = eval(evalStr);
        } catch (e) {
          tempResult = "";
          error = errorMsg;
        }
        if (false === /^\d+(\.\d+)?$/.test(tempResult)) {
          tempResult = "";
          error = errorMsg;
        } else {
          if (props.cb) {
            props.cb(tempResult);
          }
        }
      } else {
        // 如果点击是一般计算方法符号，在当前算术式后面累加
        tempEvalStr = evalStr + e;
      }
    }

    // 同一个逻辑片段不管是逻辑还是肉眼上都要尽可能的减少setState的调用。
    // this.setState({
    //   evalStr,
    //   result
    // });
    setEvalStr(tempEvalStr);
    setResult(tempResult);
  };
  //数字按钮点击后的处理方法
  function numClick (e){
    if ("" === error) {
      //直接在当前算式后面累加输入的数字
      // this.setState({
      //   evalStr: this.state.evalStr + e
      // });
     
      
      setEvalStr(evalStr+e);
    }
  };
  //手动修改算式的处理方法
  function inputOnChange (e){
    if ("" === error) {
      e.persist();
      //算式显示区域可以手动修改算式
      // this.setState({
      //   evalStr: e.target.value
      // });
      
      setEvalStr(e.target.value)
    }
  };
 
    return (
      <div className="warp">
        <input value={evalStr} onChange={inputOnChange} />
        {/* 显示计算结果和错误提示 */}
        <div className={error ? "result error" : "result"}>
          {result === "" ? error : result}
        </div>

        {/* 引入方法按钮组件 */}
        <UIActions click={actionsClick} funs={funs} />

        {/* 引入数字按钮组件 */}
        <Numbers click={numClick} nums={nums} />
      </div>
    );
  
}
//变量申明在class外部在文件加载的时候变量就会初始化一直占用一定空间，且不会随组件初始化而初始化，不会随组件销毁而销毁。
//变量申明在class外部可以在需要的时候export出去给其他组件使用。
