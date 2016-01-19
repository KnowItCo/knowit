import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import data from '../data/learnables';
import LearnableList from '../components/LearnableList';
import LeftNavBar from '../components/NavBar';
import Input from '../components/Input';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['General', 'tag1', 'tag2', 'tag3', 'tag4'],
    };
  }

  componentWillMount() {
    const tags = this.state.tags || [];
    this.setState({ tags });
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
        <div className="col-md-4 col-xs-6">
          <LeftNavBar />
        </div>
        <div className="col-md-8 col-xs-12">
          <Input
            tags={this.state.tags}
          />
        <LearnableList learnables={this.props.learnables} />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  updateRouterState: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object,
  learnables: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    tags: state.tags,
    learnables: state.entities.learnables,
  };
}

export default connect(mapStateToProps)(Profile);
