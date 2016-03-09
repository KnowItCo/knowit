import React, { Component, PropTypes } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
// import MenuItem from 'material-ui/lib/menus/menu-item';
import TagItem from './TagItem';

export default class LeftNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTagClickNav = this.handleTagClickNav.bind(this);
  }

  componentWillMount() {
    if (window.innerWidth < 770) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleTagClickNav(tag) {
    this.props.tagClick(tag);
  }

  render() {
    const styles = {
      fontFamily: 'Roboto',
      top: 0,
      zIndex: -0.0000000000000005,
      paddingTop: 80,
      width: '15%',
      height: '100%',
      position: 'fixed',
      docked: true,
      overflow: 'auto',
      boxSizing: 'border-box',
    };

    const menuItems = this.props.tags.map(function (tag) {
      return <TagItem handleTagClickNav={this.handleTagClickNav} tag={tag} />;
    }.bind(this));

    return (
      <div>
        <LeftNav
          open={this.state.open}
          style={styles}
        >
          {menuItems}
        </LeftNav>
      </div>
    );
  }
}

LeftNavBar.propTypes = {
  tags: PropTypes.array,
  tagClick: PropTypes.func,
};


// <MenuItem onClick={this.handleTagClickGeneral}>General</MenuItem>
