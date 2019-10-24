import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import Button from 'react-bootstrap/Button'
import Search from '../Search';
import { Container, Row, Col } from 'reactstrap';
import { Table } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../Layout/MiniDrawer';
import Sidebar from '../Layout/Sidebar';
import Appbar from '../Layout/Appbar'
import MenuList from '../Layout/MenuList';
import LongMenu from '../Layout/LongMenu';
import {Link} from 'react-router-dom';
import { Typography } from '@material-ui/core';
const axios = require('axios');
class ViewPeopleInfo extends Component 
{
    constructor(props)
    {
      super(props);
      this.state = {
        show: false,
        count: 0,
        sid:'',
        file:'',
        term:'',
        name:'',
        nickname:'',
        dept:'',
        username:'',
        contact:'',
        aboutme:'',
      };
    }
      componentDidMount()
      {
        
        axios.defaults.withCredentials = true;
        
        axios.get('/profile', {params : {id :  this.props.match.params.id}}).then(
          res => {
            if(res.status ===200)
            {
                console.log(res.data.userdata)
                this.setState({
                    username: res.data.userdata.name,
                    contact:res.data.userdata.phone,
                    aboutme:res.data.userdata.aboutme });
            }
          }
        )

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
      }
  render() {

    return (
    <div>
    <Appbar name={this.state.name}  dept={this.state.dept}  nickname={this.state.nickname}  term={this.state.term}
    tag="People"  />
    <Grid container>   
        <Grid item xs={0.5}>
            <MiniDrawer/>
        </Grid>  
        <Grid item xs={1.5}><br/>
            <MenuList />
        </Grid>                  
    <Grid item xs={8}>
        <div style={{marginLeft:50}} >
        <br/><br/><br/><br/>
        <Typography variant="display1">{this.state.username}</Typography>
        <Typography variant="h6"> Contact: {this.state.contact} </Typography>
        <Typography variant="h6"> About Me: {this.state.aboutme}</Typography>
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

export default ViewPeopleInfo;
