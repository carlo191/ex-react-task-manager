import e from "cors";
import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";
const symbols = "?!@#$%^&*()_+[]{}|;':\",./<>?`~";

export default function Addtask() {
  const { addTask } = useContext(GlobalContext);
  const [taskTitle, setTaskTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const taskNameError = useMemo(() => {
    if (!taskTitle.trim()) {
      return "Il nome della task non può essere vuoto";
    }
    if ([...taskTitle].some((char) => symbols.includes(char))) {
      return "Il nome della task non può contenere caratteri speciali";
    }
    return "";
  }, [taskTitle]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskNameError) {
      alert(taskNameError);
      return;
    }
    const newTask = {
      title: taskTitle.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      await addTask(newTask);
      alert("Task aggiunta con successo");
      setTaskTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";
    } catch (error) {
      alert("Errore durante l'aggiunta della task: " + error.message);
    }
  };

  return (
    <div>
      <h1>Add task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome task:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Nome task"
          />
          {taskNameError && <p style={{ color: "red" }}>{taskNameError}</p>}
        </label>
        <label>
          Descrizione:
          <textarea ref={descriptionRef} placeholder="Descrizione"></textarea>
        </label>
        <label>
          Stato:
          <select ref={statusRef} defaultValue="To do">
            {["To do", "Doing", "Done"].map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={taskNameError}>
          Aggiungi task
        </button>
      </form>
    </div>
  );
}
