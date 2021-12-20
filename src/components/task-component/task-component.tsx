import React from "react";
import { useState } from 'react'
interface ITask{
    item:any,
    index:any,
    toggle:boolean,
    setToggle:any
}
export const Task =({item,index,toggle,setToggle}:ITask)=>{
    const [done,setDone]=useState(false);

    async function removeTask(index:any) 
    {
        
        await fetch("http://localhost:3000/list/"+index, {
            method: 'DELETE',
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        console.log("Item deleted with index:",index)
    }

    return(
        <div className="card">
        <div className="container">
            <p style={{textDecoration: done ? "line-through" : "none"}}>{item.task}</p>
            <button type="button" onClick={()=>setDone(!done)}>Done</button>
            <button 
            onClick={async (e)=>{await removeTask(item.id);
                console.log("Before toggle",toggle);
                setToggle(!toggle);
                console.log("After toggle",toggle);
            }
            }>Remove</button>
        </div>
        </div>
      );
}