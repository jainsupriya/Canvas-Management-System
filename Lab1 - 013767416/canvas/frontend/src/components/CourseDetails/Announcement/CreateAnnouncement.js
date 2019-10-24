import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
const axios = require('axios');

class CreateAnnouncement extends Component 
{
  
  constructor(props)
  {
      super(props);
      this.state={
        topic :'',
        editorHtml: '', 
        success : ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  handleNameChange = (e) => {
    this.setState({
        topic : e.target.value
    })
  }
  handleEditorChange = (html) => {
    this.setState({
        editorHtml : html
    })
  }
  handleSubmit(event)
  {

    this.props.toggle();
    event.preventDefault();
    const announcementDetail =
      {
      topic : this.state.topic,
      html : this.state.editorHtml,
      courseid : this.props.courseid
      }
      console.log(this.state.editorHtml);
      axios.post('/announcement', announcementDetail).
        then(res=>{
          console.log(res.status);
          if(res.status === 200)
          {
            console.log(res.data);
            this.setState ( 
              {  topic:'',
                editorHtml: '',
                success:res.status
              } );
          }
        });
  }

  render() {
    let redirectVar= null;

    return (
      
        <div style={{marginTop:20}}>{redirectVar}
           <form method="post" onSubmit={this.handleSubmit}  style={{marginLeft:30}}>
              <div className="form-group">
              <input type="text" className="form-control" name="topic" placeholder="Topic Title" required="required" value={this.state.topic} onChange={this.handleNameChange} style={{maxWidth:900}}/>
              </div>
              <div>
              <ReactQuill  name="editorHtml"  value={this.state.editorHtml} onChange= {this.handleEditorChange} style={{height:200, width: 900}}
              modules={CreateAnnouncement.modules} formats={CreateAnnouncement.formats} bounds={'.app'} placeholder={this.props.placeholder} />
              </div><br/><br/><br/><br/>
              Attachement: <input type="file"/><br/><br/><br/>
              <Button as="input" type="submit" value="Submit" /> &nbsp; &nbsp; &nbsp;
              <Button as="input" type="reset" value="Reset" /><br/><br/>
              
            <div className="clearfix">
            </div>
        </form>     
      </div>
    )
  }
}
/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
CreateAnnouncement.modules = {
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
CreateAnnouncement.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/* 
 * PropType validation
 */
CreateAnnouncement.propTypes = {
  placeholder: PropTypes.string,
}
export default CreateAnnouncement;
//     {this.state.success && <Assignments courseid = {this.props.courseid}/>}