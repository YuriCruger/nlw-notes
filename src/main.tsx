import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import { Routes } from "./routes";
import { AuthProvider } from "./hooks/auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
      <Toaster richColors />
    </AuthProvider>
  </React.StrictMode>
);
