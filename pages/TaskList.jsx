import { useContext } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Tasks:", tasks);
  return (
    <div>
      <h1>Task List</h1>
    </div>
  );
}
