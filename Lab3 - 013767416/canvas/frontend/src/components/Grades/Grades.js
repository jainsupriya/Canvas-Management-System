import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import { Table } from 'reactstrap';
import Moment from 'react-moment';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../Layout/MiniDrawer';
import Sidebar from '../Layout/Sidebar';
import Appbar from '../Layout/Appbar';
import MenuList from '../Layout/MenuList';
import { Typography } from '@material-ui/core';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import 'react-table/react-table.css'
const axios = require('axios');

class Grades extends Component 
{
    constructor(props)
    {
      super(props);
      this.state = {
        show: false,
        count: 0,
        role:localStorage.getItem("role"),
        assignmentsgrades:[],
        username:'',
        totalPoints:'',
        course:[],
        course:'',
        assignments:[],
        quizgrades:[]
      };
    }
      toggleComponent = () => {
        this.setState(state => ({
          show: !state.show
        }));
      };
      calculateTotal(marks)
      {
        console.log('hello')
        var total = this.state.totalPoints+ marks;
        this.setState({totalPoints: total})
      }
      componentWillMount()
      {   
        axios.defaults.withCredentials = true;
        axios.get('/grades/assignments',  {params : {id :localStorage.getItem("courseid")}} ).then(
          res => {
            console.log(res.data)
            if(res.status ===200)
                this.setState({assignmentsgrades: res.data,
                });
          }
        )
                
        axios.defaults.withCredentials = true;
        axios.get('/grades/quizzes',  {params : {id :localStorage.getItem("courseid")}} ).then(
          res => {
            if(res.status ===200)
                this.setState({quizgrades: res.data,
                });
          }
        )
      }
      componentDidMount = () => {
        var coursearray = this.props.courseStore.result;
        var courseid = localStorage.getItem("courseid");
        if(coursearray)
        {
          let coursedetail = coursearray.filter(course => {
            return course._id === courseid });
          this.setState({course:coursedetail[0]});
        }
      }



  render() {
    let redirectVar = null;
    if(!this.props.loginstatus.loginstatus) 
      redirectVar = <Redirect to= "/login"/>

    var assignmentTotalMarks =0; 
    var assignmentMarksObtained=0;
    var assignmentPercentages=0;
    var quizTotalMarks =0; 
    var quizMarksObtained=0;
    var quizPercentages=0;
    //const columns = this.getColumns();
        var data =  Array.from(this.state.assignmentsgrades).map((assign, key) => {
          assignmentTotalMarks = assignmentTotalMarks +  assign.Points;
          assignmentMarksObtained = assignmentMarksObtained +  assign.MarksObtained;
            return (
              <tr key = {key} >                   
              <td >{assign.AssignmentName}</td>
              <td> <Moment format="ll" date={new Date(assign.Duedate)}/> at  <Moment format="LT" date={new Date(assign.Duedate)} /></td>
              <td>{assign.MarksObtained}</td>
              <td>{assign.Points}</td>
              </tr>
            )
        });  
        var quizdata =  Array.from(this.state.quizgrades).map((quiz, key) => {
          quizTotalMarks = quizTotalMarks +  quiz.Totalmarks;
          quizMarksObtained = quizMarksObtained +  quiz.MarksObtained;
            return (
              <tr key = {key} >                   
              <td >{quiz.Quizname}</td>
              <td> <Moment format="ll" date={new Date(quiz.Duedate)}/> at  <Moment format="LT" date={new Date(quiz.Duedate)} /></td>
              <td>{quiz.MarksObtained}</td>
              <td>{quiz.Totalmarks}</td>
              </tr>
            )
        }); 
        assignmentPercentages=(assignmentMarksObtained/assignmentTotalMarks)*100;
        console.log(assignmentPercentages)

        if(isNaN(assignmentPercentages))
         { 
           assignmentPercentages = 0;
         }
        quizPercentages=(quizMarksObtained/quizTotalMarks)*100;
          if(isNaN(quizPercentages))
              quizPercentages = 0;
      return (
        <div>{redirectVar}
        <Appbar name={this.state.course.Name}  dept={this.state.course.Dept}  nickname={this.state.course.Nickname}  term={this.state.course.Term}
            tag="Grades" />
        <Grid container>   
          <Grid item xs={0.5}>
            <MiniDrawer/>
          </Grid>  
          <Grid item xs={1.5}><br/>
            <MenuList />
          </Grid>                  
        <Grid item xs={8}>
        <br/>
        <div style={{marginLeft:30}}>
        <br/><br/><br/>
        {localStorage.getItem("role")==='Student' && <Typography variant="headline">Grades for {this.state.username}</Typography>}
        {localStorage.getItem("role")==='Student' && <Table  size="sm" style={{marginTop:70}}>
          <thead style={{color: "#094D98"}}>
              <tr>
              <th>Name</th>
              <th>Due Date</th>
              <th>Score</th>
              <th>Out Of</th>
              </tr>
          </thead>
          <tbody>
              {data}
              {quizdata}
              <tr>                   
              <th>Assignment</th>
              <td></td>
              <td> {assignmentPercentages}%</td>
              <td> {assignmentMarksObtained}/{assignmentTotalMarks}</td>
              </tr>
              <tr>                   
              <th>Quiz</th>
              <td></td>
              <td> {quizPercentages}%</td>
              <td> {quizMarksObtained}/{quizTotalMarks}</td>
              </tr>

              <tr><td></td><td></td><td></td><td></td></tr>
          </tbody>
      </Table> }
        </div>
      </Grid>
       <Grid item xs={1}>
       <Sidebar/>
       </Grid>
     </Grid>
   </div>        
      );    
    
  }
}


function mapStateToProps(state) {
  return { courseStore: state.courses ,
    loginstatus: state.loginstatus,};
}

export default connect(mapStateToProps,{ })(Grades);



