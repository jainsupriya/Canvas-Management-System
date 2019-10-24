import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../../Layout/MiniDrawer';
import Sidebar from '../../Layout/Sidebar';
import Appbar from '../../Layout/Appbar';
import MenuList from '../../Layout/MenuList';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
class CourseHome extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
    term:'',
    name:'',
    nickname:'',
    dept:'',
    course:[],
    };
  }
  componentDidMount = () => {
    var coursearray = this.props.courseStore.result;
    var courseid = localStorage.getItem("courseid");
    if(coursearray)
    {
      let coursedetail = coursearray.filter(course => {
        return course._id === courseid });
      this.setState({course:coursedetail[0]});
    }
  }
  render() {
    let redirectVar = null;
    if(!this.props.loginstatus.loginstatus) 
      redirectVar = <Redirect to= "/login"/>
    localStorage.setItem("courseid", this.props.match.params.id);
    return (
      <div>{redirectVar}
        <Appbar name={this.state.course.Name}  dept={this.state.course.Dept}  nickname={this.state.course.Nickname}  term={this.state.course.Term} tag="Home" />
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

function mapStateToProps(state) {
  return { 
    courseStore: state.courses ,
    loginstatus: state.loginstatus};
}
export default connect(mapStateToProps, null)(CourseHome);


