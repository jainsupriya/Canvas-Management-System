import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import Button from 'react-bootstrap/Button'
import CreateAssignments from './CreateAssignments';
import ShowAssignments from './ShowAssignments';
import Search from '../../Search';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../../Layout/MiniDrawer';
import Appbar from '../../Layout/Appbar';
import MenuList from '../../Layout/MenuList';
import { Container, Row, Col } from 'reactstrap';
import Add from "@material-ui/icons/Add";
import {Redirect} from 'react-router';
import { connect } from 'react-redux';

class Assignments extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
    show: false,
    course:'',
    course:[]
    };
  }
  toggleTrue = () => 
  {
    this.setState({show : true});
  };
  toggleFalse = () => 
  {
    this.setState({show : false});
  };
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
    const { show } = this.state;
    let redirectVar = null;
    if(!this.props.loginstatus.loginstatus) 
      redirectVar = <Redirect to= "/login"/>
 
      return (
          <div>{redirectVar}
        <Appbar name={this.state.course.Name}  dept={this.state.course.Dept}  nickname={this.state.course.Nickname}  term={this.state.course.Term}
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
              <Col> {!show && localStorage.getItem("role")==='Teacher' &&<Button variant="primary"  onClick={this.toggleTrue}>   <Add style={{ fill: '#EFF1F2' }}/>Assignment</Button>}</Col>
              </Row>
              </Container>       
            </div>
            <div className="border mt-5 search-container"  style= {{marginLeft:20}}> 
              <div >
                {show && <CreateAssignments  toggle={this.toggleFalse} courseid = {localStorage.getItem("courseid")} />}
                {!show && <ShowAssignments toggle={this.toggleFalse} courseid = {localStorage.getItem("courseid")}/>}
              </div>
            </div>
          </div>
          </Grid>

         </Grid>
       </div>
      );
  }
}

function mapStateToProps(state) {
  return { courseStore: state.courses ,
    loginstatus: state.loginstatus,};
}

export default connect(mapStateToProps,{ })(Assignments);


