import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";
import TaskRow from "../src/components/TaskRow";
import Modal from "../src/components/Modal";

function debounce(func, delay) {
  let timeoutId;
  return (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(value);
    }, delay);
  };
}

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Tasks:", tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useCallback(debounce(setSearchQuery, 500), []);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("1");
  const sortIcon = sortOrder === "1" ? "↓" : "↑";
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(key);
      setSortOrder("1");
    }
  };
  const filteredAndSortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        let comparison;
        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          const statusOptions = ["To do", "Doing", "Done"];
          comparison =
            statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
        } else if (sortBy === "createdAt") {
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return comparison * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);
  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        placeholder="Cerca"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Nome {sortBy === "title" && sortIcon}
            </th>
            <th onClick={() => handleSort("status")}>
              Stato {sortBy === "status" && sortIcon}
            </th>
            <th onClick={() => handleSort("createdAt")}>
              {" "}
              Data di creazione {sortBy === "createdAt" && sortIcon}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
