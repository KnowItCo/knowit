import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

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
      playerStyle: {
        position: 'relative',
        textAlign: 'center',
      },
    };

    const opts = {
      height: '400',
      width: '600',
      playerVars: {
        autoplay: 0,
      },
    };

    const id = '5BpDeQbZkOs';

    return (
      <div className="container">
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
        <div style={styles.playerStyle}>
          <YouTube
            videoId={id}
            opts={opts}
          />
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
