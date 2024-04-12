import ReactDom from "react-dom";
import "./index.css";
import App from "./App";
import React from "react";
import {  BrowserRouter } from "react-router-dom";

ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById("root")
);
