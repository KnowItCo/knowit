import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBarTop from '../components/AppBar';
import * as ActionCreators from '../actions/actions';
import LandingPage from '../components/LandingPage';
import Entry from '../components/Entry';

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
    return (
      <div className="main-container">
        <AppBarTop
          logo={'Know It'}
        />
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
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool,
  location: PropTypes.object,
  updateRouterState: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
    facebookLoginRequested: state.facebookLoginRequested,
  };
}

export default connect(mapStateToProps)(App);
