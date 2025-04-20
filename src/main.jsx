import { createRoot } from "react-dom/client";
import "./index.css";
import Navigate from "./Navigate.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navigate />
  </BrowserRouter>
);
