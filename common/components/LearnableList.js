import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import Learnable from './Learnable';

export default class LearnableList extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteLearnable = this.handleDeleteLearnable.bind(this);
    this.handleKnowItLearnable = this.handleKnowItLearnable.bind(this);
  }

  handleDeleteLearnable(learnableid) {
    this.props.deleteLearnable(learnableid);
  }

  handleKnowItLearnable(learnableid) {
    this.props.knowItLearnable(learnableid);
  }

  render() {
    const { learnables } = this.props;
    const learnablesList = learnables.map((learnable) => <Learnable key={learnable.id} handleDeleteLearnable={this.handleDeleteLearnable} handleKnowItLearnable={this.handleKnowItLearnable} learnableid={learnable.id} text={learnable.text} tags={learnable.tags} />);

    return (
      <div>
        <List>
          {learnablesList}
        </List>
      </div>
    );
  }
}

LearnableList.propTypes = {
  learnables: PropTypes.array,
  deleteLearnable: PropTypes.func,
  knowItLearnable: PropTypes.func,
};
