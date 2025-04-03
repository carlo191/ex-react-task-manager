import { use, useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task);
  const editFormRef = useRef(null);

  const changeEditTask = (key, e) => {
    setEditedTask((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label>
            Nome task:
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => changeEditTask("title", e)}
            />
          </label>
          <label>
            Descrizione task:
            <textarea
              value={editedTask.description}
              onChange={(e) => changeEditTask("description", e)}
            />
          </label>
          <label>
            Stato task:
            <select
              value={editedTask.status}
              onChange={(e) => changeEditTask("status", e)}
            >
              {["To do", "Doing", "Done"].map((status, i) => (
                <option key={i} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => {
        onSave(editedTask);
        onClose(() => editFormRef.current.requestSubmit());
      }}
    />
  );
}
