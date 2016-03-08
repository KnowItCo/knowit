import React, { Component, PropTypes } from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class TagItem extends Component {
  constructor(props) {
    super(props);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  handleTagClick() {
    this.props.handleTagClickNav(this.props.tag);
  }

  render() {
    return (
      <MenuItem onClick={this.handleTagClick}> {this.props.tag} </MenuItem>
    );
  }
}

TagItem.propTypes = {
  tag: PropTypes.string,
  handleTagClickNav: PropTypes.func,
};
