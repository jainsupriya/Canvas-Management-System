

import React,{Component} from 'react'
import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';
import { Container, Row, Col } from 'reactstrap';
import Button from 'react-bootstrap/Button'
const axios = require('axios');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class OpenSubmissionFile extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            numPages: null,
            pageNumber: 1,
            marks:''
        }
        this.handleChange= this.handleChange.bind(this);
        this.submitMarks=this.submitMarks.bind(this)
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    submitMarks() {
       console.log(this.props.userid);
       console.log(this.state.marks);
       const gradeDetails ={
        assignmentid : this.props.assignmentid,
        studentid : this.props.userid,
        points:this.state.marks, 
       }
       this.props.closeFile();
      axios.defaults.withCredentials = true;
       axios.post('/submission/gradeSubmission',  gradeDetails).
         then(res=>{
           console.log(res.status);
           if(res.status === 200)
           {
              console.log(res.data)
           }
         });
      }
    handleChange(event)
    {
      const {name, value} = event.target;
      this.setState({ [name]: value });
    }
    render()
    {
        const { pageNumber, numPages } = this.state;
        return(
        <div > 
        <br/><br/> 
        <Container>
        <Row>
        <Col>Out Of {this.props.points}
             <input type="text" name="marks" value={this.state.marks} onChange={this.handleChange} className="form-control form-control-lg" 
                  style={{height:30 , width:60}} /></Col> 
        <Col><Button  variant="primary"  onClick ={this.submitMarks}>Submit</Button> </Col> 
        <Col></Col>
        </Row>
        </Container>


        <Document
        file= {this.props.fileToOpen}  onLoadSuccess={this.onDocumentLoadSuccess} >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
    
        </div>

        )
    }
};

export default OpenSubmissionFile;