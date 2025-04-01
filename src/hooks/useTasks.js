import { useState, useEffect } from "react";

const { VITE_API_URL } = import.meta.env;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);
  const addTask = async (newtask) => {
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newtask),
    });
   const {success, message,task}=  await response.json();
   if ( ! success) {
    throw new Error(message);
    
   }
   setTasks((prevTasks) => [...prevTasks, task]);
  };
  const removeTask = async (id) => {
    const response = await fetch(`${VITE_API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if(!success){
      throw new Error(message);
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const updateTask = (updatedTask) => {};
  return { tasks, addTask, removeTask, updateTask };
}
