import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/route";
import "./index.css";
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
    
    <ToastContainer position="top-right" autoClose={2000} />
  </React.StrictMode>
);
