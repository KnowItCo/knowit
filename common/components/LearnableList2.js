/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';

export default class LearnableList2 extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteLearnable = this.handleDeleteLearnable.bind(this);
  }

  handleDeleteLearnable(learnableid) {
    this.props.deleteLearnable(learnableid);
  }

  render() {
    const { learnables } = this.props;
    console.log(learnables, Accordion, AccordionItem);
    return (
      <Accordion>
        {learnables.map((learnable) => {
            return (
              <AccordionItem
                title={`${learnable.tags}`} key={learnable.id}
               >
                <div>
                  {`${learnable.text}`}
                </div>
              </AccordionItem>
            );
        })}
      </Accordion>
    );
  }
}

LearnableList2.propTypes = {
  learnables: PropTypes.array,
  deleteLearnable: PropTypes.func,
};
