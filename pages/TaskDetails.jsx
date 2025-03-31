import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";

export default function TaskDetails() {
  const { id } = useParams();
  const {tasks} = useContext(GlobalContext)
  const task= tasks.find(t ==> t.id === parseInt(id))
  if(!task){
    return <h2>Task non trovata</h2>
  }
  const handleDelite = () => {
    console.log(task.id)}
  return(
    <div>
        <h1>Dettaglio Task</h1>
        <p><strong>Nome:{task.title} </strong></p>
        <p><strong>Descrizione:{task.description}</strong></p>
        <p><strong>Stato:{task.status}</strong></p>
        <p><strong>Data creazione:{new Date(task.createdAt).toLocaleDateString()}</strong></p>
<button onClick={handleDelite}>Elimina Task</button>

    </div>
  )
}
