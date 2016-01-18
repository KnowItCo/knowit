import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  login() {
    axios.post('/auth/login')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
    });
  }

  render() {
    return (
      <div>
        <TextField
          hintText="First Name"
          // errorText={this.state.floatingErrorText}
          floatingLabelText="Floating Label Text"
          // onChange={this._handleFloatingErrorInputChange}
        />
        <TextField
          hintText="Last Name"
          // errorText={this.state.floatingErrorText}
          floatingLabelText="Floating Label Text"
          // onChange={this._handleFloatingErrorInputChange}
        />
        <TextField
          hintText="Email"
          // errorText={this.state.floatingErrorText}
          floatingLabelText="Floating Label Text"
          // onChange={this._handleFloatingErrorInputChange}
        />
      <button onClick={this.login}>Submit</button>
      </div>
    );
  }
}
