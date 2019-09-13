import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  // Create constructor to add states and bind onTellJoke method
  constructor() {
    super();

    this.state = {
      searchTerm: "",
      jokes: [],
      isFetchingJoke: false
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  searchJokes(limit = 20) {
    this.setState({ isFetchingJoke: true });
    fetch(
      `https://icanhazdadjoke.com/search?term=${
        this.state.searchTerm
      }&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        const jokes = json.results;
        console.log("jokes", jokes);
        this.setState({
          jokes,
          isFetchingJoke: false
        });
      });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.searchJokes();
  }

  renderJokes() {
    return (
      <ul>
        {this.state.jokes.map(item => (
          <li key={item.id}>{item.joke}</li>
        ))}
      </ul>
    );
  }

  // Render the JSX elements
  render() {
    return (
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <input
            type="text"
            placeholder="Enter search term..."
            onChange={this.onSearchChange}
          />
          <button>Search</button>

          <button
            onClick={() => this.searchJokes(1)}
            disabled={this.state.isFetchingJoke}
          >
            I'm Feeling Funny
          </button>
        </form>

        {this.state.isFetchingJoke ? "Loading Joke..." : this.renderJokes()}

        <p>Search term: {this.state.searchTerm}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
