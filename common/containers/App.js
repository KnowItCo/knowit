import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBarTop from '../components/AppBar';
import { loadUserPage } from '../actions/actions';
import LandingPage from '../components/LandingPage';
// import Profile from './Profile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick() {
    console.log('here!');
    this.props.dispatch(loadUserPage('hello'));
  }

  render() {
    return (
      <div className="main-container">
        <AppBarTop logo={'Know It'}/>
        {!this.props.isLoggedIn &&
          <LandingPage
            onLoginClick={this.onLoginClick}
          />}
        {this.props.isLoggedIn &&
          this.props.children}
        }
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node,
  isLoggedIn: PropTypes.boolean,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps)(App);
