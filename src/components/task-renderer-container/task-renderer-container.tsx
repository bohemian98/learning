import { useState } from 'react'
import './task-renderer-container.css'
import {Task} from '../task-component/task-component'
interface IList{
  list:IList[],
  toggle:boolean,
  setToggle:any
}

export const TaskRendererContainer = ({list,toggle,setToggle}:IList) => {
  //console.log("LLLLIIISSSTTT",list)
  return(
    <div>
      {list.map((item:any,id:number)=>(
        <Task item={item} index={id} toggle={toggle} setToggle={setToggle}/>
      ))}
    </div>
  );
}


//use ui/li for each task
//re-render the item and not the list 
//Apollo has it's own state so done and remove will not work as expected.
//Reducer