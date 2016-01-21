import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import AppBarTop from '../components/AppBar';
import * as ActionCreators from '../actions/actions';
import LandingPage from '../components/LandingPage';
import Entry from '../components/Entry';
// import Profile from './Profile';
// <AppBarTop logo={'Know It'}/>
export default class App extends Component {
  constructor(props) {
    super(props);

    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick(email) {
    const { dispatch } = this.props;
    const action = ActionCreators.loginUser.request(email);
    dispatch(action);
  }

  render() {
    console.log(this.props);
    return (
      <div className="main-container">
        {!this.props.isLoggedIn &&
          <div>
            <LandingPage />
            <Entry
              onLoginClick={this.onLoginClick}
            />
          </div>}
          {this.props.isLoggedIn && this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool,
  loadUserPage: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  location: PropTypes.object,
  updateRouterState: PropTypes.func,
  getInputValue: PropTypes.func,
  facebookLoginRequested: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
    facebookLoginRequested: state.facebookLoginRequested,
  };
}

export default connect(mapStateToProps)(App);
