import React, { Component } from 'react';
import QuizDetails from './QuizDetails';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import ReactQuill from 'react-quill'; // ES6
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ShowQuestions from './ShowQuestions';
const axios = require('axios');

class CreateQuestion extends Component {
    constructor(props)
    {
        super(props);
        this.state={
          op1 :'',
          op2:'',
          op3 :'',
          op4:'',
          correctop:'',
          editorHtml: '', 
          questions:[],

          };
          this.handleChange = this.handleChange.bind(this);
          this.handleEditorChange = this.handleEditorChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.updateQuiz = this.updateQuiz.bind(this);
  
    }
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }
    handleEditorChange = (html) => {
      this.setState({
          editorHtml : html
      })
    }
    handleSubmit(event)
    {
      console.log('hi');
      event.preventDefault();
      const questionsDetails ={
        op1 : this.state.op1,
        op2: this.state.op2,
        op3 : this.state.op3,
        op4: this.state.op4,
        correctop:this.state.correctop,
        content: this.state.editorHtml, 
        courseid : this.props.courseid,
        quizid :this.props.quizid
      }
      let tempquestions = [...this.state.questions, questionsDetails];
      console.log(tempquestions);
      this.setState({ questions: tempquestions,
        op1 :'',
        op2:'',
        op3 :'',
        op4:'',
        correctop:'',
        editorHtml: '', });  
    }
    updateQuiz(event)
    {
      event.preventDefault();
      console.log(this.state.questions);
      axios.defaults.withCredentials = true;
      var quizdetails={
        quizquestions:this.state.questions,
        quizid: this.props.quizid
      }
      axios.post('/quiz/saveQuizQues', quizdetails).
        then(res=>{
          console.log(res.status);
          if(res.status === 201)
          {
              this.setState ( { quizId: res.data, createSuccess:'success',});
          }
        });
    }
    render()
    {

        return(
            <div className="border mt-5 search-container">
            <ShowQuestions  quizid = {this.props.quizid} questions={this.state.questions}/>
            <form method="post"> 
              <div>
              <br/>
              <ReactQuill  name="editorHtml"  value={this.state.editorHtml} onChange= {this.handleEditorChange}
              modules={QuizDetails.modules} formats={QuizDetails.formats} bounds={'.app'} placeholder={this.props.placeholder} style={{height:200, width: 900}}/>
              </div><br/><br/><br/>
              <div className="form-group">
              <label>Option 1 </label>&nbsp;&nbsp;&nbsp;
              <input type="text" name="op1" placeholder="Answer Text" required="required" value={this.state.op1} onChange={this.handleChange} />
              </div>
              <div className="form-group">
              <label>Option 2 </label>&nbsp;&nbsp;&nbsp;
              <input type="text" name="op2" placeholder="Answer Text" required="required" value={this.state.op2} onChange={this.handleChange} />
              </div>
              <div className="form-group">
              <label>Option 3 </label>&nbsp;&nbsp;&nbsp;
              <input type="text" name="op3" placeholder="Answer Text" required="required" value={this.state.op3} onChange={this.handleChange} />
              </div>
              <div className="form-group">
              <label>Option 4 </label>&nbsp;&nbsp;&nbsp;
              <input type="text" name="op4" placeholder="Answer Text" required="required" value={this.state.op4} onChange={this.handleChange} />
              </div>
              <div className="form-group">
              <label>Correct Answer </label>&nbsp;&nbsp;&nbsp;
              <input type="text" name="correctop" placeholder="Answer Text" required="required" value={this.state.correctop} onChange={this.handleChange} />
              </div>
              <ButtonToolbar>
              &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;<Button variant="primary" onClick={this.handleSubmit} >Update Question</Button>
                <Button variant="primary" onClick={this.updateQuiz} >Save Quiz</Button>
                <Button variant="secondary">Close</Button>      
              </ButtonToolbar><br/>
              </form>
            </div>
        )
    }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
CreateQuestion.modules = {
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
  CreateQuestion.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
  
  /* 
   * PropType validation
   */
  CreateQuestion.propTypes = {
    placeholder: PropTypes.string,
  }
export default CreateQuestion;




