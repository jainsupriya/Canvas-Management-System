import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Button from 'react-bootstrap/Button'
import Divider from '@material-ui/core/Divider';
import Submitassign from './Submitassign';
import Parser from 'html-react-parser';
import moment from 'moment';
import GradeAssignment from './GradeAssignment';
import Moment from 'react-moment';

const axios = require('axios');

class AssignmentSubmission extends Component 
{

  constructor(props)
  {
      super(props);
      this.state = {
        title:'',
        dueDate:'',
        content:'',
        points:'',
        type:'',
        submit:false,
        role:localStorage.getItem("role"),
        attempted:false,
        submissiontime:'',
        filename:'',
        grade:false
        
      };
  }
  cancelSubmit = () => {
    this.setState({submit : false,attempted:true
    });
  };
  handleClose = () => {
    this.setState({submit : false
    });
  };
  handleSubmit = () => {
    if(localStorage.getItem("role")==='Teacher')
    {
      axios.defaults.withCredentials = true;
      axios.put('/updateAssignment', {params : {id : this.props.assignmentid}} ).then(
        res => {
          if(res.status === 200)
          {
              console.log("updated");
              this.setState({submit:true});
          }
        }
      )
    }
    else
      this.setState({submit:true});   
  };

  handleCheck=()=>
  {
    if(localStorage.getItem("role")==='Teacher')
    {
      this.setState({grade:true})
    }   
  }

  componentDidMount()
  {   
    axios.defaults.withCredentials = true;
    axios.get('/assignmentinfo', {params : {id : this.props.assignmentid}} ).then(
      res => {
        if(res.status === 200)
        {
            this.setState({
              title: res.data.assignmentdata.name,
              points:res.data.assignmentdata.points,
              content:res.data.assignmentdata.content,
              type:res.data.assignmentdata.submissionType,
              dueDate:res.data.assignmentdata.dueDate

            });
        }
      }
    )
    axios.get('/submissiondetails', {params : {id : this.props.assignmentid}} ).then(
      res => {
        if(res.status === 200)
        {
            if(res.data.submissiondata === 'No Submission')               
              this.setState({ attempted:false});
            else
            {
              this.setState({ attempted:true,
              filename:res.data.submissiondata.filename,
              submissiontime:res.data.submissiondata.submissiontime});
            }            
        }
      }
    )
  }

  render() {
    const now = moment();
      if(this.state.grade){
        return(<GradeAssignment  points={this.state.points} assignmentid={this.props.assignmentid}/>);
      }
      else{
      return (  
        <div className="center-align container mt-5">
        <Container>
          <Row>
            <Col><h3>{this.state.title}</h3></Col>
            <Col></Col>
        <Col>{this.state.role==='Student' && now.isBefore( moment(this.state.dueDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')) && <Button variant="primary" onClick={this.handleSubmit}> {localStorage.getItem("role")==='Student' && this.state.attempted ? "Re" :  ""} {localStorage.getItem("role")==='Teacher' ? "Publish" :  "Submit"} Assignment</Button>}</Col>
          </Row>
        </Container>    
        <Divider/>
        <br/>
        <Container>
          <Row>
            <Col><b>Due: </b> <Moment format="ll" date={new Date(this.state.dueDate)}/> at  <Moment format="LT" date={new Date(this.state.dueDate)} /></Col>
            <Col><b>Points:</b>{this.state.points}</Col>
            <Col></Col>
          </Row>
          <Row>
            <Col><b>Submission Type:</b>{this.state.type}</Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          {this.state.attempted && this.state.role==='Student' &&<Row>
            <Col sm='9'> <h4>Submitted...!!!</h4> <a style={{color: "#094D98"}}>Submission Details</a> <a style={{color: "#094D98"}}>Download File</a></Col>
          </Row>}
        </Container> 
        <br/> 
        <Divider/>
        <br/>
        <Container>
          <Row>
            <Col>{Parser(this.state.content)}</Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>{this.state.role==='Teacher' && now.isBefore( moment(this.state.dueDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')) && <Button variant="primary" onClick={this.handleCheck}> Grade Assignment</Button>}</Col>
            <Col></Col>
            </Row>
        </Container>    
        <br/>  
        <div>
        {this.state.submit && <Submitassign courseid = {this.props.courseid} assignmentid={this.props.assignmentid} cancelSubmit ={this.handleClose}/>}
        <br/>
        </div>
        </div>
      )
    }
  }
}

export default AssignmentSubmission;
