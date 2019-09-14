import React from "react";
import "./SearchForm.css";

const SearchForm = props => {
  const onSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter search term..."
          onChange={event => props.onFormSubmit(event.target.value)}
          value={props.searchValue}
        />
        <div>
          <button disabled={props.isSearching}>Search</button>

          <button
            onClick={props.onSingleSearchClick}
            disabled={props.isSearching}
          >
            I'm Feeling Funny
          </button>
        </div>
      </form>
      <button onClick={props.onClear}>Clear</button>
    </div>
  );
};

export default SearchForm;
