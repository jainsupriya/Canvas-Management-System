

import React,{Component} from 'react'
import {pdfjs} from 'react-pdf';
import Moment from 'react-moment';
import OpenSubmissionFile from './OpenSubmisseionFile';
import { getSubmissions} from "../../../actions";
import { connect } from 'react-redux';
const axios = require('axios');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class GradeAssignment extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            studentdata:[],
            fileToOpen:'',
            open:false,
            studentid:'',
        }
    }
    closeFile = () => 
    {
      this.setState({fileToOpen : ''});
    };
    componentDidMount()
    {   
      this.props.getSubmissions(this.props.assignmentid );
    }
    componentWillReceiveProps(nextProps) {
  
      if (nextProps.submissions) {
        console.log( nextProps.submissions.submissions);
          this.setState({
            studentdata: nextProps.submissions.submissions
          });
      }
      
    }
    handleOpenFile = (submissionid, userId) => 
    {
      let submission = this.state.studentdata.filter(submission => {
        return submission.Userid === userId });
      console.log(submission)
      axios.defaults.withCredentials = true;
      axios.get('/submission/download',  {params : {filename :submission[0].Filename}}).then(
        res => {
          if(res.status ===200)
            {
              console.log(res.data);
              let preview = 'data:application/pdf;base64, ' + res.data;
              this.setState({
                fileToOpen: preview})
              this.setState({open:true,userid:userId})
            }
        }
      )   
   };
    render()
    {

        var data =  Array.from(this.state.studentdata).map((data, key) => {
            return (
              <tr key = {key} >                              
              <td >{data.Username}</td>
              <td><a onClick={() =>this.handleOpenFile(data._id, data.Userid)} download>{data.Filename}</a></td>
              <td> <Moment format="lll" date={new Date(data.Submissiontime)}/> </td>          
              <td >{data.Graded}</td>
              </tr>
            )
            });

        if(this.state.fileToOpen)
           return (<OpenSubmissionFile  assignmentid={this.props.assignmentid} closeFile={this.closeFile} fileToOpen= {this.state.fileToOpen} points={this.props.points} userid={this.state.userid}/>)
        else {           
        return(
        <div>
             <table  cellpadding="0" cellspacing="0" className="table"  cellSpacing="0" style= {{marginLeft:20 , paddingTop: 0 , maxWidth:800}}>
              <tr style={{color: "#094D98"}}>
              <th>Student Name</th>
              <th>Submission</th>
              <th>Submission Time</th>
              <th>Graded</th>
              </tr>
            <tbody>{data}</tbody>
            <tr><td></td><td></td><td></td><td></td></tr>
            </table>   
           
        </div>

        )
        }
    }
};

function mapStateToProps(state) {
  return { submissions: state.submissions };
}
      
export default connect(mapStateToProps,{ getSubmissions })(GradeAssignment);