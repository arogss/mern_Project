import React, { Component } from 'react';
import axios from 'axios';

export default class CreateClient extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const client = {
      username: this.state.username
    }

    console.log(client);

    axios.post('http://localhost:5000/api/clients', client)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Client</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Client Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Client" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}