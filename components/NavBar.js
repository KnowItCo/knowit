import React, { Component } from 'react';

export default class LeftNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount() {
    this.setState({ open: false });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const style = {
      position: 'fixed',
      top: 80,
      left: 10,
      zIndex: 9999,
      width: '20%',
      height: '100%',
      backgroundColor: 'grey',
    };

    return (
      <div>
        <nav
          className="fixed-nav-bar"
          style={style}
        >
        </nav>
      </div>
    );
  }
}
