import React, { Component } from 'react';
import './App.css';
import Print from './component/print/Print'
import Number from './component/number/Number'
import Operator from './component/operator/Operator'
import { message } from 'antd';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      result: '0',
      error: '请输入数字或符号进行计算'
    }
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);

  }

  render() {

    const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]

    const operator = ["+", "-", "*", "/", "c", "="]


    return (
      <div>
        <div>
        </div>
        <Print
          result={this.state.result}
          error={this.state.error}
        />
        <div className="operator-content">
          {
            operator.map((item, index) => {
              return <Operator val={item} key={index}
                handleOperator={this.handleOperator}
              />
            })
          }
        </div>

        <div className="num-content">
          {
            number.map((item, index) => {
              return <Number val={item} key={index}
                handleNumber={this.handleNumber} />
            })
          }
        </div>
      </div>
    )
  }
  handleOperator(val) {
    var result = this.state.result
    //归零
    if (val === "c") {
      this.setState({
        result: 0,
        error: '请输入数字或符号进行计算'
      })
      if (this.props.score) {
        this.props.score(0);
        return
      }
      return
      //计算
    } else if (val === "=") {
      if (this.props.score) {
        this.props.score(parseInt(result));
      }
      try {
        this.setState({
          result: eval(result),
          error: "结果你算对了吗"
        })
      } catch (e) {
        this.setState({
          error: "算式格式错误"
        })
      }
      return
    } else {
      //符号重复输入
      try {
        var arr = result.split('')
        var lastKey = arr[arr.length - 1]
        console.log(arr)
      } catch (error) {
        console.log(error)
      }
      if ((lastKey === '+' || lastKey === '-' || lastKey === '*' || lastKey === '/' || lastKey === '.')) {
        arr[arr.length - 1] = val
        console.log(arr)
        result = arr.join('')
        this.setState({
          result: result
        })
        return
      }
    }

    this.setState({
      result: result + val
    })
  }
  handleNumber(val) {
    var result = this.state.result
    if (result === '0' || result === 0) {
      this.setState({
        result: val
      })
      return
      //只能存在一个小数点
    } else
      //  if (result.indexOf(".") !== -1 && val === ".") {
      //   return
      // } else 
      if (result.length === 9) {
        message.error('超过本计算器的计算能力');
        return
      } else {
        this.setState({
          result: result + val
        })
      }
  }
}

export default App;
