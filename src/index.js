import React from "react";
import ReactDOM from "react-dom";
import SearchForm from "./SearchForm";
import JokeList from "./JokeList";

import "./styles.css";

class App extends React.Component {
  // Create constructor to add states and bind onTellJoke method
  constructor() {
    super();

    this.state = {
      searchTerm: "",
      jokes: [],
      isFetchingJokes: false,
      limit: 10
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onLimitChange = this.onLimitChange.bind(this);
  }

  searchJokes(value = "", limit = this.state.limit) {
    this.setState({ isFetchingJokes: true, searchTerm: value });
    fetch(`https://icanhazdadjoke.com/search?term=${value}&limit=${limit}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        var jokes;
        if (json.results.length < 1) {
          jokes = [{ id: "empty", joke: "No results found!" }];
        } else {
          jokes = json.results;
        }
        this.setState({
          jokes,
          isFetchingJokes: false
        });
      });
  }

  onSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  onClear() {
    this.setState({
      searchTerm: "",
      jokes: []
    });
    console.log(this.state.jokes);
  }

  onLimitChange(value) {
    console.log(value);
    this.setState({
      limit: value
    });
  }

  renderJokes() {
    return <JokeList jokes={this.state.jokes} />;
  }

  renderOptions() {
    let userLimit = [];
    for (let i = 0; i <= 20; i++) {
      userLimit.push(i);
    }
    return (
      <select
        id="limit"
        onChange={event => this.onLimitChange(event.target.value)}
      >
        {userLimit.map(item => (
          <option key={item}>{item}</option>
        ))}
      </select>
    );
  }

  // Render the JSX elements
  render() {
    return (
      <div className="App">
        <h1>
          <span>Dad Joke</span> Search
        </h1>

        <label for="limit">Result Limit</label>
        {this.renderOptions()}

        <SearchForm
          onFormSubmit={this.searchJokes}
          onSearchValueChange={this.onSearchChange}
          isSearching={this.state.isFetchingJokes}
          onSingleSearchClick={() => this.searchJokes(1)}
          onClear={this.onClear}
          searchValue={this.state.searchTerm}
        />

        {this.state.isFetchingJokes ? "Loading Joke..." : this.renderJokes()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
