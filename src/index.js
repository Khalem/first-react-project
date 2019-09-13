import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const onTellJoke = () => {
    fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json));
  };

  return <button onClick={onTellJoke}>Tell Me a Joke</button>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
