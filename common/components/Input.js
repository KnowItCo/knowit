import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
// import Button from '../components/Button';
// import TagInput from '../components/AutoComplete';

const textFieldStyle = {
  width: 550,
  position: 'relative',
};

const tagFieldStyle = {
  width: 180,
  position: 'relative',
};

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.handleAddNewLearnable = this.handleAddNewLearnable.bind(this);
  }

  handleAddNewLearnable() {
    const tags = this._tag.getValue();
    const learnable = this._learnable.getValue();
    this.props.addNewLearnable(learnable, tags);
    this._tag.clearValue();
    this._learnable.clearValue();
  }

  // TODO: ADD AUTOCOMPLETE FOR TAGS
  render() {
    return (
      <div>
        <div>
          <TextField
            floatingLabelText="Learnable"
            ref={(c) => this._learnable = c}
            style={textFieldStyle}
            multiLine
          />
        </div>
        <div>
          <TextField
            floatingLabelText="Tags"
            ref={(c) => this._tag = c}
            style={tagFieldStyle}
            multiLine
          />
        </div>
        <div>
          <RaisedButton
            onClick={this.handleAddNewLearnable}
            label="Add Learnable"
            hoverColor="#FE4A49"
          />
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  tags: PropTypes.array.isRequired,
  addNewLearnable: PropTypes.func.isRequired,
};
