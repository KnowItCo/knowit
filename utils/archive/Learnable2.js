import React, { Component, PropTypes } from 'react';
import { AccordionItem } from 'react-sanfona';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Learnable2 extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKnowIt = this.handleKnowIt.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit() {
    // TODO
  }

  handleKnowIt() {
    // TODO
  }

  handleDelete() {
    console.log(this.props.learnableid, 'weeeeeee');
    this.props.handleDeleteLearnable(this.props.learnableid);
  }

  render() {
    const topItemStyle = {
      marginBottom: 70,
      maxHeight: 100,
    };

    const itemStyle = {
      border: 2,
      borderStyle: 'solid',
      borderColor: '#2B2D42',
      borderRadius: 1,
      marginBottom: 20,
    };
    const textStyle = {
      padding: 10,
    };
    const buttonStyle = {
      margin: 5,
      backgroundColor: '#D8DBE2',
    };

    return (
      <AccordionItem title={this.props.tags[0]} key={this.props.learnableid} style={topItemStyle} >
        <div style={itemStyle}>
          <div style={textStyle}>
            {this.props.text}
          </div>
          <div>
            <RaisedButton
              label="Generate"
              style={buttonStyle}
              backgroundColor="#D8DBE2"
            />
            <RaisedButton
              label="Edit"
              style={buttonStyle}
              backgroundColor="#D8DBE2"
            />
            <RaisedButton
              label="Delete"
              style={buttonStyle}
              backgroundColor="#D8DBE2"
              onClick={this.handleDelete}
            />
          </div>
        </div>
      </AccordionItem>
    );
  }
}

Learnable2.propTypes = {
  text: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  handleDeleteLearnable: PropTypes.func.isRequired,
  learnableid: PropTypes.number.isRequired,
};
