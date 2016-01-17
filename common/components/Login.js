import React from 'react';
import TextField from 'material-ui/lib/text-field';

const Login = () => (
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
  </div>
);

export default Login;
