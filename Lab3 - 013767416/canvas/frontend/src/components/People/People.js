import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
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
import { connect } from 'react-redux';
import TablePaginationActions  from '../../TablePaginationActions';
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


const axios = require('axios');
class People extends Component 
{
    constructor(props)
    {
      super(props);
      this.state = {
        people:[],
        course:[],
        course:'',
        page: 0,
        rowsPerPage: 5,
      };
    }
      componentWillMount()
      {
        
        axios.defaults.withCredentials = true;
        var courseid =  localStorage.getItem("courseid")
  
        axios.get('/users/people/',  {params : {id : courseid}} ).then(
          res => {
            if(res.status ===200)
                this.setState({people: res.data});
          }
        )        
        if(coursearray)
        {
          var coursearray = this.props.courseStore.result;
          var courseid = localStorage.getItem("courseid");
          let coursedetail = coursearray.filter(course => {
            return course._id === courseid });
          this.setState({course:coursedetail[0]});
        }
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
     handleChangePage = (event, page) => {
      this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
      this.setState({ page: 0, rowsPerPage: event.target.value });
    };

  render() {
    const {  rowsPerPage, page } = this.state;
    const { classes } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.people.length - page * rowsPerPage);
    var colon =':';
    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>
        return (

          <div>{redirectVar}
          <Appbar name={this.state.course.Name}  dept={this.state.course.Dept}  nickname={this.state.course.Nickname}  term={this.state.course.Term}
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
          <Table className={classes.table} style={{marginLeft:20}}>
                    <TableBody>
                      {this.state.people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                        <TableRow key={user._id}>
                          <TableCell component="th" scope="row">
                          <Link to={"/people/"+user._id}>{user.Name}</Link>
                          </TableCell>
                          <TableCell align="right">{user.Email}</TableCell>
                          <TableCell align="right">{user.Role}</TableCell>
                          <TableCell align="right">{this.state.course.Dept}{this.state.course.Nickname}</TableCell>
                          <TableCell align="right"><LongMenu delete={() =>this.handleDelete(user._id)} edit={() =>this.handleEdit(user._id)}/></TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          colSpan={3}
                          count={this.state.people.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            native: true,
                          }}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
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
function mapStateToProps(state) {
  return { courseStore: state.courses };
}

//export default connect(mapStateToProps,{ })(People);

export default connect(mapStateToProps,{})( withStyles(styles)(People));

