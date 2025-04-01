import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, removeTask } = useContext(GlobalContext);
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return <h2>Task non trovata</h2>;
  }

  const handleDelite = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo");
      navigate("/");
    } catch (error) {
      alert("Errore durante l'eliminazione della task: " + error.message);
    }
  };

  return (
    <div>
      <h1>Dettaglio Task</h1>
      <p>
        <strong>Nome: </strong>
        {task.title}
      </p>
      <p>
        <strong>Descrizione: </strong>
        {task.description}
      </p>
      <p>
        <strong>Stato: </strong>
        {task.status}
      </p>
      <p>
        <strong>Data creazione: </strong>
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
      <button onClick={handleDelite}>Elimina Task</button>
    </div>
  );
}
