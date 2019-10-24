import React, { Component } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const axios = require('axios');

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  content:{
    marginLeft: 10,
  }
});
class ShowQuestions extends Component 
{

  constructor(props)
  {
      super(props);
      this.state = {
        questionarray : [],
      }
      console.log('show');
  }
  componentWillReceiveProps(props)
  {
    console.log(this.state.questionarray)
    console.log(this.props.questions)
    this.setState({questionarray: this.props.questions});
    console.log(this.state.questionarray)
    /*console.log('updated');
    axios.defaults.withCredentials = true;
    axios.get('/showquestions', {params : {id : this.props.quizid}} ).then(
      res => {
        if(res.status ===200)
            this.setState({questions: res.data});
      }
    )*/

  }
  render() {
    const { classes } = this.props;
    var pipe = " | "
    return (
    <div className="center-align container mt-5">

    <div className ="item-group-container" data-view="assignmentGroups" id="ag-list"> 
    <div className ="collectionViewItems ig-list ui-sortable">
    <ListGroup>
    {this.state.questionarray.map(function(ques, key) {          
        return (
            
              <ListGroupItem  key={key}>
              <ListGroupItemText className={classes.content}>   {Parser(ques.content)}</ListGroupItemText>
              </ListGroupItem>
            
          )  
          })}
        </ListGroup>
          <br/>
        </div>
        </div>
        </div>
    )
  }
}
ShowQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowQuestions);
