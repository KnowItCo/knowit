import React, { Component, PropTypes } from 'react';
import { Accordion } from 'react-sanfona';
import Learnable2 from './Learnable2';

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
    const learnablesList = learnables.map((learnable) => <Learnable2 key={learnable.id} handleDeleteLearnable={this.handleDeleteLearnable} learnableid={learnable.id} text={learnable.text} tags={learnable.tags} />);

    const mainStyle = {
      marginBottom: 70,
    };

    return (
      <Accordion style={mainStyle} allowMultiple >
        {learnablesList}
      </Accordion>
    );
  }
}

LearnableList2.propTypes = {
  learnables: PropTypes.array,
  deleteLearnable: PropTypes.func,
};
