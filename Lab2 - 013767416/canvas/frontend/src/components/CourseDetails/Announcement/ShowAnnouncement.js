import React, { Component } from 'react';
import Parser from 'html-react-parser';
import './showannouncement.css';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import LongMenu from '../../Layout/LongMenu';
import { Container, Row, Col } from 'reactstrap';
import ViewAnnouncement from './ViewAnnouncement';
import Avatar from '@material-ui/core/Avatar';
import {avtar} from './avtar.png'
import { getAnnouncements } from "../../../actions";
import { connect } from 'react-redux';

const axios = require('axios');

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
  avatar: {
    margin: 10,
  },
});
class ShowAnnouncement extends Component 
{
  constructor(props)
  {
      super(props);
      this.state = {
        announcement : [],
        open :false,
        announcementid:''
      }
      this.openAnnouncement = this.openAnnouncement.bind(this);    
  }
  handleDelete(announcementid){
    console.log(announcementid);
  }
  handleEdit(announcementid){
    console.log(announcementid);
  }
  handleDelete(id){
    axios.defaults.withCredentials = true;
    const aid ={
      announcementid : id
    }
    axios.post('/deleteAnnouncement', aid ).then(
      res => {
        if(res.status ===200)
           {
            let tempann = this.state.announcement.filter(announcement => {
            return announcement.announcementid !== id });
            this.setState({announcement:tempann});
           }
      }
    )
  }
  componentWillMount()
  { 
    this.props.getAnnouncements();
  }

  componentWillReceiveProps(nextProps) {
  
    if (nextProps.announcements) {
      console.log( nextProps.announcements.announcements);
        this.setState({
          announcement: nextProps.announcements.announcements
        });
    }  
  }
  openAnnouncement = (id) => {
    this.setState({ open: true ,announcementid:id});  
  };
  render() {
    const { classes } = this.props;
    var pipe = " | "

    var data = this.state.announcement.map((ann, key) => {         
      return (       
      <Paper className={classes.root} elevation={0} key = {key} style={{ border: '1px solid gray'}} >
      <Container>
      <Row>
      <Col sm='1'> <Avatar src={avtar} className={classes.avatar} />  </Col>
      <Col sm='9'>     
      <Typography variant="subtitle1" component="p"><b><a  style={{color: "#094D98"}} onClick={() => this.openAnnouncement(ann._id)}>{ann.Title} </a></b></Typography>
      <Typography variant="subtitle2"
      style ={{ width: 500 , overflow: "hidden", overflowWrap: "ellipsis" , whiteSpace : "nowrap"}}>{Parser(ann.Content)}</Typography>
      <Typography component="p">
      Posted on <Moment format="ll" date={new Date(ann.createdAt)}/> at  <Moment format="LT" date={new Date(ann.createdAt)} />
      </Typography>        
      </Col>
      <Col sm='2'>{localStorage.getItem("role")==='Teacher' && <LongMenu delete={() =>this.handleDelete(ann._id)} edit={() =>this.handleEdit(ann._id)}/>}</Col>
      </Row>
      </Container> 
      </Paper>
      )  
    }) 
      if(this.state.open)
      return( 
        <div><ViewAnnouncement courseid = {this.props.courseid} announcementid = {this.state.announcementid}/> </div>
      )
      else{
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
}
ShowAnnouncement.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return { announcements: state.announcements };
}
      
export default connect(mapStateToProps,{ getAnnouncements })(withStyles(styles)(ShowAnnouncement));