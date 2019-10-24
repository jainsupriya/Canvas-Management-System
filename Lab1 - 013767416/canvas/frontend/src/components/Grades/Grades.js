import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import Button from 'react-bootstrap/Button'
import Search from '../Search';
import { Container, Row, Col } from 'reactstrap';
import { Table } from 'reactstrap';
import Moment from 'react-moment';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../Layout/MiniDrawer';
import Sidebar from '../Layout/Sidebar';
import Appbar from '../Layout/Appbar';
import MenuList from '../Layout/MenuList';
import { Typography } from '@material-ui/core';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ReactTable from "react-table";
import 'react-table/react-table.css'
const axios = require('axios');

class assignmentsgrades extends Component 
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
        term:'',
        name:'',
        nickname:'',
        dept:'',
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
        axios.get('/assignmentgrades',  {params : {id :localStorage.getItem("courseid")}} ).then(
          res => {
            if(res.status ===200)
                this.setState({assignmentsgrades: res.data.grades,
                  username:res.data.name
                });
          }
        )
                
        axios.defaults.withCredentials = true;
        axios.get('/quizgrades',  {params : {id :localStorage.getItem("courseid")}} ).then(
          res => {
            if(res.status ===200)
                this.setState({quizgrades: res.data.grades,
                  username:res.data.name
                });
          }
        )
      }
      componentDidMount = () => {
        axios.defaults.withCredentials = true;
        axios.get('/coursedetails', {params : {id :localStorage.getItem("courseid")}}  ).then(
          res => {
            if(res.status ===200)
            {
                this.setState(
                  {
                    name:res.data.name,
                    term:res.data.term,
                    nickname:res.data.nickname,
                    dept:res.data.dept
                  });     
            }    
          }
        )
        axios.defaults.withCredentials = true;
        axios.get('/submissions', {params : {id :localStorage.getItem("courseid")}}  ).then(
          res => {
            if(res.status ===200)
            {
                this.setState(
                  {
                    name:res.data.name,
                    term:res.data.term,
                    nickname:res.data.nickname,
                    dept:res.data.dept
                  });     
            }    
          }
        )
        axios.defaults.withCredentials = true;
        axios.get('/assignmentnames', {params : {id :localStorage.getItem("courseid")}}  ).then(
          res => {
            if(res.status ===200)
            {
                this.setState(
                  {
                     assignments: res.data
                  });     
              // console.log( this.state.assignments);
            }    
          }
        )  
      }

      /*getColumns() {
        /*var data1 =  Array.from(this.state.assignments).map((assign, key) => {
          console.log(assign.name);
           return assign.name;
        }); 
       // console.log(data1);
              const data = {
        initial_data: [
          {
            "Node JS" : "Supriya",
            "React JS" : "Tej"
          },        
        ]
      };
        return Object.keys(data.initial_data[0]).map(value => {
          return {
            Header: value,
            accessor: value
          };
        });
      }*/

  render() {
    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>
    const { show } = this.state
    var assignmentTotalMarks =0; 
    var assignmentMarksObtained=0;
    var assignmentPercentages=0;
    var quizTotalMarks =0; 
    var quizMarksObtained=0;
    var quizPercentages=0;
    //const columns = this.getColumns();
        var data =  Array.from(this.state.assignmentsgrades).map((assign, key) => {
          assignmentTotalMarks = assignmentTotalMarks +  assign.points;
          assignmentMarksObtained = assignmentMarksObtained +  assign.marks_obtained;
            return (
              <tr key = {key} >                   
              <td >{assign.name}</td>
              <td> <Moment format="ll" date={new Date(assign.dueDate)}/> at  <Moment format="LT" date={new Date(assign.dueDate)} /></td>
              <td>{assign.marks_obtained}</td>
              <td>{assign.points}</td>
              </tr>
            )
        });  
        var quizdata =  Array.from(this.state.quizgrades).map((quiz, key) => {
          quizTotalMarks = quizTotalMarks +  quiz.marks;
          quizMarksObtained = quizMarksObtained +  quiz.marks_obtained;
            return (
              <tr key = {key} >                   
              <td >{quiz.title}</td>
              <td> <Moment format="ll" date={new Date(quiz.dueDate)}/> at  <Moment format="LT" date={new Date(quiz.dueDate)} /></td>
              <td>{quiz.marks_obtained}</td>
              <td>{quiz.marks}</td>
              </tr>
            )
        }); 
        assignmentPercentages=(assignmentMarksObtained/assignmentTotalMarks)*100;
        if(isNaN(assignmentPercentages))
          assignmentPercentages = 0;
        quizPercentages=(quizMarksObtained/quizTotalMarks)*100;
          if(isNaN(quizPercentages))
            assignmentPercentages = 0;
      return (
        <div>{redirectVar}
        <Appbar name={this.state.name}  dept={this.state.dept}  nickname={this.state.nickname}  term={this.state.term}
        tag="assignmentsgrades" />
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

export default assignmentsgrades;
