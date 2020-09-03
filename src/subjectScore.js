import React,{useEffect,useState} from 'react';
import Calculator from './components/Calculator';
import Extras from './components/extrasFun';
import './subjectScore.css'
/**
 * 父组件SubjectScore
 */
function SubjectScore() {
  const [email,setEmail]=useState("");//email的状态
  const [name,setName]=useState("");//name的状态
  const [showArt,setAreShow]=useState(true);//提供给Art计算器“show/hide”按钮的状态
  const [showMath,setMathShow]=useState(true);//提供给Math计算器“show/hide”按钮的状态
  const [artScore,setArt]=useState(0);//Art的分数
  const [mathScore,setMath]=useState(0);//Math的分数
  const [isArt,setIsArt]=useState("isArt");//提供判断是否为Art计算器的状态
  const [isMath,setIsMath]=useState("isMath");//提供判断是否为Math计算器的状态
  const [avg,setAvg]=useState(0);//两科的平均值
  const [extras_avg,setExtras_avg]=useState(0);//两科附加分的平均值
  const [artExtras,setArtExtras]=useState(0);//Art的附加分
  const [mathExtras,setMathExtras]=useState(0);//Math的附加分
 
  //当email的状态发生变化便会触发Name状态的变化
  useEffect(()=>{
    var index=email.indexOf('@');
    setName(email.substring(0,index));
  },[email])
  //改变Email状态的函数
  const changeEmail=(e)=>{
    setEmail(e.target.value);
  }
  //隐藏或显示Art计算器
  const artShowChange=()=>{
    setAreShow(!showArt);
  }
  //隐藏或显示Math计算器
  const mathShowChange=()=>{
    setMathShow(!showMath);
  }
  //设置Art的分数，接收子组件Calculator传递过来的输入值
  const setArtScore=(newInput)=>{
      setArt(artScore+newInput);
  }
  //设置Math的分数，接收子组件Calculator传递过来的输入值
  const setMathScore=(newInput)=>{
      setMath(mathScore+newInput);
  }
  //子组件点击“C”触发父组件提供的方法并将父组件的两科分数清零
  const pushArtC=()=>{
    setArt(0)
  }
  const pushMathC=()=>{
    setMath(0)
  }
  //子组件点击“=”触发父组件提供的方法并计算两科的平均值
  const pushArtEquel=()=>{
    var sum=parseInt(artScore)+parseInt(mathScore);
    setAvg(sum/2);
  }
  const pushMathEquel=()=>{
    var sum=parseInt(artScore)+parseInt(mathScore);
    setAvg(sum/2);
  }
  //Art的附加分输入框变化触发对附加分状态修改并计算出此时两科的附加平均分
  const ExtrasInputChange=(e)=>{
    setArtExtras(parseInt(e.target.value));
    var avg=parseInt(e.target.value)+mathExtras
    setExtras_avg(avg/2);
  }

  //子组件滑动附加分条触发父组件提供的方法并计算出当前两科的附加平均分
  const getSliderExtras=(matcheExtra)=>{
    setMathExtras(parseInt(matcheExtra));
    var avg=parseInt(matcheExtra)+artExtras;
    setExtras_avg(avg/2);
  }

  
  return (
    <div className="App">
      <div className="emailAndName">
            email:<input value={email} onChange={changeEmail}></input><br/>
            name:{name}
      </div>
      <div className="subjectAndAvg">
            Subject:art:{artScore}math:{mathScore}<br/>
                    Average:{avg}<br/>
            Extras_Average:{extras_avg}
      </div>
      <div className="artSpace">
            <button onClick={artShowChange}>show/hide</button>
            {showArt?<div>
              请计算美术成绩<br/>
              <input value={name}></input>
              <Calculator pushArt={setArtScore} isArt={isArt} pushArtC={pushArtC} pushArtEquel={pushArtEquel}/>
              extras:<input onChange={ExtrasInputChange}></input>
            </div>:null}
      </div>
      <div className="mathSpace">
          <button onClick={mathShowChange}>show/hide</button>
          {showMath?<div>
            请计算数学成绩<br/>
            <input value={email}></input>
            <Calculator pushMath={setMathScore} isMath={isMath} pushMathC={pushMathC} pushMathEquel={pushMathEquel}/>
            <Extras sliderExtras={getSliderExtras} />
          </div>:null}
      </div>
    </div>
  );
}


export default SubjectScore;
