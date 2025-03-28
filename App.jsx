import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import Addtask from "./pages/Addtask";
import TaskList from "./pages/TaskList";
import GlobalProvider from "./src/contexts/GlobalContext";

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/AddTask" element={<Addtask />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}
