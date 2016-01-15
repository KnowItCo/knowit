import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class TagInput extends Component {
  constructor(props) {
    super(props);
  }

  handleNewRequest() {
    // TODO
  }

  render() {
    return (
      <AutoComplete
        hintText="Enter a tag"
        dataSource={this.props.tags}
        onNewRequest={this.handleNewRequest}
      />
    );
  }
}

TagInput.propTypes = {
  tags: PropTypes.array.isRequired,
};
