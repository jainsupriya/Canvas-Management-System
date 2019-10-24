import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Courses from './Courses'

const axios = require('axios');

class CreateCourse extends Component 
{

  constructor(props)
  {
      super(props);
        this.state = {
            nickname:"",
            name:"",
            dept:"",
            desc:"",
            room:"",
            capacity:"",
            waitlist:"",
            term:"",
            show:true,
            };
            this.handleShow = this.handleShow.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.handleSave = this.handleSave.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleNickNameChange = (e) => {
    this.setState({
        nickname : e.target.value
    })
  }
  handleNameChange = (e) => {
    this.setState({
        name : e.target.value
    })
  }
  handleDeptChange = (e) => {
    this.setState({
        dept : e.target.value
    })
  }
  handleDescChange = (e) => {
    this.setState({
        desc : e.target.value
    })
  }
  handleRoomChange = (e) => {
    this.setState({
        room : e.target.value
    })
  }
  handleCapacityChange = (e) => {
    this.setState({
        capacity : e.target.value
    })
  }
  handleWaitlistChange = (e) => {
    this.setState({
        waitlist : e.target.value
    })
  }
  handleTermChange = (e) => {
    this.setState({
        term : e.target.value
    })
  }
  handleSave(event) {
    event.preventDefault();
    const courseDetails ={
      nickname:this.state.nickname,
      name: this.state.name,
      dept: this.state.dept,
      desc: this.state.desc,
      room: this.state.room,
      capacity: this.state.capacity,
      waitlist: this.state.waitlist,
      term: this.state.term,
      };
      this.props.close();
     axios.defaults.withCredentials = true;
      axios.post('/course/', courseDetails).then(res=>
      {
        console.log('course added successfully');
        this.props.add({"Nickname":this.state.nickname, "Name": this.state.name, "Dept":this.state.dept, "Term": this.state.term, "published": "Yes"});
      });

  }
  render() {
    let redirectVar = null;
    return (
    <div>
       <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Start a new Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form method="post" onSubmit={this.handleSave}>
            <div className="form-group">
              <label> Course NickName </label><input type="text" name="nickname" className="form-control" placeholder="NickName" required value={this.state.nickname} onChange={this.handleNickNameChange} />
              </div>
              <div className="form-group">
              <label> Course Name </label><input type="text" name="name" className="form-control" placeholder="Course Name" required value={this.state.name} onChange={this.handleNameChange} />
              </div>
              <div className="form-group">
              <label> Course Department </label><input type="text" name="dept" className="form-control" placeholder="Department" required="required" value={this.state.dept} onChange={this.handleDeptChange} />
              </div>
              <div className="form-group">
              <label> Course Description </label><input type="text" name="desc" className="form-control" placeholder="Description" required="required" value={this.state.desc} onChange={this.handleDescChange} />
              </div>
              <div className="form-group">
              <label> Course Room </label><input type="text" name="room" className="form-control" placeholder="Room No" required="required" value={this.state.room} onChange={this.handleRoomChange} />
              </div>
              <div className="form-group">
              <label> Course Capacity </label><input type="text" name="capacity" className="form-control" placeholder="Capacity" required="required" value={this.state.capacity} onChange={this.handleCapacityChange} />
              </div>
              <div className="form-group">
              <label> Waitlist Capacity </label><input type="text" name="waitlist" className="form-control" placeholder="Waitlist" required="required" value={this.state.waitlist} onChange={this.handleWaitlistChange} />
              </div>
              <div className="form-group">
              <label> Course Term </label><input type="text" name="term" className="form-control" placeholder="Term" required="required" value={this.state.term} onChange={this.handleTermChange} />
              </div>
            <div className="clearfix">
            </div>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>&nbsp;&nbsp;&nbsp;
            <Button variant="primary" onClick={this.handleSave}>
              Add Course
            </Button>
        </form>
          </Modal.Body>
        </Modal>
    </div>
    )
  }
}

export default CreateCourse;
