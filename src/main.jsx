import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NorvayBar from "./NorvayBar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NorvayBar />
    <App />
  </React.StrictMode>
);
