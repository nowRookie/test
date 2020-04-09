import React from 'react';
import Home from "./views/Home"
import About from "./views/forward/about"
import Admin from "./views/backward/admin"
import News from "./views/backward/news"
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/about/canvas" component={About}></Route>
        <Route exact path="/admin" component={Admin}></Route>
        <Route exact path="/admin/news" component={News}></Route>
      </Router>
    </div>
  );
}

export default App;
