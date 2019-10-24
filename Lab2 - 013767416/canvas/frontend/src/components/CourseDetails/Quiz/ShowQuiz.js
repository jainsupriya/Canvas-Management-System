import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import LongMenu from '../../Layout/LongMenu';
import { Container, Row, Col } from 'reactstrap';
import QuizSubmission from './QuizSubmission';
import { getQuizzes } from "../../../actions";
import { connect } from 'react-redux';


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
    this.props.getQuizzes();
  }
  componentWillReceiveProps(nextProps) {
  
    if (nextProps.quizzes) {
      console.log( nextProps.quizzes.quizzes);
        this.setState({
          quizDetail: nextProps.quizzes.quizzes
        });
    }  
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
          <b><a style={{color: "#094D98"}}  onClick= {() =>this.openQuiz(quiz._id)} >{quiz.Title}</a></b>
          </Typography>
          <Typography component="p">
          Due <Moment format="ll" date={new Date(quiz.Duedate)}/> at  <Moment format="LT" date={new Date(quiz.Duedate)} />  {pipe} {quiz.Marks} Marks
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

function mapStateToProps(state) {
  return { quizzes: state.quizzes };
}
      
export default connect(mapStateToProps,{ getQuizzes })(withStyles(styles)(ShowQuiz));
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