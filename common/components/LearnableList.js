import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import Learnable from './Learnable';

export default class LearnableList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { learnables } = this.props;
    const learnablesList = learnables.map((learnable, index) => <Learnable key={index} text={learnable.text} />);

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
  learnables: PropTypes.array.isRequired,
};
