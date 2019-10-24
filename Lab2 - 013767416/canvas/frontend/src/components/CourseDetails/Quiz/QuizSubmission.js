import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Parser from 'html-react-parser';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import TakeQuiz from './TakeQuiz';
import Moment from 'react-moment';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';

class QuizSubmission extends Component 
{

  constructor(props)
  {
      super(props);
      this.state = {
        submit:false,
        title: '',
        content:'',
        createdBy:'',
        createdId:'',
        type:'',
        noOfQues:'',
        marks:'',
        dueDate:''
      };
  }
  handleSubmit = () => {
    this.setState({submit:true});
  };
  componentDidMount()
  { 
      // get already populated assignment data from redux store.
      var quizarray = this.props.quizzes.quizzes;
      //filter this array and fetch information with current 
      let quiz = quizarray.filter(quiz => {
        return quiz._id === this.props.quizid });
        this.setState({
          title : quiz[0].Title,
          content : quiz[0].Content,
          marks :quiz[0].Marks,
          dueDate:quiz[0].Duedate,
          noOfQues:quiz[0].NoOfQuestions,

      });
  }
  render() {
    const now = moment();
    if(this.state.submit)
      return (<TakeQuiz courseid = {this.props.courseid} quizid= {this.props.quizid}/>)
    return ( 
    <div className="center-align container mt-5">
    <Container>
      <Row>
        <Col><Typography variant="headline">{this.state.title}</Typography></Col>
      </Row>
      <Divider/>
      <br/>
      <Row>
        <Col sm='3'><b>Points:</b>{this.state.marks}</Col>
        <Col sm='3'><b>Questions:</b>{this.state.noOfQues}</Col>
        <Col sm='5'><b>Available Till:</b> <Moment format="ll" date={new Date(this.state.dueDate)}/> at  <Moment format="LT" date={new Date(this.state.dueDate)} /></Col>
      </Row>
      <Row>
        <Col><b>Quiz Type:</b>{this.state.type}</Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container> 
    <br/> 
    <Divider/>
    <br/>
    <Container>
      <Row>
        <Col>{Parser(this.state.content)}</Col>
      </Row>
    </Container>   
    <br/>
    <br/>
    <Container>
      <Row>
        <Col></Col>
        <Col>{ now.isBefore( moment(this.state.dueDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')) && <Button variant="primary" onClick={this.handleSubmit}>  {localStorage.getItem("role")==='Teacher' ? "View" : "Take"} Quiz</Button>}</Col>
        <Col></Col>
      </Row>
    </Container>  
    <br/>  
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { quizzes: state.quizzes };
}

export default connect (mapStateToProps, {})(QuizSubmission);
 