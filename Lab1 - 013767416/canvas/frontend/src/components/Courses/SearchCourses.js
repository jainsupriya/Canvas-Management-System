import React, { Component } from 'react';
import './courses.css';
import { Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { truncate } from 'fs';

const axios = require('axios');

class SearchCourses extends Component 
{
  constructor(props)
  {
  super(props);


    this.state = {
        value :'>=',
        cnumber:'',
        cname:'',
        cterm:'',
        cdept:'',
        role:'',
        enroll:false,
        courses : [],
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleOptionChange=this.handleOptionChange.bind(this);
      this.handleEnroll = this.handleEnroll.bind(this);
    }

    handleChange(event)
    {
      const {name, value} = event.target;
      this.setState({ [name]: value });
    }
    handleOptionChange(event) {
        this.setState({value: event.target.value});
    }    
    handleSubmit(event)
    {
      event.preventDefault();
      const searchCriteria ={
        value :this.state.value,
        cnumber:this.state.cnumber,
        cname:this.state.cname,
        cterm:this.state.cterm,
        cdept: this.state.cdept,
      }
  
      axios.defaults.withCredentials = true;
      axios.post('/searchCourse', searchCriteria).
        then(res=>{
          if(res.status === 200)
          {
             this.setState ( {
                value :'',
                cnumber:'',
                cname:'',
                cterm:'',
                role:'',
                enroll:true,
                courses:res.data
            });
          }
        });
    }
    handleEnroll(cid){
        axios.defaults.withCredentials = true;
        const c_id ={
                courseid : cid
        }
        let course = this.state.courses.filter(course => {
          return course.courseid === cid });
          course= course[0];
          this.props.add({"courseid": course.courseid ,"nickname":course.nickname, "name": course.name, "dept":course.dept, "term": course.term , "published": course.published});
        axios.post('/enroll', c_id).
          then(res=>{
            if(res.status === 200)
            {
               this.setState ( {
                  value :'',
                  cnumber:'',
                  cname:'',
                  cterm:'',
                  role:'',
                  enroll:false,
                  courses:res.data
              });
              
            }
            
          });       
    }

  render() {
    const { show } = this.state;
    if(this.state.enroll)
    {  
        var data =  Array.from(this.state.courses).map((course, key) => {
          var status = course.status
            return (
              <tr key = {key} >   
               <td >{course.dept}{course.nickname} - {course.name}</td>                
              <td >{course.room}</td>
              <td>{course.createdBy}</td>
              <td>{course.status}</td>
              <td> <button type="button" className="btn btn-primary btn-block" onClick={() =>this.handleEnroll(course.courseid)}>{status==='Available'? 'Enroll' : 'Add to Waitlist'}</button></td>
              </tr>
            )
        });    
        return(
            <div  style={{marginLeft:30}} > 
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Course</th>
                <th>Room</th>
                <th>Instructor</th>
                <th>Status</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
            </Table>
            </div>
        );
    }
    else if(!this.state.enroll)
    {
        return (
            <div className="border mt-5 search-container" style={{marginLeft:30}}> 
            <form onSubmit={this.handleSubmit} method="post">
            <br/>
                <Container>
                        <Row>
                            <Col> <lable> Course Dept </lable></Col>
                            <Col><input type="text" name="cdept" className="form-control" placeholder="Course Dept" required="required" value={this.state.dept} onChange={this.handleChange} /></Col>
                            <Col></Col><Col></Col><Col></Col> <Col></Col>
                        </Row><br/>                      
                        <Row>
                            <Col> <lable> Course Number </lable></Col>
                            <Col>
                            <select value={this.state.value} onChange={this.handleOptionChange}>
                                <option value=">=">Greater than or equal to</option>
                                <option value="=">Equal to</option>
                                <option value="<=">Less than or equal to</option>
                            </select>
                            </Col>
                            <Col><input type="text" name="cnumber" className="form-control" placeholder="Course Number" required="required" value={this.state.cnumber} onChange={this.handleChange} /></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>  
                        </Row><br/>                    
                        <Row>
                            <Col> <lable> Course Name </lable></Col>
                            <Col><input type="text" name="cname" className="form-control" placeholder="Course Name"  value={this.state.cname} onChange={this.handleChange} /></Col>
                            <Col></Col><Col></Col><Col></Col> <Col></Col>
                        </Row><br/>
                        <Row>
                            <Col> <lable> Course Term </lable></Col>
                            <Col><input type="text" name="cterm" className="form-control" placeholder="Course Term" value={this.state.cterm} onChange={this.handleChange} /></Col>
                            <Col></Col><Col></Col><Col></Col> <Col></Col>
                        </Row><br/>
                        <Row>
                            <Col><button class="btn btn-primary btn-block" type="reset">Clear</button></Col>
                            <Col><button type="submit" className="btn btn-primary btn-block">Submit</button></Col>
                            <Col><button class="btn btn-primary btn-block" type="reset" onClick={this.props.handleShow}>Back</button></Col><Col></Col><Col></Col> <Col></Col>
                        </Row>
                        
                </Container>           
            <br/> 
            </form>
            </div>
            
        );
    }

  }
}

export default SearchCourses;