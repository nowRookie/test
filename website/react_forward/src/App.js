import React from 'react';
import Home from "./views/Home"
import About from "./views/forward/about"
import Admin from "./views/backward/admin"
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
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/about/canvas" component={About}></Route>
        <Route exact path="/admin" component={Admin}></Route>
      </Router>
    </div>
  );
}

export default App;
