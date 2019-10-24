import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import './create.css';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Assignments from './Assignments';
import moment from 'moment';
const axios = require('axios');

class CreateAssignments extends Component 
{
  
  constructor(props)
  {
      super(props);
      this.state={
        aname :'',
        dueDate:'',
        points:'',
        editorHtml: '', 
        created : false
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handlePointsChange = this.handlePointsChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);

  }
  handleNameChange = (e) => {
    this.setState({
        aname : e.target.value
    })
  }
  handleEditorChange = (html) => {
    this.setState({
        editorHtml : html
    })
  }
  handlePointsChange = (e) => {
    this.setState({
        points : e.target.value
    })
  }
  handleDueDateChange = (date) => {
    this.setState({
        dueDate : date
    })
  }
  handleSubmit(event)
  {

    event.preventDefault();
    const assignmentdetails =
      {
      name : this.state.aname,
      dueDate:this.state.dueDate,
      points:this.state.points,
      html : this.state.editorHtml,
      courseid : this.props.courseid
      }
      this.props.toggle();
      axios.post('/assignment', assignmentdetails).
      then(res=>{
        console.log(res.status);
        if(res.status === 200)
        {
          console.log(res.data);
           this.setState ( 
             {  aname:'',
              dueDate:'',
              points:'',
              editorHtml: '',
              created:true
             } );           
        }
      });

  }

  render() {
    let redirectVar = null;
    if(this.state.created)
    {
      console.log(this.state.created);
      redirectVar = <Redirect to= "/assignment"/>
    }
    return (

        <div className="center-align container mt-5">{redirectVar}
      
          <form method="post" onSubmit={this.handleSubmit}>
            
              <div className="form-group">
               <input type="text" name="aname" placeholder="Assignment Name" required="required" value={this.state.aname} onChange={this.handleNameChange} />
              </div>
              <div>
              <ReactQuill  name="editorHtml"  value={this.state.editorHtml} onChange= {this.handleEditorChange}
              modules={CreateAssignments.modules} formats={CreateAssignments.formats} bounds={'.app'} placeholder={this.props.placeholder} style={{height:200, width: 900}}/>
              </div><br/><br/>
              <div className="form-group">
              <label>Points</label>&nbsp;&nbsp;&nbsp;
              <input type="text" name="points" placeholder="Points" required="required" value={this.state.points} onChange={this.handlePointsChange} />
              </div>
              <div className="form-group">
              <label>Due Date</label>&nbsp;&nbsp;&nbsp;
              <DatePicker name="dueDate" placeholder ="Due Date"  selected={this.state.dueDate} onChange={this.handleDueDateChange} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="MMMM d, yyyy h:mm aa" timeCaption="time"/>
              </div>
              <Button as="input" type="submit" value="Submit" /> &nbsp; &nbsp; &nbsp;
              <Button as="input" type="reset" value="Reset" />
            <div className="clearfix">
            </div>
            <br/>
        </form>
      </div>
    )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
CreateAssignments.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
CreateAssignments.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/* 
 * PropType validation
 */
CreateAssignments.propTypes = {
  placeholder: PropTypes.string,
}
export default CreateAssignments;
//     {this.state.success && <Assignments courseid = {this.props.courseid}/>}