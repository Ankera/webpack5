import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(React.StrictMode, null,
    React.createElement(App, null),
    ","));
