import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  // Create constructor to add states and bind onTellJoke method
  constructor() {
    super();

    this.state = {
      joke: null
    };
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  // Get joke from API
  onTellJoke() {
    fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ joke: json.joke });
      });
  }

  // Render the JSX elements
  render() {
    console.log("----- RENDER -----");

    return (
      <div>
        <button onClick={this.onTellJoke}>Tell Me a Joke</button>
        <p>{this.state.joke}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
