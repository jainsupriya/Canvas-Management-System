import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import FormData from 'form-data';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../../Layout/MiniDrawer';
import Sidebar from '../../Layout/Sidebar';
import Appbar from '../../Layout/Appbar';
import MenuList from '../../Layout/MenuList';
import { Container, Row, Col } from 'reactstrap';
import Search from '../../Search';
import Moment from 'react-moment';
import {Redirect} from 'react-router';
import LongMenu from '../../Layout/LongMenu';
import {pdfjs} from 'react-pdf';
import FileOpen from './FileOpen';
import { getFiles } from "../../../actions";
import { createFile } from "../../../actions";
import { connect } from 'react-redux';
//var fileDownload = require('js-file-download');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const axios = require('axios');

class Files extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = { selectedFile: null,
        fname : '' ,
        show:'',
        files : [],
        anchorEl: '',
        fileid:'',
        data :'',
        href:'',
        numPages: null,
        pageNumber: 1,
        file:'',
        course:'',
        course:[],
        fileToOpen:'',
        open:false,
     
      }
        //this.handleChange = this.handleChange.bind(this);
        this.handleclick = this.handleclick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClose=this.handleMenuClose.bind(this);
        this.handleOpenFile=this.handleOpenFile.bind(this);
        this.fileChangedHandler= this.fileChangedHandler.bind(this);
    }
    onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages });
    }
    fileChangedHandler = event => {
      console.log(event.target.files[0] );
      this.setState({ selectedFile: event.target.files[0] });
      const formData = new FormData();
      formData.append(
        'myFile',
        event.target.files[0],
        event.target.files[0].name,
      );
      formData.append('courseid', localStorage.getItem("courseid"));
      this.props.createFile(formData);

      //let filearray = [...this.state.files, {"Name": name , "createdAt": new Date(), "createdBy":localStorage.getItem("username"), "Size": size}];
      //this.setState({files : filearray});
    }
    handleclick(){
      this.setState(state => ({
        show: !state.show
      }));      
    }
    handleMenuClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
      this.setState({ anchorEl: null });
    };
    componentWillMount()
    { 
      var coursearray = this.props.courseStore.result;
      var courseid = localStorage.getItem("courseid");
      if(coursearray)
      {
        let coursedetail = coursearray.filter(course => {
          return course._id === courseid });
        this.setState({course:coursedetail[0]});
      }
      this.props.getFiles();
    }
  
    componentWillReceiveProps(nextProps) {
    
      if (nextProps.files) {
          this.setState({
            files: nextProps.files.files
          });
      }  
    } 
    handleDelete(id){
      const fid ={
        fileid : id
      }  
      axios.defaults.withCredentials = true;  
      axios.post('/deleteFile', fid ).then(
        res => {
          if(res.status ===200)
             {
              let file = this.state.files.filter(file => {
              return file.fileid !== id });
              this.setState({files:file});
              console.log(this.state.files)
             }
        }
      )
    }
    handleOpenFile = (fileid) => 
    {
      axios.defaults.withCredentials = true;
      let file = this.state.files.filter(file => {
        return file._id === fileid });
     var filename = file[0].Name;
     var type = file[0].Type;
      axios.get('/file/downloadfile',  {params : {name :filename, type: type}}).then(
        res => {
          if(res.status ===200)
            {
              console.log(res.data);
              let preview = 'data:application/pdf;base64, ' + res.data;
              this.setState({
                fileToOpen: preview,
                open:true})
            }
        }
      )   
   };


  render() 
  {
    let redirectVar = null;
    if(!this.props.loginstatus.loginstatus) 
      redirectVar = <Redirect to= "/login"/>
 
    var data =  Array.from(this.state.files).map((file, key) => {
    return (
      <tr key = {key} >                   
      <td ><a onClick={() =>this.handleOpenFile(file._id)} download>{file.Name}</a></td>
      <td> <Moment format="ll" date={new Date(file.CreatedAt)}/> </td>
      <td>{file.Size}</td>
      <td>{file.CreatedBy}</td>
      <td>{ localStorage.getItem("role")==='Teacher' && <LongMenu delete={() =>this.handleDelete(file._id)} edit={() =>this.handleEdit(file._id)}/>}</td>
      </tr>
    )
    });
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    if(this.state.fileToOpen)
    return (<FileOpen fileToOpen= {this.state.fileToOpen} name={this.state.name} dept={this.state.dept} nickname={this.state.nickname} term ={this.state.term}/>)
    else {
      return (
      <div>{redirectVar}
      <Appbar name={this.state.course.Name}  dept={this.state.course.Dept}  nickname={this.state.course.Nickname}  term={this.state.course.Term}
      tag="Files" />
      <Grid container>   
        <Grid item xs={0.5}>
          <MiniDrawer/>
        </Grid>  
        <Grid item xs={1.5}><br/>
          <MenuList />
        </Grid>                  
      <Grid item xs={8}>
      <div >
       <br/><br/><br/> <br/><br/>
        <Container>
        <Row>
        <Col><Search/></Col>
    <Col>{ localStorage.getItem("role")==='Teacher' && <input type="file" name="Upload" onChange={this.fileChangedHandler} />}</Col>
        <Col></Col>
        </Row>
        </Container>         
        </div>
      <div>
          <table  cellpadding="0" cellspacing="0" className="table"  cellSpacing="1" style= {{marginLeft:20 , paddingTop: 0 }}>
              <tr style={{color: "#094D98"}}>
              <th>File Name</th>
              <th>Date Created</th>
              <th>Size(KB)</th>
              <th>Created By</th>
              <th></th>
              </tr>
            <tbody>{data}</tbody>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            </table>   

          </div>
          </Grid>

          <Grid item xs={1}>
           <Sidebar/>
           </Grid>
      </Grid>

      </div>
    
      
      

    )
      }
  }
}
function mapStateToProps(state) {
  return { files: state.files ,
    courseStore: state.courses ,
    loginstatus: state.loginstatus};
}
      

export default connect(mapStateToProps,{ getFiles, createFile })(Files);
// 


