import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="ps-5">
        <NavLink className="navbar-brand" to="/">
          Lista Task
        </NavLink>
      </div>
      <div className="ps-5">
        <NavLink className="navbar-brand" to="/AddTask">
          Add Task
        </NavLink>
      </div>
    </nav>
  );
}
