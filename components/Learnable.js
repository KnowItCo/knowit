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
      height: 40,
      width: 550,
      borderRadius: 2,
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.075), 0 0 0 1px rgba(0,0,0,0.1)',
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
