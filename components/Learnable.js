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
    const style = {
      backgroundColor: '#8D99AE',
      height: 20,
      width: 180,
      padding: 3,
      margin: 8,
    };

    return (
      <div className="card">
        <div style={style}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

Learnable.propTypes = {
  text: PropTypes.string,
};
