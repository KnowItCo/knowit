/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/actions';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import QuestionsTable from '../components/QuestionTable';

export default class Generate extends Component {
  constructor(props) {
    super(props);
    this.handleGenerateQ = this.handleGenerateQ.bind(this);
  }

  componentWillMount() {
    const learnableid = +this.props.params.learnableid.split(':')[1];
    const learnableToGenerate = this.props.learnables.filter((item) => {
      return item.id === +this.props.params.learnableid.split(':')[1];
    });
    this.setState({
      learnableToGenerate,
      learnableid,
      text: learnableToGenerate[0].text,
      tag: learnableToGenerate[0].tags[0],
    });
  }

  handleGenerateQ() {
    const { dispatch } = this.props;
    const action = ActionCreators.generateQ.request(this.state.learnableid, this.state.text);
    dispatch(action);
  }

  render() {
    const styles = {
      mainDivStyle: {
        paddingTop: 40,
        position: 'absolute',
        margin: 'auto',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '60%',
        height: 440,
      },
      questionsDivStyle: {
        paddingTop: 30,
        wordBreak: 'break-all',
        whiteSpace: 'normal',
      },
    };

    return (
      <div style={styles.mainDivStyle}>
        <Card>
          <CardTitle title={this.state.tag} />
          <CardText>
            {this.state.text}
          </CardText>
          <CardActions>
            <RaisedButton
              label="Generate Qs"
              onClick={this.handleGenerateQ}
            />
          </CardActions>
        </Card>
        {this.props.questions &&
          <div style={styles.questionsDivStyle}>
            <QuestionsTable
              questions={this.props.questions}
            />
          </div>}
      </div>
    );
  }
}

Generate.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object.isRequired,
  learnables: PropTypes.array.isRequired,
  questions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool]),
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    learnables: state.entities.learnables === undefined ? [{ 'id': 1, 'text': 'hello' }] : state.entities.learnables,
    email: state.login.email,
    questions: state.generateQs.questions.length === 0 ? false : state.generateQs.questions,
  };
}

export default connect(mapStateToProps)(Generate);
