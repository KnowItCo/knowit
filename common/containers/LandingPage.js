import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseUp() {
    if (this.props.isLoggedIn) {
      this.context.router.push('/');
    }
  }

  render() {
    const styles = {
      divStyle: {
        padding: 70,
        textAlign: 'center',
      },
    };

    return (
      <div>
        <div style={styles.divStyle}>
          <h1>
            Know everything
          </h1>
          <ul>
            <RaisedButton
              label="Login with Facebook"
              linkButton
              onClick={this.handleMouseUp}
              href="/auth/facebook"
              hoverColor="#FE4A49"
            />
          </ul>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  isLoggedIn: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
}

export default connect(mapStateToProps)(LandingPage);
