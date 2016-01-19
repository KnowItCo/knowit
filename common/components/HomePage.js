import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class HomePage extends Component {
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
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                KNOW IT
              </a>
            </div>
          </div>
        </nav>
        <div style={divStyle}>
          <h1>
            Know everything
          </h1>
          <ul>
            <div><Link to="/login">Login with Facebook</Link></div>
            <div><Link to="/profile">App</Link></div>
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.node,
};
