// ---------------------------------------------------------------------------
// Application Entry Point
// ---------------------------------------------------------------------------
// Mounts the React app and imports global styles. Strict mode is enabled
// for development warnings.
// ---------------------------------------------------------------------------

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "lenis/dist/lenis.css";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
