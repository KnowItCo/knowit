import React, { Component } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class LeftNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount() {
    this.setState({ open: true });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const style = {
      position: 'fixed',
      top: 64,
      zIndex: 9999,
      width: 200,
      height: '100%',
      backgroundColor: 'grey',
    };

    return (
      <div>
        <LeftNav
          open={this.state.open}
          style={style}
        >
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </LeftNav>
      </div>
    );
  }
}
