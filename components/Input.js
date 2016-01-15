import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import Button from '../components/Button';
import TagInput from '../components/AutoComplete';

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
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            hintText="Learnable"
            floatingLabelText="Enter a new learnable"
            multiLine
            style={textFieldStyle}
          />
        </div>
        <div>
          <TagInput
            tags={this.props.tags}
          />
        </div>
        <div>
          <Button
            style={buttonStyle}
          />
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  tags: PropTypes.array.isRequired,
};
