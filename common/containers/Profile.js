import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/actions';
import LearnableList from '../components/LearnableList';
import LeftNavBar from '../components/NavBar';
import Input from '../components/Input';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.addNewLearnable = this.addNewLearnable.bind(this);
    this.deleteLearnable = this.deleteLearnable.bind(this);
  }

  componentWillMount() {

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
          <LeftNavBar
            tags={this.props.tags}
          />
        </div>
        <div className="col-md-8 col-xs-12" style={{ paddingTop: 70 }}>
          <Input
            tags={this.props.tags}
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
  tags: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
};


function mapStateToProps(state) {
  return {
    tags: state.entities.tags === undefined ? ['General'] : state.entities.tags,
    learnables: state.entities.learnables === undefined ? [{ 'id': 1, 'text': 'hello' }] : state.entities.learnables,
    email: state.login.email,
  };
}

export default connect(mapStateToProps)(Profile);
