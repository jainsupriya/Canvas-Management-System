import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'reactstrap';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

const axios = require('axios');
class Submitassign extends Component 
{
      constructor(props)
      {
        super(props);
        this.state = {
          show: false,
          count: 0,
          role:localStorage.getItem("role"),
          selectedFile: null,
        };
      }
      //this.handleSubmit = this.handleSubmit.bind(this);
      fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })
      }

      handleClose =() =>
      {
        this.props.cancelSubmit();
      }
      uploadHandler = () => 
      {
        const formData = new FormData();
        formData.append(
          'myFile',
          this.state.selectedFile,
          this.state.selectedFile.name,
        );
        formData.append('courseid', this.props.courseid);
        formData.append('assignmentid', this.props.assignmentid);
          
        axios.post('/submitAssignment', formData).
        then(res=>{
          console.log(res.status);
          if(res.status === 200)
          {
            this.setState({files: res.data});
            this.props.cancelSubmit();
          }
        });
      }
    
      
    



  render() {
    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>
    return (
      <div className="border mt-5 search-container"> {redirectVar}
          <br/>
          <Container>
          <Row>
            <Col> <input type="file" onChange={this.fileChangedHandler}/></Col>
          </Row>
          <br/>
          <Row> <Col>  { this.state.role==='Student' && <Button  variant="primary" onClick={this.uploadHandler}>Submit</Button> }
          &nbsp; &nbsp; &nbsp;{ this.state.role==='Student' && <Button  variant="primary" onClick={this.handleClose}>Cancel</Button> }
          </Col></Row>
          </Container>
      <br/> 



      </div>
      );    
    }
  
}

export default Submitassign;
