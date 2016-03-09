import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class MainAppBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      backgroundColor: '#2B2D42',
      position: 'fixed',
    };
    return (
      <AppBar
        title="Know It"
        style={styles}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Help" />
            <MenuItem
              primaryText="Sign out"
              onClick={this.props.signOut}
            />
          </IconMenu>
        }
      />
    );
  }
}

MainAppBar.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default MainAppBar;
