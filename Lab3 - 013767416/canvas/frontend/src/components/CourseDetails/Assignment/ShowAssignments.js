import React, { Component } from 'react';
import './assignment.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AssignmentSubmission from './AssignmentSubmission';
import { Container, Row, Col } from 'reactstrap';
import { getAssignments } from "../../../actions";
import { deleteAssignment} from "../../../actions";
import { connect } from 'react-redux';
import LongMenu from '../../Layout/LongMenu';
import { graphql } from 'react-apollo';
import {withApollo} from 'react-apollo';
import {assignment} from '../.././../queries/queries';
const axios = require('axios');
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
});

class ShowAssignments extends Component 
{

  constructor(props)
  {
      super(props);
      this.state = {
        asgn : [],
        show:false,
        open :false,
        assignmentid :''
      }
  } 
  openAssignment = (id) => {
    this.setState({ open: true ,
    assignmentid:id});  
    this.props.toggle();
 };
 
  componentWillMount()
  { 
    //this.props.getAssignments();
    localStorage.setItem("Email" ,  "supriyajain5230@gmail.com")
    this.props.client.query({
        query : assignment,
        variables: {
            Courseid : localStorage.getItem("Courseid")
        },
    }
    ).then((response)=>{
        console.log('Response profile',  response.data.assignment);
      
        this.setState({
          asgn: response.data.assignment.assignments
        });
        });
  }
  componentWillReceiveProps(nextProps) {
  
    if (nextProps.assignments) {
      console.log( nextProps.assignments.assignments);
        this.setState({
            asgn: nextProps.assignments.assignments
        });
    }
    
  }
  handleDelete(id){
    axios.defaults.withCredentials = true;
    const aid ={
      assignmentid : id,
      courseid: localStorage.getItem("courseid")
    }
    this.props.deleteAssignment(aid);
    let assignment = this.state.asgn.filter(assignment => {
      return assignment._id !== id });
      this.setState({asgn:assignment});
    /*axios.post('/deleteAssignments', aid ).then(
      res => {
        if(res.status ===200)`
           {
            let assignment = this.state.asgn.filter(assignment => {
            return assignment.assignmentid !== id });
            this.setState({asgn:assignment});
            console.log(this.state.asgn)
           }
      }
    )*/
  }
  handleEdit(assignmentid){
    console.log('edit');
    console.log(assignmentid);
  }
  render() {
    //let redirectVar = null;
    const { classes } = this.props;
    var pipe = " | "

    if(this.state.open)
    return( 
          <div><AssignmentSubmission  courseid = {localStorage.getItem("courseid")} assignmentid = {this.state.assignmentid}/> </div>
    ) 

    var data = this.state.asgn.map((assgn, key) => {    
    return (   
    <Paper className={classes.root} elevation={0} key = {key} style={{ border: '1px ridge gray'}}>
    <Container>
    <Row>
    <Col sm='9'>      
    <Typography component="p"><b><a style={{color: "#094D98"}} onClick={() => this.openAssignment(assgn._id)}>{assgn.Name} </a></b></Typography>
    <Typography component="p">
    Due  <Moment format="ll" date={new Date(assgn.DueDate)}/> at  <Moment format="LT" date={new Date(assgn.DueDate)} /> {pipe} {assgn.Points} Points
    </Typography>
    </Col>
    <Col sm='2'>{ localStorage.getItem("role")==='Teacher' && <LongMenu  delete={() =>this.handleDelete(assgn._id)} edit={() =>this.handleEdit(assgn._id)}/>}</Col>
    </Row>
    </Container>
    </Paper>
    )  
    }) 
    
    return (
    <div className="center-align container mt-5">

    <div className ="item-group-container" data-view="assignmentGroups" id="ag-list"> 
    <div className ="collectionViewItems ig-list ui-sortable">
    {data}
    <br/>
    </div>
    </div>
    </div>
    )
  }
}
ShowAssignments.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { assignments: state.assignments };
}
    
//export default connect(mapStateToProps,{ getAssignments , deleteAssignment})(withStyles(styles)(ShowAssignments));


export default withApollo(withStyles(styles)(ShowAssignments));