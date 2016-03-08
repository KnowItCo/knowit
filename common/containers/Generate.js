/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/actions';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

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
    const mainDivStyle = {
      paddingTop: 70,
      position: 'absolute',
      margin: 'auto',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 600,
      height: 400,
    };
    const questionsDivStyle = {
      paddingTop: 30,
    };

    return (
      <div style={mainDivStyle}>
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
          <div style={questionsDivStyle}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Question</TableHeaderColumn>
                  <TableHeaderColumn>Answer</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableRowColumn>{this.props.questions[0].question}</TableRowColumn>
                  <TableRowColumn>{this.props.questions[0].answer}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>{this.props.questions[1].question}</TableRowColumn>
                  <TableRowColumn>{this.props.questions[1].answer} </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Fake</TableRowColumn>
                  <TableRowColumn>Fake</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
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
    questions: [{"simplefactualrepresentation":"Nick is cool","question":"What is cool?","answer":"Nick","score":"1.1353911710629263"},{"simplefactualrepresentation":"Nick is cool","question":"Is Nick cool?","score":"0.7274952917002897"}],
    // questions: state.entities.questions === undefined ? false : state.entities.questions,
  };
}

export default connect(mapStateToProps)(Generate);
