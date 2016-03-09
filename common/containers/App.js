import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MainAppBar from '../components/AppBar';
import * as ActionCreators from '../actions/actions';
import LandingPage from './LandingPage';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const action = ActionCreators.checkAuthUser.request();
    dispatch(action);
  }

  signOut() {
    if (this.props.isLoggedIn) {
      const { dispatch } = this.props;
      const action = ActionCreators.signOut.request();
      dispatch(action);
    }
  }

  render() {
    return (
      <div className="main-container">
        <MainAppBar
          logo={'Know It'}
          signOut={this.signOut}
        />
        {!this.props.isLoggedIn &&
          <div>
            <LandingPage />
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
  updateRouterState: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
}

export default connect(mapStateToProps)(App);
