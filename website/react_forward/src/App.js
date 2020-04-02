import React from 'react';
import Home from "./views/Home"
import About from "./views/about"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route path="/about" component={About}></Route>
      </Router>
    </div>
  );
}

export default App;
