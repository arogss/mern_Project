import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import NavBar from "./components/NavBar"
import ListWorkout from "./components/ListWorkout";
import EditWorkout from "./components/EditWorkout";
import CreateWorkout from "./components/CreateWorkout";
import CreateClient from "./components/CreateClient";

function App() {
  return (
    <Router>
      <div className="container">
      <NavBar />
      <br/>
      <Route path="/" exact component={ListWorkout} />
      <Route path="/edit/:id" component={EditWorkout} />
      <Route path="/create" component={CreateWorkout} />
      <Route path="/user" component={CreateClient} />
      </div>
    </Router>
  );
}

export default App;
