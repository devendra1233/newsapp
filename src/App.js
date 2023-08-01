import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";

export default class App extends Component {
  c = "devendar";
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <News pageSize={5} country="in" categary="health"></News>
      </div>
    );
  }
}
