import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import Button from 'react-bootstrap/Button'
import Search from '../../Search';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../../Layout/MiniDrawer';
import Appbar from '../../Layout/Appbar';
import MenuList from '../../Layout/MenuList';
import { Container, Row, Col } from 'reactstrap';
import Add from "@material-ui/icons/Add";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


const axios = require('axios');
class Random extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
    show: false,
    count: 0,
    term:'',
    name:'',
    nickname:'',
    dept:''
    };
  }
  pnrcodes = () => 
  {
    axios.defaults.withCredentials = true;
    axios.get('/pnr', {params : {id :localStorage.getItem("courseid")}}  ).then(
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
  };

  render() {
    const { show } = this.state;
    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>

     
      return (
          <div>{redirectVar}
            <Appbar name={this.state.name}  dept={this.state.dept}  nickname={this.state.nickname}  term={this.state.term}
            tag="Assignment" />
            <Grid container>   
              <Grid item xs={0.5}>
                <MiniDrawer/>
              </Grid>  
              <Grid item xs={1.5}><br/>
                <MenuList />
              </Grid>                  
            <Grid item xs={8}>
            <br/>
            <div >
           <br/><br/><br/>
            <div >
              <Container>
              <Row>
              <Col> {!show &&<Search/>}</Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col> {!show && localStorage.getItem("role")==='Teacher' &&<Button variant="primary"  onClick={this.pnrcodes}> Generate PNR Codes</Button>}</Col>
              </Row>
              </Container>       
            </div>
          </div>
          </Grid>

         </Grid>
       </div>
      );
  }
}

export default Random;
