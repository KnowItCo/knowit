import React, { Component, PropTypes } from 'react';

export default class Learnable extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKnowIt = this.handleKnowIt.bind(this);
  }

  handleEdit() {
    // TODO
  }

  handleKnowIt() {
    // TODO
  }

  render() {
    return (
      <li>{this.props.text}</li>
    );
  }
}

Learnable.propTypes = {
  text: PropTypes.string,
};
