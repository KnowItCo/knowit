import React from 'react';
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

const Input = () => (
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
      <TagInput />
    </div>
    <div>
      <Button
        style={buttonStyle}
      />
    </div>
  </div>
);

export default Input;
