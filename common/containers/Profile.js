import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/actions';
import LearnableList from '../components/LearnableList';
import LeftNavBar from '../components/NavBar';
import Input from '../components/Input';
import * as counter from './../test';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['General', 'tag1', 'tag2', 'tag3', 'tag4'],
    };

    this.addNewLearnable = this.addNewLearnable.bind(this);
    this.deleteLearnable = this.deleteLearnable.bind(this);
  }

  componentWillMount() {
    console.log(counter.counter); // 1
    counter.increment();
    console.log(counter.counter); // 2

    const tags = this.state.tags || [];
    this.setState({ tags });
  }

  addNewLearnable(learnable, tags) {
    const { dispatch } = this.props;
    const action = ActionCreators.addLearnable.request(this.props.email, learnable, tags);
    dispatch(action);
  }

  deleteLearnable(learnableid) {
    const { dispatch } = this.props;
    const action = ActionCreators.deleteLearnable.request(learnableid, this.props.email);
    dispatch(action);
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
        <div className="col-md-8 col-xs-12" style={{ paddingTop: 70 }}>
          <Input
            tags={this.state.tags}
            addNewLearnable={this.addNewLearnable}
          />
        <LearnableList
          learnables={this.props.learnables}
          deleteLearnable={this.deleteLearnable}
        />
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
  email: PropTypes.string,
};


function mapStateToProps(state) {
  return {
    tags: state.tags,
    learnables: state.entities.learnables[0] === undefined ? [{ 'id': 1, 'text': 'hello' }] : state.entities.learnables,
    email: state.login.email,
  };
}

export default connect(mapStateToProps)(Profile);
