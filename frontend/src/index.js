import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { CardsContextProvider } from "./context/CardContext";
// import { CardsContextProvider } from "./context/CardContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <CardsContextProvider>
            <App />
        </CardsContextProvider>
    </React.StrictMode>
);
