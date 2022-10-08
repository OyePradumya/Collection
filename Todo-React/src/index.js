import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import styles from "./Index.module.css";

ReactDOM.render(
  <React.StrictMode>
    <div className={styles.body}>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
