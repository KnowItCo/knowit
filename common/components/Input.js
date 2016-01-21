import React, { Component, PropTypes } from 'react';
// import TextField from 'material-ui/lib/text-field';
// import Button from '../components/Button';
// import TagInput from '../components/AutoComplete';

const textFieldStyle = {
  width: 550,
  right: 0,
  position: 'relative',
};

const buttonStyle = {
  paddingRight: 50,
};

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.handleAddNewLearnable = this.handleAddNewLearnable.bind(this);
  }

  handleAddNewLearnable() {
    const tags = this.refs.tags.value;
    const learnable = this.refs.learnable.value;
    this.props.addNewLearnable(learnable, tags);
  }

  // TODO: ADD AUTOCOMPLETE FOR TAGS
  render() {
    return (
      <div>
        <div>
          <input
            ref="learnable"
            style={textFieldStyle}
          />
        </div>
        <div>
          <input
            ref="tags"
          />
        </div>
        <div>
          <button
            style={buttonStyle}
            onClick={this.handleAddNewLearnable}
          >
          </button>
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  tags: PropTypes.array.isRequired,
  addNewLearnable: PropTypes.func.isRequired,
};
