import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";
import Modal from "../src/components/Modal";
import EditTaskModal from "../src/components/EditTaskModal";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const task = tasks.find((t) => t.id === parseInt(id));
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  if (!task) {
    return <h2>Task non trovata</h2>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo");
      navigate("/");
    } catch (error) {
      alert("Errore durante l'eliminazione della task: " + error.message);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      setShowEditModal(false);
    } catch (error) {
      alert("Errore durante l'aggiornamento della task: " + error.message);
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

      <button onClick={() => setShowModal(true)}>Elimina Task</button>
      <button onClick={() => setShowEditModal(true)}>Modifica Task</button>

      <Modal
        title="Conferma Eliminazione"
        content={<p>Sei sicuro di voler eliminare questa task?</p>}
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
      <EditTaskModal
        task={task}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
      />
    </div>
  );
}
