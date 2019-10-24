import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Button from 'react-bootstrap/Button'
import Divider from '@material-ui/core/Divider';
import Submitassign from './Submitassign';
import Parser from 'html-react-parser';
import moment from 'moment';
import GradeAssignment from './GradeAssignment';
import Moment from 'react-moment';
import LongMenu from '../../Layout/LongMenu';
import { connect } from 'react-redux';

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
        grade:false,
        opensubmission:false,
        submissions:[],
        assignmentsdata:[]
        
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
  handleClick=()=>
  {

    axios.defaults.withCredentials = true;
    axios.get('/submission/getAllSubmissions',  {params : {id : this.props.assignmentid}} )
      .then(res=>{
        if(res.status === 200)
        {
          console.log(res.data)
          this.setState({opensubmission:true,
          submissions:res.data})
         
        }
      })
  }

  componentDidMount()
  {   
    // get already populated assignment data from redux store.
    var assignmentarray = this.props.assignments.assignments;
    //filter this array and fetch information with current 
    let assignment = assignmentarray.filter(assignment => {
      return assignment._id === this.props.assignmentid });

    this.setState({
      title:assignment[0].Name,
      points:assignment[0].Points,
      content:"Submit on time",
      type:"Online",
      dueDate:assignment[0].DueDate
    });
    console.log(this.props.assignmentid)
    axios.get('/submission/', {params : {id : this.props.assignmentid}} ).then(
      res => {
        if(res.status === 200)
        {
            console.log(res.data)
            if(res.data==="No Submissions")               
              this.setState({ attempted:false});
            else
            {
              console.log(res.data);
              this.setState({ attempted:true,
              filename:res.data.Filename,
              submissiontime:res.data.Submissiontime});
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


        var data =  Array.from(this.state.submissions).map((submission, key) => {
          return (
            <tr key = {key} >                   
            <td ><a onClick={() =>this.handleOpenFile()} download>{submission.Filename}</a></td>
            <td> <Moment format="lll" date={new Date(submission.Submissiontime)}/> </td>
            <td>{ localStorage.getItem("role")==='Teacher' && <LongMenu delete={() =>this.handleDelete()} edit={() =>this.handleEdit()}/>}</td>
            </tr>
          )
          });
          
          
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
            <Col sm='9'> <h4>Submitted...!!!</h4> <a style={{color: "#094D98"}} onClick={this.handleClick}>Submission Details</a> <a style={{color: "#094D98"}}>Download File</a></Col>
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
        {this.state.opensubmission &&  <table  cellpadding="0" cellspacing="0" className="table"  cellSpacing="1" style= {{marginLeft:20 , paddingTop: 0 }}>
              <tr style={{color: "#094D98"}}>
              <th>File Name</th>
              <th>Submission time</th>
              <th></th>
              </tr>
            <tbody>{data}</tbody>
            <tr><td></td><td></td><td></td></tr>
      </table>  } 
        </div>
      )
    }
  }
}

//
const mapStateToProps = state => ({
  assignments : state.assignments,
})

export default connect (mapStateToProps, {})(AssignmentSubmission);
 