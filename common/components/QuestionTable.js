import React, { Component, PropTypes } from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

export default class QuestionTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tableRowStyle = {
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      fontFamily: 'Roboto',
      height: 60,
      paddingTop: 3,
      paddingBottom: 3,
      paddingRight: 5,
    };
    const { questions } = this.props;
    const questionsList = questions.map((question) => {
      if (question.answer && question.score > 0) {
        return <TableRow style={tableRowStyle}><TableRowColumn style={tableRowStyle}>{question.question}</TableRowColumn><TableRowColumn style={tableRowStyle}>{question.answer}</TableRowColumn></TableRow>;
      }
    });

    return (
      <div>
        <Table multiSelectable >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Question</TableHeaderColumn>
              <TableHeaderColumn>Answer</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover >
          {questionsList}
          </TableBody>
        </Table>
      </div>
    );
  }
}

QuestionTable.propTypes = {
  questions: PropTypes.array.isRequired,
};
