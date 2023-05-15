import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./components/routes";
function App() {
  return (
    <BrowserRouter>
    <AllRoutes />
  </BrowserRouter>
  );
}

export default App;
