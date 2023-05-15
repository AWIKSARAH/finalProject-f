import { Outlet } from "react-router";
import "../../App.css";
import Navbar from "../navbar/Navbar";
import Footer from "../../container/footer/Footer";

function Layout() {
  return (
    <div className="Layout">
      <div className="gradient__bg">
        <div className="bg__bg">
          {" "}
          <Navbar></Navbar>
          <Outlet/>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
