import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { history } from '../services';
import * as ActionCreators from '../actions/actions';
import LearnableList from '../components/LearnableList';
// import LearnableList2 from '../components/LearnableList2';
import LeftNavBar from '../components/NavBar';
import Input from '../components/Input';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.addNewLearnable = this.addNewLearnable.bind(this);
    this.deleteLearnable = this.deleteLearnable.bind(this);
    this.knowItLearnable = this.knowItLearnable.bind(this);
    this.tagClick = this.tagClick.bind(this);
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

  knowItLearnable(learnableid) {
    const { dispatch } = this.props;
    const action = ActionCreators.updateRouterState(`/generate/:${learnableid}`);
    dispatch(action);
    history.pushState(null, `/generate/:${learnableid}`);
  }

  tagClick(tag) {
    console.log(tag);
    // TODO
    // const { dispatch } = this.props;
    // const action = ActionCreators.deleteLearnable.request(learnableid);
    // dispatch(action);
  }

  render() {
    const styles = {
      mainStyle: {
        fontFamily: 'Roboto',
        paddingTop: 70,
      },
      inputStyle: {
        marginBottom: 25,
      },
    };

    return (
      <div className="main-container">
        <div className="row">
          <div className="col-xs-6 col-md-4">
            <LeftNavBar
              tags={this.props.tags}
              tagClick={this.tagClick}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-8" style={styles.mainStyle}>
            <div style={styles.inputStyle}>
              <Input
                tags={this.props.tags}
                addNewLearnable={this.addNewLearnable}
              />
            </div>
            <LearnableList
              learnables={this.props.learnables}
              deleteLearnable={this.deleteLearnable}
              knowItLearnable={this.knowItLearnable}
            />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  updateRouterState: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object,
  learnables: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  tagClick: PropTypes.func,
};


function mapStateToProps(state) {
  return {
    tags: state.entities.tags === undefined ? ['General'] : state.entities.tags,
    learnables: state.entities.learnables === undefined ? [{ 'id': 1, 'text': 'hello' }] : state.entities.learnables,
    email: state.login.email,
  };
}

export default connect(mapStateToProps)(Profile);
