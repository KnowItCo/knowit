import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import LearnableList from '../components/LearnableList';
import data from '../data/learnables';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount() {
  //   this.props.updateRouterState({
  //     pathname: this.props.location.pathname,
  //     params: this.props.params,
  //   });
  // }

  render() {
    return (
      <div>
        <LearnableList learnables={data} />
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
