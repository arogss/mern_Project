import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import axios from 'axios';

const Workout = props => (
    <tr>
        <td>{props.workout.username}</td>
        <td>{props.workout.name}</td>
        <td>{props.workout.description}</td>
        <td>{props.workout.duration}</td>
        <td>{props.workout.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.workout._id}>edit</Link> | <a href="#" onClick={() => { props.deleteWorkout(props.workout._id) }}>delete</a>
        </td>
    </tr>
)

export default class ListWorkout extends Component {
    constructor(props) {
        super(props);

        this.deleteWorkout = this.deleteWorkout.bind(this)

        this.state = {
            workouts: [],
            fullname: '',
            email: '',
            errors: {}
        };
    }

    componentWillMount(){
        if(localStorage.usertoken == null){
            window.location = "/login"
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        console.log(token)
        const decoded = jwt_decode(token)
        this.setState({
            fullname: decoded.fullname,
            email: decoded.email
        })

        axios.get('http://localhost:5000/api/workouts/')
            .then(response => {
                this.setState({ workouts: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteWorkout(id) {
        axios.delete('http://localhost:5000/api/workouts/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            workouts: this.state.workouts.filter(lw => lw._id !== id)
        })
    }

    listWorkout() {
        return this.state.workouts.map(currentworkout => {
            return <Workout workout={currentworkout} deleteWorkout={this.deleteWorkout} key={currentworkout._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Workouts</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Client</th>
                            <th>Workout name</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.listWorkout()}
                    </tbody>
                </table>
            </div>
        )

    }
}