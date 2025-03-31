import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import Addtask from "./pages/Addtask";
import TaskList from "./pages/TaskList";
import TaskDetails from "./pages/TaskDetails";
import GlobalProvider from "./src/contexts/GlobalContext";

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/AddTask" element={<Addtask />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}
