import React, { Component, PropTypes } from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';

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
    this.props.handleDeleteLearnable(this.props.learnableid);
  }

  render() {
    return (
      <AccordionItem title={`Item`}
       titleColor="blue">
                  <div>
                    {Hello World}
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
