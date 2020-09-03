import React, { useState } from 'react';
/**
 * 附加分滑动条组件
 */
function Extras({sliderExtras}){//父组件SubjectScore提供的方法
    
    const [extras] =useState({art: 0,mathe: 5})
    const [matcheExtra,setMatcheExtra]=useState(extras.mathe);

  const handelExtras=e=>{
    e.persist();
    extras[e.target.name] = parseInt(e.target.value, 10);
    if (e.target.name === "mathe") {
        setMatcheExtra(extras.mathe)
    }
    sliderExtras(extras.mathe);//使用父组件提供的方法并将extras.mathe的值传递给父组件
  }
    return (
      <div>
      extras：{extras.mathe}
     <input
       type="range"
       min="-20"
       max="20"
       step="5"
       name="mathe"
       value={matcheExtra}
       onChange={handelExtras}
     />
     {/* {this.props.render(this.state)} */}
      </div>
    )
}
export default Extras;