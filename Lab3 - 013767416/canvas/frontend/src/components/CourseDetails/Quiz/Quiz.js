import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Search from '../../Search';
import Button from 'react-bootstrap/Button'
import ShowQuiz from './ShowQuiz';
import QuizTabs from './QuizTabs';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../../Layout/MiniDrawer';
import Sidebar from '../../Layout/Sidebar';
import Appbar from '../../Layout/Appbar';
import MenuList from '../../Layout/MenuList';
import { Container, Row, Col } from 'reactstrap';
import Add from "@material-ui/icons/Add";
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
const axios = require('axios');
const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: '1000px',
      backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },
      dense: {
        marginTop: 16,
      },
      menu: {
        width: 200,
      },
  });

class Quiz extends Component 
{
  constructor(props)
  {
      super(props);
      this.state = {
        quizDetail : [],
        show: false,
        quizId :'',
        createSuccess:'',
        role:'',
        course:'',
        course:[],
      }
  }
  componentDidMount()
  { 
    var coursearray = this.props.courseStore.result;
    if(coursearray)
    {
      var courseid = localStorage.getItem("courseid");
      let coursedetail = coursearray.filter(course => {
        return course._id === courseid });
      this.setState({course:coursedetail[0]});
    }
  }
  toggleComponent = (event) => 
  {
    this.setState(state => ({
      show: !state.show
    }));
    event.preventDefault();
    const courseId ={
      courseid : localStorage.getItem("courseid")
    }
    
    axios.defaults.withCredentials = true;
    axios.post('/quiz/', courseId)
      .then(res=>{
        console.log(res.status);
        if(res.status === 201)
        {
            this.setState ( { quizId: res.data, createSuccess:'success',});
        }
      });
  };
  render() {
    const { show } = this.state.show;
    let redirectVar = null;
    if(!this.props.loginstatus.loginstatus) 
      redirectVar = <Redirect to= "/login"/>
      return (
          <div>{redirectVar}
            <Appbar name={this.state.course.Name}  dept={this.state.course.Dept}  nickname={this.state.course.Nickname}  term={this.state.course.Term}
            tag="Quiz" />
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
              <Col>  {!show &&<Search/>}</Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col> {!show && localStorage.getItem("role")==='Teacher' && <Button variant="primary"  onClick={this.toggleComponent}>   <Add style={{ fill: '#EFF1F2' }}/>Quiz</Button>}</Col>
              </Row>
              </Container>       
            </div>
            <div className="border mt-5 search-container"  style= {{marginLeft:20}}> 
              <div >
                {this.state.show && <QuizTabs courseid = {localStorage.getItem("courseid")} quizid = {this.state.quizId}/>}
                {!this.state.show && <ShowQuiz courseid = {localStorage.getItem("courseid")}/>}
              </div>
            </div>
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

Quiz.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

  function mapStateToProps(state) {
    return { 
      courseStore: state.courses ,
      loginstatus: state.loginstatus};
  }
        
  export default connect(mapStateToProps,{ })( withStyles(styles)(Quiz));
  // 
  
  
  

