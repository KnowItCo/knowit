import React, { Component, PropTypes } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import TagItem from './TagItem';

export default class LeftNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
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

  render() {
    const style = {
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
      return <TagItem tag={tag} />;
    });

    return (
      <div>
        <LeftNav
          open={this.state.open}
          style={style}
        >
          {menuItems}
        </LeftNav>
      </div>
    );
  }
}

LeftNavBar.propTypes = {
  tags: PropTypes.array,
};
