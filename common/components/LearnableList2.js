/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';
import RaisedButton from 'material-ui/lib/raised-button';

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
    const mainStyle = {
      marginBottom: 70,
    };
    const itemStyle = {
      border: 2,
      borderStyle: 'solid',
      borderColor: '#2B2D42',
      borderRadius: 1,
      marginBottom: 20,
    };
    const textStyle = {
      padding: 10
    };
    const buttonStyle = {
      margin: 5,
      backgroundColor: '#D8DBE2',
    };

    return (
      <Accordion style={mainStyle} allowMultiple activeItems={learnables}>
        {learnables.map((learnable) => {
            return (
              <AccordionItem
                title={`${learnable.tags}`}
                key={learnable.id}
                style={mainStyle}
               >
                <div style={itemStyle}>
                  <div style={textStyle}>
                    {`${learnable.text}`}
                  </div>
                  <div>
                    <RaisedButton
                      label="Generate"
                      style={buttonStyle}
                      backgroundColor='#D8DBE2'
                    />
                    <RaisedButton
                      label="Edit"
                      style={buttonStyle}
                      backgroundColor='#D8DBE2'
                    />
                    <RaisedButton
                      label="Delete"
                      style={buttonStyle}
                      backgroundColor='#D8DBE2'
                    />
                  </div>
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
