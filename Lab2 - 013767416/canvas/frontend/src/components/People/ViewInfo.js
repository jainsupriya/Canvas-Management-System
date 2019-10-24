import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../Layout/MiniDrawer';
import Sidebar from '../Layout/Sidebar';
import Appbar from '../Layout/Appbar'
import MenuList from '../Layout/MenuList';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
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
        username:'',
        contact:'',
        aboutme:'',
        email:''
      };
    }
      componentDidMount()
      {     
        if(this.props.loginstatus)
        {
          this.setState({
            username:  this.props.loginstatus.loginstatus.name,
            contact:       this.props.loginstatus.loginstatus.phone,
            email:       this.props.loginstatus.loginstatus.email});

        }
        if(coursearray)
        {
          var coursearray = this.props.courseStore.result;
          var courseid = localStorage.getItem("courseid");
          let coursedetail = coursearray.filter(course => {
            return course._id === courseid });
          this.setState({course:coursedetail[0]});
        }
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

function mapStateToProps(state) {
  return { courseStore: state.courses,
    loginstatus: state.loginstatus, };
}

export default connect(mapStateToProps,{})(ViewPeopleInfo);


