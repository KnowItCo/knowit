import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

export default class Entry extends Component {
  constructor(props) {
    super(props);

    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    this.props.onLoginClick(this._email.getValue());
    this._email.clearValue();
  }

  render() {
    const divStyle = {
      textAlign: 'center',
    };

    return (
      <div style={divStyle}>
        <TextField
          floatingLabelText="Email"
          ref={(c) => this._email = c}
          defaultValue="iam.preethi.k@gmail.com"
        />
      <RaisedButton
        onClick={this.handleLoginClick}
        label="Enter your profile to begin knowing!"
      />
      </div>
    );
  }
}

Entry.propTypes = {
  onLoginClick: PropTypes.func,
};
