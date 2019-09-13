import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  // Create constructor to add states and bind onTellJoke method
  constructor() {
    super();

    this.state = {
      joke: null,
      isFetchingJoke: false
    };
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  componentDidMount() {
    this.fetchJoke();
  }

  fetchJoke() {
    this.setState({ isFetchingJoke: true });
    fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          joke: json.joke,
          isFetchingJoke: false
        });
      });
  }

  // Get joke from API
  onTellJoke() {
    this.fetchJoke();
  }

  // Render the JSX elements
  render() {
    console.log("----- RENDER -----");

    return (
      <div>
        <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}>Tell Me a Joke</button>
        <p>{this.state.isFetchingJoke ? "Loading Joke" : this.state.joke}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
