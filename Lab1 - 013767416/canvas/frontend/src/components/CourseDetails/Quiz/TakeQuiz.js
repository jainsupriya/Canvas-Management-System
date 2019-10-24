import React,{Component} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Table } from 'reactstrap';
import {  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Parser from 'html-react-parser';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import {now} from 'moment';
import Button from 'react-bootstrap/Button'
const axios = require('axios');
const map = new Map();
class TakeQuiz extends Component{

 
    constructor(props)
    {

        super(props);
        this.state = {
            questions : [],
            op1 : '', 
            op2 : '',
            op3 : '',
            op4 : '',
            selected :'',
            answers:[],
            size:''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        console.log(event.target.value);
        var value = event.target.value;
        var res = value.split("_");
        map.set(res[0], res[1]);
        console.log(map);
        this.setState({
          selected: event.target.value
        });
      }
    handleSubmit(event)
    {
      
      event.preventDefault();

      var ans = [...map.values()]
      let tempans = [...this.state.answers, ans];
      this.setState({ answers: tempans});
      console.log(this.state.answers)
      /*const logindetails ={
      email : this.state.email,
      password:this.state.password
      }

        axios.defaults.withCredentials = true;
        axios.post('/submitquiz', {params : {id :  this.props.quizid}}  ).then(
            res => {
            if(res.status ===200)
                 {
                    this.setState({questions: res.data});
                    console.log(this.state.questions)
                 }
            }
        )*/
      }
    componentDidMount()
    { 
        axios.defaults.withCredentials = true;
        axios.get('/quizquestions', {params : {id :  this.props.quizid}}  ).then(
            res => {
            if(res.status ===200)
                 {
                    this.setState({questions: res.data});
                    console.log(this.state.questions)
                 }
            }
        )
    }
    render()
    {
        var questions = this.state.questions.map((que, key) => {      
            return (   
                <Table responsive  key = {key} >
                <thead>
                  <tr>
                    <th>{Parser(que.question)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr> <td> <input type="radio" value= { key + "_op1"}  onChange = {this.handleChange} checked={this.state.selected ===  key + "_op1"}/> {que.option1}</td></tr>
                  <tr> <td> <input type="radio" value= { key + "_op2"}  onChange = {this.handleChange}  checked={this.state.selected ===  key + "_op2"}/> {que.option2}</td></tr>
                  <tr> <td><input type="radio"  value= { key + "_op3"}   onChange = {this.handleChange}    checked={this.state.selected ===  key + "_op3"}/> {que.option3}</td></tr>
                  <tr> <td> <input type="radio" value= { key + "_op4"}  onChange = {this.handleChange} checked={this.state.selected ===  key + "_op4"}/> {que.option4}</td></tr>
                </tbody>
              </Table>
            )  
            }) 
        return(
        <div className="center-align container mt-5">
        <form onSubmit={this.handleSubmit} method="post">
        {questions}

        <Container>
        <Row>
            <Col></Col>
            <Col><Button variant="primary"  onClick={this.handleSubmit}>  Submit Quiz</Button></Col>
            <Col></Col>
        </Row>
        </Container>  
        </form>
        </div>

        
        )
    }
};
export default TakeQuiz;