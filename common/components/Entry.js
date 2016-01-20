import React, { Component, PropTypes } from 'react';

export default class Entry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divStyle = {
      textAlign: 'center',
    };

    return (
      <div style={divStyle}>
        <button onClick={this.props.onLoginClick}>Enter your profile to begin knowing!</button>
      </div>
    );
  }
}

Entry.propTypes = {
  onLoginClick: PropTypes.func,
};
