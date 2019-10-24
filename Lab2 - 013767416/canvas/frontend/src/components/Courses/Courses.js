import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './courses.css';
import Button from 'react-bootstrap/Button';
import CreateCourse from './CreateCourse';
import { Table } from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import SearchCourses from './SearchCourses';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../Layout/MiniDrawer';
import LongMenu from '../Layout/LongMenu';
import cookie from 'react-cookies';
import { withStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router';
import { getCourses } from "../../actions";
import { connect } from 'react-redux';
import TablePaginationActions  from '../../TablePaginationActions';
import TablePagination from '@material-ui/core/TablePagination';
//import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
//import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const axios = require('axios');



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


class Course extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
      show:false,
      courses:[],
      role:localStorage.getItem("role"),
      page: 0,
      rowsPerPage: 5,
      };
  }
    componentDidMount()
    {
      this.props.getCourses();
    }

    handleChangePage = (event, page) => {
      this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
      this.setState({ page: 0, rowsPerPage: event.target.value });
    };


    componentWillReceiveProps(nextProps) {
      if (nextProps.courseStore.result) {
          this.setState({
            courses: nextProps.courseStore.result
          });
      }
    }
    handleShow = () => {
     this.setState({show:true})
    };
    handleClose= () => {
      this.setState({show:false})
     };
    handleChange(event)
    {
      const {name, value} = event.target;
      this.setState({ [name]: value });
    }
    addCourse = (course) =>{
      let coursesarray = [...this.state.courses, course];
      this.setState({ courses: coursesarray});
    }
    handleDelete(id){
      axios.defaults.withCredentials = true;
      const cid ={
        courseid : id
      }
      if(localStorage.getItem("role")==='Student')
      {
        axios.post('/dropcourse', cid ).then(
          res => {
            if(res.status ===200)
              {
                let course = this.state.courses.filter(course => {
                return course.courseid !== id });
                this.setState({courses:course});
                console.log(this.state.courses)
              }
          }
        )
      }
    }

  render() {
    const {  rowsPerPage, page } = this.state;
    const { classes } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.courses.length - page * rowsPerPage);

    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>

    const { show } = this.state;
    var colon =':';
    var tableData = Array.from(this.state.courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((course, key) => {    
      console.log(course._id) ;
      return ( 
        <tr key = {key}>         
            <td> <Link to={"/course/"+course._id}>{course.Term}{colon}{course.Name}</Link></td>
            <td>{course.Dept}{course.Nickname}</td>
            <td>{course.Term}</td>
            <td>{course.Published}</td>
           <td><LongMenu delete={() =>this.handleDelete(course._id)} edit={() =>this.handleEdit(course._id)}/></td>
        </tr>
      )
    })

  return (
      <Grid container>   {redirectVar}
        <Grid item xs={4.5}>
          <MiniDrawer/>
        </Grid>                    
        <Grid item xs={10}><br/>
          <div>
            <h4 style = {{marginLeft: 25} }> All Courses 
            </h4> 
            <Divider variant="middle" />
              <div className="btn-add"><Button variant="outline-primary"  onClick={this.handleShow}>Add Course</Button></div> 
            
                <div className={classes.tableWrapper}>
                  <Table className={classes.table} style={{marginLeft:20}}>
                    <TableBody>
                      {this.state.courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(course => (
                        <TableRow key={course._id}>
                          <TableCell component="th" scope="row">
                          <Link to={"/course/"+course._id}>{course.Term}{colon}{course.Name}</Link>
                          </TableCell>
                          <TableCell align="right">{course.Dept}{course.Nickname}</TableCell>
                          <TableCell align="right">{course.Term}</TableCell>
                          <TableCell align="right">{course.Published}</TableCell>
                          <TableCell align="right"><LongMenu delete={() =>this.handleDelete(course._id)} edit={() =>this.handleEdit(course._id)}/></TableCell>
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
                          count={this.state.courses.length}
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
           
            {this.state.role==='Teacher' && show && <CreateCourse  add={this.addCourse} close={this.handleClose}/> }
            {this.state.role==='Student' && show && <SearchCourses add={this.addCourse} handleShow={this.handleShow}/> }
          </div>
        </Grid>
      </Grid>


      
  );
  }
}

function mapStateToProps(state) {
  return { courseStore: state.courses };
}

//export default connect(mapStateToProps,{ getCourses })(Course);
export default connect(mapStateToProps,{ getCourses})( withStyles(styles)(Course));

/*



              <Table hover  style = {{marginLeft: 25} }>
              <thead>
              <tr>
              <th>Course Name</th>
              <th>NickName</th>
              <th>Term</th>
              <th>Published</th>
              <th></th>
              </tr>
              </thead>
              <tbody>
              {tableData}
              <tr><td></td><td></td><td></td><td></td><td></td></tr>
              </tbody>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={this.state.courses.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </Table>



              */