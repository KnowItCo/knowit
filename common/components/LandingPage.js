import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divStyle = {
      padding: 70,
      textAlign: 'center',
    };

    return (
      <div>
        <div style={divStyle}>
          <h1>
            Know everything
          </h1>
          <ul>
            <button onClick={this.props.onLoginClick}>Login with Facebook</button>
            <div><Link to="/profile">App</Link></div>
          </ul>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  onLoginClick: PropTypes.func,
};
