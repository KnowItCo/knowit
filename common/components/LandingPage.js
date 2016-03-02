import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divStyle = {
      padding: 70,
      textAlign: 'center',
    };

    return (
      <div>
        <div style={divStyle}>
          <h1>
            Know everything
          </h1>
          <ul>
            <RaisedButton
              label="Login with Facebook"
              linkButton
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
  onLoginClick: PropTypes.func,
  onFacebookLoginClick: PropTypes.func,
};
