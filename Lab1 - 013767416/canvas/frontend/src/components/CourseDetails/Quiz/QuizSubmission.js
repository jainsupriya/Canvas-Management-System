import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Parser from 'html-react-parser';
import {Link} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import {now} from 'moment';
import Divider from '@material-ui/core/Divider';
import TakeQuiz from './TakeQuiz';
import Moment from 'react-moment';
import Button from 'react-bootstrap/Button'
import { throws } from 'assert';
const axios = require('axios');

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
    axios.defaults.withCredentials = true;
    axios.get('/quizinfo', {params : {id : this.props.quizid}} ).then(
      res => {
        if(res.status ===200)
        {
            this.setState({
                title : res.data.quizdata.title,
                content : res.data.quizdata.content,
                type:res.data.quizdata.type,
                marks :res.data.quizdata.marks,
                dueDate:res.data.quizdata.dueDate,
                noOfQues:res.data.quizdata.noOfQuestions,
            });
        }
      }
    )
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
//  {this.state.submit && <Submitassign courseid = {this.props.courseid}/>}

export default QuizSubmission;

/*
    <Container>
      <Row>
        <Col><h3>{this.state.title}</h3></Col>
        <Col></Col>
    <Col>{this.state.role==='Student' && now.isBefore( moment(this.state.dueDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')) && <Button variant="primary" onClick={this.handleSubmit}>  {localStorage.getItem("role")==='Teacher' ? "Publish" : "Submit"} Quiz</Button>}</Col>
      </Row>
    </Container>    
    <Divider/>*/