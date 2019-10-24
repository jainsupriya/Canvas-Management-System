import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CreateQuiz from './CreateQuiz';
import QuizTabs from './QuizTabs';
const axios = require('axios');

class QuizDetails extends Component 
{
  
  constructor(props)
  {
      super(props);
      this.state={
        aname :'',
        dueDate:new Date(),
        points:'',
        editorHtml: '', 
        noofquestions:'',
        success : ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handlePointsChange = this.handlePointsChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleNoOfQuestionChange = this.handleNoOfQuestionChange.bind(this);

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
  handleNoOfQuestionChange = (e) => {
    this.setState({
        noofquestions : e.target.value
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
      courseid :localStorage.getItem("courseid"),
      noofquestions : this.state.noofquestions,
      }
      console.log(this.state.editorHtml);
    axios.post('/quiz', assignmentdetails).
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
              success:res.status
             } );
        }
      });

  }

  render() {
   
    return (
      
        <div className="center-align container mt-5">
      
          <form method="post" onSubmit={this.handleSubmit}>
              <div className="form-group">
               <input type="text"  className="form-control"  name="aname" placeholder="Quiz Name" required="required" value={this.state.aname} onChange={this.handleNameChange} />
              </div>
              <div>
              <ReactQuill  name="editorHtml"  value={this.state.editorHtml} onChange= {this.handleEditorChange}
              modules={QuizDetails.modules} formats={QuizDetails.formats} bounds={'.app'} placeholder={this.props.placeholder} style={{height:200, width: 900}}/>
              </div><br/><br/>
              <div className="form-group">
              <label>Marks</label>&nbsp;&nbsp;&nbsp;
              <input  className="form-control"  type="text" name="points" placeholder="Marks" required="required" value={this.state.points} onChange={this.handlePointsChange} />
              </div>
              <div className="form-group">
              <label> No of Questions</label>&nbsp;&nbsp;&nbsp;
               <input  className="form-control"  type="text" name="noofquestions" placeholder="No of Questions" required="required" value={this.state.noofquestions} onChange={this.handleNoOfQuestionChange} />
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
QuizDetails.modules = {
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
QuizDetails.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/* 
 * PropType validation
 */
QuizDetails.propTypes = {
  placeholder: PropTypes.string,
}
export default QuizDetails;
//     {this.state.success && <Assignments courseid = {this.props.courseid}/>}