const dataSource={
    Avg:0,
    TotalSubj:[],
  
    setAvg(){
    let TotalScore=0;
    this.TotalSubj.forEach(e=>{
    TotalScore+=e.score;})//所有科目分数相加
    this.Avg=(TotalScore/this.TotalSubj.length)//计算平均分
    this.AvgChangeCb&&this.AvgChangeCb(this.Avg)
   
    //回调函数，告诉调用函数平均分改变了 
    },
    addSubj(subj){
       var flag=1;
        
        this.TotalSubj.map( e=>{
         if(e.code==subj.code){
             flag=0;
           
         }
        })
        if(flag==1){
            this.TotalSubj.push(subj);
        }
        this.SubjChangeCb&&this.SubjChangeCb(this.TotalSubj)
    },
    //这里拦截了那些复用了的Calculator
    editScore(subj){
      this.TotalSubj=this.TotalSubj.map( e=>{
          if(e.code===subj.code&&e.code!=null){
              return subj;
          }
          return{...e}//在result
      })
    this.setAvg();
    this.SubjChangeCb&&this.SubjChangeCb(this.TotalSubj)//不回调不知道哪个改了
    },
    AvgChangeCb:null,
    SubjChangeCb:null,
}
export default dataSource;