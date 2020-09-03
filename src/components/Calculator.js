import React,{useState} from 'react';
/**
 * 计算器组件
 */
function Calculator({pushArt,pushMath,isArt,isMath,pushArtC,pushMathC,pushArtEquel,pushMathEquel}){//父组件SubjectScore提供的函数及属性
  const [inputValue,setInputvalue]=useState("");//输入框的值
  const [nums,setNums]=useState([1,2,3,4,5,6,7,8,9,0]);//键盘数字
  const [funs,setFuns]=useState(["+","-","*","/","C","="]);//键盘运算符
  //点击数字触发的函数
  const handleClickNums=(e)=>{
    var newInput=e.target.value;
    setInputvalue(inputValue+newInput);
    if(isArt==="isArt"){//判断是属于Art上的计算器
      pushArt(newInput);//将输入的值传递给父组件提供的pushArt方法，并将输入值传递给父组件
    }if(isMath==="isMath"){
      pushMath(newInput);
    }
  }

  //点击运算触发的函数
  const handleClickFuns=(e)=>{
    if(e.target.value==="="){
      setInputvalue("");
      if(isArt==="isArt"){
        pushArtEquel();//如果是Art上的键盘则触发父组件提供的pushArtEquel方法
      }if(isMath==="isMath"){
        pushMathEquel();//如果是Math上的键盘则触发父组件提供的pushMathEquel方法
      }
      
    }if(e.target.value==="C"){
      
      setInputvalue("");//清除输入
      if(isArt==="isArt"){
        pushArtC();//触发父组件提供的pushArtC方法
      }if(isMath==="isMath"){
        pushMathC();//触发父组件提供的pushMathC方法
      }

    }
  }
 
  return(
    <div>
      <input value={inputValue}></input><br/>
        {nums.map((item,index) =>
          <button
            key={index}
            value={item}
            onClick={handleClickNums}
          >
            {item}
          </button>
        )}<br/>
        {funs.map((item,index) =>
          <button
            key={index}
            value={item}
            onClick={handleClickFuns}
          >
            {item}
          </button>
        )}
    </div>
  )

}
export default Calculator;

