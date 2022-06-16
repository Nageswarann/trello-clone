import React, { useState } from 'react'
import "./InputContainer.scss"

function InputContainer({updateVal, icon}:{updateVal:(title:string)=>void, icon: string}) {

    const [val, setVal] = useState("")
  
    const handleEnterScenerio = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === "Enter") 
        updateInput();
    }
  
    const updateInput = () => {
      if(val === ""){
        alert("Enter a value");
        return;
      }
      updateVal(val);
      setVal("");
    }
  
    return (
      <div className="input-container">
      <input type="text" onKeyDown={(e) => handleEnterScenerio(e)} value={val} className="new-task-name" placeholder="Add Task" onChange={(e)=>setVal(e.target.value)}/>
      <div onClick={()=>updateInput() }>
        <i className={icon +" add-board-icon"}></i>  
      </div>
    </div>
    )
  }

export default InputContainer