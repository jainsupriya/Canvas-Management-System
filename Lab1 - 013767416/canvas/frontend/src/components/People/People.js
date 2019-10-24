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
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
const axios = require('axios');
class People extends Component 
{
    constructor(props)
    {
      super(props);
      this.state = {
        show: false,
        count: 0,
        people:[],
        sid:'',
        file:'',
        term:'',
        name:'',
        nickname:'',
        dept:''
      };
    }
      componentWillMount()
      {
        
        axios.defaults.withCredentials = true;
        const id ={
            courseid : localStorage.getItem("courseid")
            }        
        axios.post('/people', id).then(
          res => {
            if(res.status ===200)
                this.setState({people: res.data});
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
      removeStudent = (id) => {
        axios.defaults.withCredentials = true;
        const data ={
            courseid : localStorage.getItem("courseid"),
            studentid :id
            }        
        axios.post('/dropcourse', data).then(
          res => {
            if(res.status ===200)
            {
                let student = this.state.people.filter(student => {
                return student.userid !== id });
                this.setState({ people:student});
            }
          }
        )

     };
  render() {
    const { show } = this.state;
    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>

          var data =  Array.from(this.state.people).map((user, key) => {
            console.log(user.userid)
            return (
              <tr key = {key} >                   
              <td > <Link to={"/people/"+user.userid}>{user.name}</Link></td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{this.state.dept}{this.state.nickname}</td>
            <td>{localStorage.getItem("role")==='Teacher' && <LongMenu delete={() =>this.removeStudent(user.userid)} edit={() =>this.handleEdit(user.userid)}/>} </td>
              </tr>
            )
        });
        return (

          <div>{redirectVar}
          <Appbar name={this.state.name}  dept={this.state.dept}  nickname={this.state.nickname}  term={this.state.term}
          tag="People" />
          <Grid container>   
            <Grid item xs={0.5}>
              <MiniDrawer/>
            </Grid>  
            <Grid item xs={1.5}><br/>
              <MenuList />
            </Grid>                  
          <Grid item xs={8}>
          <div >
           <br/><br/><br/><br/>
            <Container>
            <Row>
            <Col><Search/></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            </Row>
            </Container>         
            </div>
          <div>
               <Table size="sm"  style= {{marginLeft:20}}>
                <thead>
                    <tr>
                    <th scope="row">Name</th>
                    <th scope="row">Login Id</th>
                    <th scope="row">Enrolled As</th>
                    <th scope="row">Section</th>
                    <th scope="row"></th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                    <tr><td></td><td></td><td></td><td></td><td></td></tr>
                </tbody>
                </Table>     
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

export default People;
