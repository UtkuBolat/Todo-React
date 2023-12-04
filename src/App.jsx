import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const TASKS_URL = "http://localhost:3000/tasks";
  const createTask = async (title, taskDesc) =>{
    const response =  await axios.post(TASKS_URL, {title, taskDesc});
    const createdTasks = [
      ...tasks,
      {title: response.data.title, taskDesc: response.data.taskDesc}
    ];
    setTasks(createdTasks);
  };

  const fetchTasks = async () =>{
      const response = await axios.get(TASKS_URL)
      setTasks(response.data);
  }

  useEffect(()=>{
    fetchTasks();
  }, [] );

  const deleteTaskById = async (id) => {
    await axios.delete(`${TASKS_URL}/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTasks);
  }

  const editTaskById = async (id, newTitle, newTaskDesc ) => {
    await axios.put(`${TASKS_URL}/${id}`,{
      title:newTitle,
      taskDesc:newTaskDesc,
    });
    const updatedTasks = tasks.map((task) => {
      if(task.id === id){
        return{id,title:newTitle, taskDesc:newTaskDesc}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>Görevler</h1>
      <TaskList tasks={tasks} onDelete={deleteTaskById} onUpdate={editTaskById} />
    </div>
  );
}

export default App; 
