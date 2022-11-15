import React from "react";

import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3ContextProvider } from "./context/Web3Context";
import "./assets/scss/index.scss";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </BrowserRouter>
);

reportWebVitals();
