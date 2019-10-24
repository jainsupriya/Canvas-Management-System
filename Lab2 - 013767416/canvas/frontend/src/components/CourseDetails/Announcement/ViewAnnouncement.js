import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Parser from 'html-react-parser';
import {Link} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';

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
      // get already populated assignment data from redux store.
      var announcementarray = this.props.announcements.announcements;
      //filter this array and fetch information with current 
      let announcement = announcementarray.filter(announcement => {
        return announcement._id === this.props.announcementid });
        this.setState({
          title : announcement[0].Title,
          content : announcement[0].Content,
          createdId:announcement[0].CreatedBy,
          createdBy :announcement[0].Name
      });
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

const mapStateToProps = state => ({
  announcements : state.announcements,
})

export default connect (mapStateToProps, {})(ViewAnnouncement);
 