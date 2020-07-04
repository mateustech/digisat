import React from "react";
import Board from "react-trello";

import data from "./data_fake.json";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Board data={data} />
      </>
    );
  }
}
