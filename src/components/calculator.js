import React from 'react'
import './calculator'
export default class Calculator extends React.Component{
    constructor(props) {
        super(props);//初始化
        
        this.state = {
            name:"",
            inputValue: '',
            list: ['0',
                '1','2','3',
                '4','5','6',
                '7','8','9','.'],
            exList:['+','-','*','/','back','=','AC']
        }
    }
    handleClick(e) {
        var result = this.state.inputValue;
        var value = e.target.value;
       
        console.log(result);
          this.setState({
            inputValue: result + value

        })
    }
    handleExpression(e){
        var result = this.state.inputValue;
        var value = e.target.value;
        this.setState({
            inputValue: result + value
        })
        if (value === 'AC') {
            this.setState({ inputValue:""})
         }
         if (value == 'back') {
            try{this.setState({ inputValue:result.substring(0, result.length - 1) })}
           catch(Exception){
            this.setState({ inputValue:""})  
           }
         }
         if (value == '=') {
             try{ var chanInputvalue =eval(result);
                     this.props.cb(chanInputvalue)
                 this.setState({ inputValue: chanInputvalue })
                  
             }catch(error){
                 this.setState({ inputValue: "你输入的算式有错误" })
             }
         }
    }
    render() {
        
        return (<div id="mune">
           <form><input type="text" id="result" value={this.state.inputValue} /></form>
            <div id="button">
            {
            this.state.list.map((item,index) =>{
                
                return (
                <button id="d1" key = {index} onClick={this.handleClick.bind(this)}value={item}>{item}</button>)  
            })
            }
            </div>
            <div id="button">
               {
            this.state.exList.map((item,index) =>{
                return (
                <button id="dAC" key = {index} onClick={this.handleExpression.bind(this)}value={item}>{item}</button>)  
            })
            }
            </div>
        </div>);
    }
}
