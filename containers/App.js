import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import data from '../data/learnables';
import LearnableList from '../components/LearnableList';
import AppBarTop from '../components/AppBar';
import LeftNavBar from '../components/NavBar';
import Input from '../components/Input';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      open: false,
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {
    const newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, { accent1Color: Colors.cyan100 });

    this.setState({ muiTheme: newMuiTheme });
  }

  // componentWillMount() {
  //   this.props.updateRouterState({
  //     pathname: this.props.location.pathname,
  //     params: this.props.params,
  //   });
  // }

  render() {
    return (
      <div className="main-container">
        <AppBarTop logo={'KnowIt'}/>
        <div className="col-md-4 col-xs-6">
          <LeftNavBar />
        </div>
        <div className="col-md-8 col-xs-12">
          <Input />
          <LearnableList learnables={data} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  learnables: PropTypes.array,
  updateRouterState: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
};
