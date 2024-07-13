import React from "react";
import Details from "./Components/Details";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./styles/App.css";
import "./index.css";

function App() {
  return (
    <div>
      <ToastContainer />;
      <Details />
    </div>
  );
}

export default App;
