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
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
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
        term:'',
        name:'',
        nickname:'',
        dept:''
      }
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
    axios.post('/generateQuiz', courseId).
      then(res=>{
        console.log(res.status);
        if(res.status === 201)
        {
            console.log(res.data.insertId)
            this.setState ( { quizId: res.data.insertId, createSuccess:'success',});
            console.log(this.state.quizId)
        }
      });
  };
  render() {
    const { classes } = this.props;
    const { show } = this.state.show;
    const { success } = this.state.createSuccess;
    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>
    //if(localStorage.getItem("role")==='Teacher')
    //{
      return (
          <div>{redirectVar}
            <Appbar name={this.state.name}  dept={this.state.dept}  nickname={this.state.nickname}  term={this.state.term}
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
                {this.state.show && this.state.createSuccess && <QuizTabs courseid = {localStorage.getItem("courseid")} quizid = {this.state.quizId}/>}
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
   // }
  /*  else{
      return (
        <div>
          <Appbar/> 
          <div className="border mt-5 search-container"> 
          <br/>
            <div >
              <Container>
              <Row>
              <Col><Search/></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              </Row>
              </Container>
              </div>
              <div >
               <ShowQuiz courseid = {this.props.courseid} role={this.state.role}/>
            </div>
          </div>
        </div>
        )     
    }*/
  }
}

Quiz.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Quiz);


