import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBarTop from '../components/AppBar';
import { loginUser, updateRouterState } from '../actions/actions';
import LandingPage from '../components/LandingPage';
// import Profile from './Profile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onLoginClick = this.onLoginClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.updateRouterState({
        pathname: nextProps.location.pathname,
        params: nextProps.params,
      });
    }
  }

  onLoginClick() {
    console.log(this.props.dispatch);
    this.props.dispatch(loginUser.request('hello'));
  }

  render() {
    return (
      <div className="main-container">
        <AppBarTop logo={'Know It'}/>
        {!this.props.isLoggedIn &&
          <LandingPage
            onLoginClick={this.onLoginClick}
          />}
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
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
}

export default connect(mapStateToProps, { updateRouterState })(App);
