import React, { Component, PropTypes } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h3> Hello World!</h3>
    );
  }
}

Home.propTypes = {
  someData: PropTypes.String,
};
