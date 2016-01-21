import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const textFieldStyle = {
  width: 200,
  position: 'relative',
  paddingBottom: 10,
};


export default class Entry extends Component {
  constructor(props) {
    super(props);

    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  getInputValue() {
    return this.refs.input.value;
  }

  handleLoginClick() {
    this.props.onLoginClick(this.getInputValue());
  }

  render() {
    const divStyle = {
      textAlign: 'center',
    };

    return (
      <div style={divStyle}>
        <input
          ref="input"
          defaultValue="iam.preethi.k@gmail.com"
          style={textFieldStyle}
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
