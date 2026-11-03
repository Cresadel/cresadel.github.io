/**
 * 🌐 Main entry point for the Cresadel portfolio.
 * Bootstrap React, enable StrictMode, and apply saved theme.
 * Uses HashRouter for GitHub Pages static hosting.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

if (localStorage.getItem("cresadel-theme") === "dark") {
    document.body.classList.add("dark-mode");
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);
