import { Outlet } from "react-router-dom";
import NavBar from "./src/components/NavBar";
import Footer from "./Footer";

export default function DefaultLayout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
