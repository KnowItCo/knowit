import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}