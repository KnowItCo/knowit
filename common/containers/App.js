import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBarTop from '../components/AppBar';
import * as ActionCreators from '../actions/actions';
import LandingPage from '../components/LandingPage';
// import Profile from './Profile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick() {
    const { dispatch } = this.props;
    const action = ActionCreators.loginUser.request(this.getInputValue());
    dispatch(action);
  }

  getInputValue() {
    return this.refs.input.value;
  }

  render() {
    console.log(this.props);
    return (
      <div className="main-container">
        <AppBarTop logo={'Know It'}/>
        {!this.props.isLoggedIn &&
          <div>
            <input ref="input" placeholder="Enter your username"></input>
            <LandingPage
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
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
}

export default connect(mapStateToProps)(App);
