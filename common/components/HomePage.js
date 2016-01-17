import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/profile">App</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.node.isRequired,
};
