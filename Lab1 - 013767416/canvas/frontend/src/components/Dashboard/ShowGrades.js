import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import 'antd/dist/antd.css';
import './t.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../Layout/MiniDrawer';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Typography } from '@material-ui/core';
import { Table } from 'reactstrap';
const axios = require('axios');
class ShowGrades extends Component 
{
  constructor(props)
  {
      super(props);
      this.state={
          grades:[]
        }

  }
  componentDidMount(){
    axios.defaults.withCredentials = true;
    axios.get('/totalgrades').then(
        res => {
            if(res.status ===200)
              {  this.setState({grades: res.data.grades});
        }
        }
    )
  }

  render() {
 
    const { classes } = this.props;
    let redirectVar= null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>

        var data =  Array.from(this.state.grades).map((course, key) => {
        return (
        <tr key = {key} >                   
        <td > <Link to={"/course/"+course.courseid} style={{color: "#094D98"}}> {course.term}: {course.dept}-{course.nickname}-{course.name}</Link></td>
        <td>{course.grades>0? course.grades : "No Grades"}</td>
        </tr>
        )
        });
      return (
        <Grid container> {redirectVar}  
        <Grid item xs={4.5}>
        <MiniDrawer/>
        </Grid>                    
        <Grid item xs={9}>
        &nbsp; &nbsp; &nbsp;<Typography variant="headline" style={{marginLeft:30}}>Courses I'm Taking</Typography>
        <Table size="sm" style={{marginLeft:30, maxWidth:500}}>
        <tbody>
        {data}
        <tr><td></td><td></td></tr>
        </tbody>
      </Table>
        </Grid>

      </Grid>        
      )
    
  }
}
const styles = theme => ({
 
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

ShowGrades.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowGrades);
