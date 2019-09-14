import React from "react";

const JokeList = props => {
  return (
    <ul className="jokes-list">
      {props.jokes.map(item => (
        <li key={item.id}>{item.joke}</li>
      ))}
    </ul>
  );
};

export default JokeList;
