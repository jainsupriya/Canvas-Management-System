

import React,{Component} from 'react'
import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';

import Moment from 'react-moment';
import FileOpen from '../Files/FileOpen';
import OpenSubmissionFile from './OpenSubmisseionFile';

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
    axios.defaults.withCredentials = true;
    axios.get('/studentsubmissions', {params : {id : this.props.assignmentid}} ).then(
        res => {
        if(res.status === 200)
        {
            this.setState({
                studentdata:res.data
            });
            console.log(res.data);
            console.log(this.state.studentdata);
        }
        }
    )
    }
    
    handleOpenFile = (submissionid, userId) => 
    {
      axios.defaults.withCredentials = true;
      axios.get('/downloadsubmission',  {params : {id :submissionid}}).then(
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
        const { pageNumber, numPages } = this.state;
        var data =  Array.from(this.state.studentdata).map((data, key) => {
            return (
              <tr key = {key} >                              
              <td >{data.name}</td>
              <td><a onClick={() =>this.handleOpenFile(data.submissionid, data.userid)} download>{data.filename}</a></td>
              <td> <Moment format="lll" date={new Date(data.submissiontime)}/> </td>          
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

export default GradeAssignment;