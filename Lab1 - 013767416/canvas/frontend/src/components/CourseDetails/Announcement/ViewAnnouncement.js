import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Parser from 'html-react-parser';
import {Link} from 'react-router-dom';
import { Typography } from '@material-ui/core';

const axios = require('axios');

class ViewAnnouncement extends Component 
{

  constructor(props)
  {
      super(props);
      this.state = {
        submit:false,
        title: '',
        content:'',
        createdBy:'',
        createdId:''
      };
  }
  handleSubmit = () => {
    this.setState({submit:true});
  };
  componentDidMount()
  { 
    axios.defaults.withCredentials = true;
    axios.get('/announcementinfo', {params : {id : this.props.announcementid}} ).then(
      res => {
        if(res.status ===200)
        {
          console.log(res.data)
            this.setState({
                title : res.data.announcementdata.title,
                content : res.data.announcementdata.content,
                createdId:res.data.announcementdata.createdBy,
                createdBy :res.data.announcementdata.name
            });
        }
      }
    )
  }
  render() {
    return (
    <div className="center-align container mt-5">
        <Container>
        <Row>
            <Col><h6>{this.state.title}</h6></Col>
            <Col></Col>
            <Col></Col>
        </Row>
        <Row>
            <Col><Typography variant="subtitle2"><Link to={"/people/"+this.state.createdId}>{this.state.createdBy}</Link></Typography> </Col>
            <Col></Col>
            <Col></Col>
        </Row>
        </Container>    
        <br/>
        <Container>
        <Row>
            <Col><Typography variant="body2">{Parser(this.state.content)}</Typography></Col>
        </Row>
        </Container>    
        <br/>  
    </div>
    )
  }
}
//  {this.state.submit && <Submitassign courseid = {this.props.courseid}/>}

export default ViewAnnouncement;
