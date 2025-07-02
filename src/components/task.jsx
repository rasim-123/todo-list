import Input from "./input";
import Card from "./Card";
import { useState, useEffect } from "react";

const Tasks = () => {

  const initial_task = [];
  const [tasks, setTasks] = useState(initial_task);


  const addTaskHandler = async (newTask) => {
    let newTaskobj = {
      task_id: Math.random(),
      task_name: newTask
    };
    const response = await fetch("https://todo-list-backend-hlhw.onrender.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTaskobj),
    })
    if (response.status===201){
    getTasks();
    alert("New task added succesfully");
    }
    else{
      alert("Failed to add the task")
    }
  }




  const deleteTaskHandler = async (taskId) => {
    const response = await fetch("https://todo-list-backend-hlhw.onrender.com/"+taskId, {
      method: "DELETE"
    })
    if(response.status===200){
      alert("Task deleted")
      getTasks();
    }
    else{
      alert("couldnt delete the task")
    }
  }





  const getTasks = async () => {
    const response = await fetch("https://todo-list-backend-hlhw.onrender.com/")
    const taskList = await response.json();
    console.log(response)
    setTasks(taskList)
  }



  useEffect(() => {
    getTasks();
  }, []);



  return (
    <div id="tasks">
      <Input onAddTask={addTaskHandler} />

      {
        tasks.map((task) => (
          <Card data={task}
            onDeleteTask={deleteTaskHandler}
          />
        ))
      }

    </div>)
}
export default Tasks;