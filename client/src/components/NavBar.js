import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        window.location = "/login"
        //this.props.history.push(`/login`)
    }

    render() {
        if (localStorage.usertoken == null) {
            return (
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">WorkoutTracker</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        }
        else{
            return (
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">WorkoutTracker</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/listworkout" className="nav-link">Workouts</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Workout Log</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/user" className="nav-link">Create Client</Link>
                            </li>
                            <li className="navbar-item">
                                <a href="" onClick={this.logOut.bind(this)} className="nav-link">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        }
    }
}