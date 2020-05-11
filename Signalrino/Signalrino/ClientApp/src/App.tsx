import React from "react";
import styles from "./App.module.scss";
import Chat from "./components/chat/chat";

const App = () => {
  return (
    <div className={styles.appRoot}>
      <Chat />
    </div>
  );
};

export default App;
