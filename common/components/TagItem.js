import React, { Component, PropTypes } from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class TagItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MenuItem> {this.props.tag} </MenuItem>
    );
  }
}

TagItem.propTypes = {
  tag: PropTypes.string,
};
