import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
// import CardHeader from 'material-ui/lib/card/card-header';
// import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';

export default class Generate extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const learnableToGenerate = this.props.learnables.filter((item) => {
      return item.id === +this.props.params.learnableid.split(':')[1];
    });
    this.setState({
      learnableToGenerate,
    });
  }

  render() {
    const learnable = {
      text: this.state.learnableToGenerate[0].text,
      tag: this.state.learnableToGenerate[0].tags[0],
    };
    const divStyle = {
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

    return (
      <div style={divStyle}>
      <Card>
        <CardTitle title={learnable.tag} />
        <CardText>
          {learnable.text}
        </CardText>
        <CardActions>
          <RaisedButton label="Generate Qs" />
        </CardActions>
      </Card>
      </div>
    );
  }
}

Generate.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  learnables: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    learnables: state.entities.learnables === undefined ? [{ 'id': 1, 'text': 'hello' }] : state.entities.learnables,
    email: state.login.email,
  };
}

export default connect(mapStateToProps)(Generate);
