import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import LongMenu from '../../Layout/LongMenu';
import { Container, Row, Col } from 'reactstrap';
import QuizSubmission from './QuizSubmission';

const axios = require('axios');

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
});

class ShowQuiz extends Component 
{

  constructor(props)
  {
      super(props);
      this.state = {
        quizDetail : [],
        quizId:'',
        openQuiz:false
      }
  }
  componentWillMount()
  {
    
    axios.defaults.withCredentials = true;
    axios.get('/showquizzes', {params : {id : this.props.courseid}} ).then(
      res => {
        if(res.status ===200)
            this.setState({quizDetail: res.data});
      }
    )
  }
  openQuiz = (id) => {
    this.setState({ quizId:id,
    openQuiz:true});  
 };
  render() {
    const { classes } = this.props;
    var pipe = " | "

      if(this.state.openQuiz)
        return( 
          <div><QuizSubmission courseid = {this.props.courseid} quizid = {this.state.quizId}/> </div>
        )     
      var data = this.state.quizDetail.map((quiz, key) => {         
        return (           
          <Paper className={classes.root} elevation={1} key = {key}>
          <Container>
          <Row>
          <Col sm='10'>    
          <Typography component="p" >
          <b><a style={{color: "#094D98"}}  onClick= {() =>this.openQuiz(quiz.quizid)} >{quiz.title}</a></b>
          </Typography>
          <Typography component="p">
          Due <Moment format="ll" date={new Date(quiz.dueDate)}/> at  <Moment format="LT" date={new Date(quiz.dueDate)} />  {pipe} {quiz.marks} Marks
          </Typography>
          </Col>
        <Col sm='2'>{localStorage.getItem("role")==='Teacher' && <LongMenu/>}</Col>
          </Row>
          </Container>
          </Paper>
        )  
        })
      return (
        <div className="center-align container mt-5">
          <div className ="item-group-container" data-view="assignmentGroups" id="ag-list"> 
            <div className ="collectionViewItems ig-list ui-sortable">
            {data}
            <br/>
            </div>
          </div>
        </div>
      )
  }
}
ShowQuiz.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowQuiz);


  /*
      <div className = "border mt-5 search-container">
    <br/>


    {this.state.quizDetail.map(function(quiz, key) {
                  
                  return (
                    <ListGroup key={key}>
                    <ListGroupItem >
                      <ListGroupItemHeading>{quiz.title}</ListGroupItemHeading>
                      <ListGroupItemText>
                      {quiz.marks}
                      </ListGroupItemText>
                    </ListGroupItem>
                  </ListGroup>
                
                  )
  
                })}




  </div>
*/