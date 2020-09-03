import React from "react";

export default class PraFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      result: ""
    };
  }

  // 方法的初始数据
  funs = [
    {
      label: "清空"
    },
    {
      label: "提交"
    }
  ];
  // 内部的无状态组件方法推荐使用UI前缀区分一下
  UIActions(props) {
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

  actionsClick = e => {
    // 如果点击清空，进行清空数据
    let inputValue = this.state.inputValue, result;
    if ("清空" === e) {
      this.error = "";
      inputValue = "";
      result = "";
    }
    // 如果点击的提交,进行提交input数据
    if ("提交" === e) {
      try {
        // eslint-disable-next-line no-eval
        result = eval(this.state.inputValue);
      } catch (e) {
        result = "";
      }
      if (this.props.cb) {     //通过prop的cb属性吧当前计算结果传到父级
        this.props.cb(result);
      }
    }
    this.setState({
      inputValue,
      result
    });
  };

  //手动输入input值
  inputOnChange = e => {
    e.persist();
    //显示手动输入input值
    this.setState({
      inputValue: e.target.value
    });

  };
  render() {
    return (
      <>
        <div className="warp">
          <input value={this.state.inputValue} onChange={this.inputOnChange} placeholder="请输入成绩" />
        </div>
        <div>
          {/* 引入方法按钮组件 */}
          <this.UIActions click={this.actionsClick} funs={this.funs} />
        </div>
      </>
    );
  }
}

