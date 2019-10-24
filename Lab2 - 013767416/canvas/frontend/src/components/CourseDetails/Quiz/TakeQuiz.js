import React,{Component} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Table } from 'reactstrap';
import Parser from 'html-react-parser';
import { Container, Row, Col } from 'reactstrap';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';

const axios = require('axios');
const op = new Map();

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
            size:'',
            marks_obtained:'',
            optionChange:''

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
      let arr = (event.target.value).split('_');
      op.set(Number(arr[0]), arr[1]);
      this.setState({optionChange:arr});
    }

    handleSubmit(event)
    {
      
      event.preventDefault();
      var ans = [...op.values()]
      
      let tempans = {
        answers: ans,
        quizid: this.props.quizid
      };
        console.log(tempans)
        axios.defaults.withCredentials = true;
        axios.post('/quiz/submit', tempans).then(
            res => {
            if(res.status ===200)
                 {
                    this.setState({marks_obtained: res.data});
                    console.log(this.state.marks_obtained)
                 }
            }
        )
      }
    componentDidMount()
    { 
      var quizarray = this.props.quizzes.quizzes;
      console.log(quizarray)
      //filter this array and fetch information with current 
      let quiz = quizarray.filter(quiz => {
        return quiz._id === this.props.quizid });

        this.setState({
          questions : quiz[0].Questions,
      });
     
      console.log(this.state.questions)
    }
    render()
    {
        var questions = this.state.questions.map((que, key) => {   
            return (   
                <Table responsive  key = {key} >
                <thead>
                  <tr>
                    <th>{Parser(que.content)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr> <td> <input type="radio" value= { key + "_op1"}  onChange = {this.handleChange} checked={op.get(key) ===  "op1"}/> {que.op1}</td></tr>
                  <tr> <td> <input type="radio" value= { key + "_op2"}  onChange = {this.handleChange}  checked={op.get(key) ===  "op2"}/> {que.op2}</td></tr>
                  <tr> <td><input type="radio"  value= { key + "_op3"}   onChange = {this.handleChange}    checked={op.get(key) ===  "op3"}/> {que.op3}</td></tr>
                  <tr> <td> <input type="radio" value= { key + "_op4"}  onChange = {this.handleChange} checked={op.get(key) ===  "op4"}/> {que.op4}</td></tr>
                </tbody>
              </Table>
            )  
            }) 
        return(
          
        <div className="center-align container mt-5">
            {this.state.marks_obtained && <h6>congratulations....!!! you have got {this.state.marks_obtained} marks...</h6>}
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

function mapStateToProps(state) {
  return { quizzes: state.quizzes };
}

export default connect (mapStateToProps, {})(TakeQuiz);
 