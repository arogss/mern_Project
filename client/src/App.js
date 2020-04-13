import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar"
import ListWorkout from "./components/ListWorkout";
import EditWorkout from "./components/EditWorkout";
import CreateWorkout from "./components/CreateWorkout";
import CreateClient from "./components/CreateClient";
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
        <Route path="/" exact component={Login} />
        <Route path="/listworkout" component={ListWorkout} />
        <Route path="/edit/:id" component={EditWorkout} />
        <Route path="/create" component={CreateWorkout} />
        <Route path="/user" component={CreateClient} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
