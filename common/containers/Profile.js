import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/actions';
// import LearnableList from '../components/LearnableList';
import LearnableList2 from '../components/LearnableList2';
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
    const action = ActionCreators.addLearnable.request(learnable, tags);
    dispatch(action);
  }

  deleteLearnable(learnableid) {
    const { dispatch } = this.props;
    const action = ActionCreators.deleteLearnable.request(learnableid);
    dispatch(action);
  }

  // componentWillMount() {
  //   this.props.updateRouterState({
  //     pathname: this.props.location.pathname,
  //     params: this.props.params,
  //   });
  // }

  render() {
    const mainStyle = {
      fontFamily: 'Roboto',
      paddingTop: 70,
    };
    const inputStyle = {
      marginBottom: 25,
    };
    return (
      <div className="main-container">
        <div className="col-md-4 col-xs-6">
          <LeftNavBar
            tags={this.props.tags}
          />
        </div>
        <div className="col-md-8 col-xs-12" style={mainStyle}>
          <div style={inputStyle}>
            <Input
              tags={this.props.tags}
              addNewLearnable={this.addNewLearnable}
            />
          </div>

          <LearnableList2
            learnables={this.props.learnables}
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

// <LearnableList
//   learnables={this.props.learnables}
//   deleteLearnable={this.deleteLearnable}
// />
