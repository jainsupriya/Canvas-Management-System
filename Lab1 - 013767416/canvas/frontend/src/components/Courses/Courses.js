import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './courses.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import CreateCourse from './CreateCourse';
import { Table } from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import SearchCourses from './SearchCourses';
import Grid from '@material-ui/core/Grid';
import Layout from '../Layout/Layout';
import MiniDrawer from '../Layout/MiniDrawer';
import LongMenu from '../Layout/LongMenu';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
const axios = require('axios');

class Course extends Component 
{
  constructor(props)
  {
  super(props);


    this.state = {
      show:false,
      courses:[],
      role:localStorage.getItem("role")
      };
      //this.handleShow = this.handleShow.bind(this);
  }

    componentDidMount()
    {
      axios.defaults.withCredentials = true;
      axios.get('/courses').then(
          res => {
              if(res.status ===200)
              {
                  this.setState({courses: res.data});
                  console.log(this.state.courses);
              }
              
          }
      )
    }
    handleShow = () => {
     this.setState({show:true})
    };
    handleClose= () => {
      this.setState({show:false})
     };
    handleChange(event)
    {
      const {name, value} = event.target;
      this.setState({ [name]: value });
    }
    addCourse = (course) =>{
      console.log(course);
      let coursesarray = [...this.state.courses, course];
      console.log(coursesarray);
      this.setState({ courses: coursesarray});
      console.log(this.state.courses);
    }
    handleDelete(id){
      axios.defaults.withCredentials = true;
      const cid ={
        courseid : id
      }
      if(localStorage.getItem("role")==='Student')
      {
        axios.post('/dropcourse', cid ).then(
          res => {
            if(res.status ===200)
              {
                let course = this.state.courses.filter(course => {
                return course.courseid !== id });
                this.setState({courses:course});
                console.log(this.state.courses)
              }
          }
        )
      }
    }

  render() {
    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>

    const { show } = this.state;
    var colon =':';
    var tableData = Array.from(this.state.courses).map((course, key) => {           
      return ( 
        <tr key = {key}>         
            <td> <Link to={"/course/"+course.courseid}>{course.term}{colon}{course.name}</Link></td>
            <td>{course.dept} &nbsp;{course.nickname}</td>
            <td>{course.term}</td>
            <td>{course.published}</td>
           <td><LongMenu delete={() =>this.handleDelete(course.courseid)} edit={() =>this.handleEdit(course.courseid)}/></td>
        </tr>
      )
    })

  return (
      <Grid container>   {redirectVar}
        <Grid item xs={4.5}>
          <MiniDrawer/>
        </Grid>                    
        <Grid item xs={10}><br/>
          <div>
            <h4 style = {{marginLeft: 25} }> All Courses 
            </h4> 
            <Divider variant="middle" />
              <div className="btn-add"><Button variant="outline-primary"  onClick={this.handleShow}>Add Course</Button></div> 
              <Table hover  style = {{marginLeft: 25} }>
              <thead>
              <tr>
              <th>Course Name</th>
              <th>NickName</th>
              <th>Term</th>
              <th>Published</th>
              <th></th>
              </tr>
              </thead>
              <tbody>
              {tableData}
              <tr><td></td><td></td><td></td><td></td><td></td></tr>
              </tbody>
              </Table>
            {this.state.role==='Teacher' && show && <CreateCourse  add={this.addCourse} close={this.handleClose}/> }
            {this.state.role==='Student' && show && <SearchCourses add={this.addCourse} handleShow={this.handleShow}/> }
          </div>
        </Grid>
      </Grid>


      
  );
  }
}

export default Course;

