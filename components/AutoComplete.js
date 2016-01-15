import React, { Component } from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class TagInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['General', 'tag1', 'tag2', 'tag3', 'tag4'],
    };
  }

  componentWillMount() {
    this.setState({ tags: this.state.tags || [] });
  }

  handleNewRequest() {
    // TODO
  }

  render() {
    return (
      <AutoComplete
        hintText="Enter a tag"
        dataSource={this.state.tags}
        onNewRequest={this.handleNewRequest}
      />
    );
  }
}
