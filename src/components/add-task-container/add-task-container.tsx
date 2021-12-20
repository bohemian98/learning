import React ,{useState} from 'react';
import App from '../../App';
interface IAddTaskContainer {
    message: string;
    toggle:boolean;
    setToggle:any;
  };
  export const AddTaskContainer = ({ message,toggle,setToggle}: IAddTaskContainer) => {
    const [inputText,setInputText] = useState("");
  
    async function sendTask(){
    await fetch("http://localhost:3000/list",{
      method:"POST",
      body: JSON.stringify({"task":inputText}),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json().then((jsonResponse)=>{
      return {
        statusCode:response.status,
        json:jsonResponse
      }
    }))
    .catch(error => {
      console.log('error', error);
      return {
        statusCode:500,
        json:{"ERROR":error}
      }
    }); 
}
      return(
        <>
          <h4>{message}</h4>
          <div className="grid">
            <input type="text" className="textbox" placeholder="Enter your task here" onChange={(e)=>{
              setInputText(e.target.value); 
            }} value={inputText}/>
            <button onClick={async (e)=>{
              if(inputText.length!==0)
              { 
                await sendTask();
                setToggle(!toggle);
              }
              else{
                alert("Enter you task. Task can't be empty!!")
              }
              setInputText("")
            }}
            >+ Add Task</button>
          </div>
        </>
      );
  }
