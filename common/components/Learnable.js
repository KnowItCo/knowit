import React, { Component, PropTypes } from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class Learnable extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKnowIt = this.handleKnowIt.bind(this);
  }

  handleEdit() {
    // TODO
  }

  handleKnowIt() {
    // TODO
  }

  render() {
    const iconButtonElement = (
      <IconButton
        touch
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Know It!</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <div>
        <ListItem
          leftAvatar={<Avatar src="../../images/logo.jpeg" />}
          rightIconButton={rightIconMenu}
          primaryText="Heading"
          secondaryText={
            <p>
              {this.props.text}
            </p>
          }
          secondaryTextLines={2}
        />
          <Divider inset />
      </div>
    );
  }
}

Learnable.propTypes = {
  text: PropTypes.string.isRequired,
};
