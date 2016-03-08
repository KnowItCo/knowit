import React, { Component, PropTypes } from 'react';
// import RaisedButton from 'material-ui/lib/raised-button';

export default class Generate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const divstyle = {
      paddingTop: 70,
    };

    return (
      <div style={divstyle}>
        HELLO WORLD
      </div>
    );
  }
}

Generate.propTypes = {
  text: PropTypes.string,
};
