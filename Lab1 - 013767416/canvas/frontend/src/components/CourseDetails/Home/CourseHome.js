import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../../Layout/MiniDrawer';
import Sidebar from '../../Layout/Sidebar';
import Appbar from '../../Layout/Appbar';
import MenuList from '../../Layout/MenuList';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
const axios = require('axios');

class CourseHome extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
    term:'',
    name:'',
    nickname:'',
    dept:''
    };
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
  }
  render() {
    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>
    localStorage.setItem("courseid", this.props.match.params.id);
    console.log(localStorage.getItem("courseid"));
    return (
      <div>{redirectVar}
            <Appbar name={this.state.name}  dept={this.state.dept}  nickname={this.state.nickname}  term={this.state.term}
            tag="Home" />
        <Grid container>   
          <Grid item xs={0.5}>
            <MiniDrawer/>
          </Grid>  
          <Grid item xs={2}><br/>
          <MenuList />
          </Grid>                  
          <Grid item xs={7.5}><br/>
            <div>
              <h5>Recent Activities</h5>
            </div>
          </Grid>
          <Grid item xs={2}><br/>
              <Sidebar/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CourseHome;