import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import FormData from 'form-data';
import { FaTrash } from "react-icons/fa";
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../../Layout/MiniDrawer';
import Sidebar from '../../Layout/Sidebar';
import Appbar from '../../Layout/Appbar';
import MenuList from '../../Layout/MenuList';
import { Container, Row, Col } from 'reactstrap';
import Search from '../../Search';
import Moment from 'react-moment';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import LongMenu from '../../Layout/LongMenu';
import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';
import sample from '../../pdf-sample.pdf';
import FileOpen from './FileOpen';
//var fileDownload = require('js-file-download');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const axios = require('axios');
const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];
const ITEM_HEIGHT = 48;

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
        term:'',
        name:'',
        nickname:'',
        dept:'',
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
      var name = event.target.files[0].name;
      var size = event.target.files[0].size;
      const formData = new FormData();
      formData.append(
        'myFile',
        event.target.files[0],
        event.target.files[0].name,
      );
      formData.append('courseid', localStorage.getItem("courseid"));
      axios.post('/upload', formData).
      then(res=>{
        console.log(res.status);
        if(res.status === 200)
          {
            let filearray = [...this.state.files, {"name": name , "createdAt": new Date(), "createdBy":localStorage.getItem("username"), "size": size}];
            this.setState({files : filearray});
          }
      });
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
      console.log(fileid)
      axios.get('/downloadfile',  {params : {id :fileid}}).then(
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
    componentDidMount()
    {
      axios.defaults.withCredentials = true;
      axios.get('/files', {params : {id :localStorage.getItem("courseid")}} ).then(
        res => {
          if(res.status ===200)
              this.setState({files: res.data});
        }
      )
      axios.get('/coursedetails', {params : {id :localStorage.getItem("courseid")}}  ).then(
        res => {
          if(res.status ===200)
          {
              this.setState(
                {
                  name:res.data.name,
                  term:res.data.term,
                  nickname:res.data.nickname,
                  dept:res.data.dept
                });     
          }    
        }
      )
    }

  render() {
    let redirectVar = null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>
 

    const { pageNumber, numPages } = this.state;
    var data =  Array.from(this.state.files).map((file, key) => {
    return (
      <tr key = {key} >                   
      <td ><a onClick={() =>this.handleOpenFile(file.fileid)} download>{file.name}</a></td>
      <td> <Moment format="ll" date={new Date(file.createdAt)}/> </td>
      <td>{file.size}</td>
      <td>{file.createdBy}</td>
    <td>{ localStorage.getItem("role")==='Teacher' && <LongMenu delete={() =>this.handleDelete(file.fileid)} edit={() =>this.handleEdit(file.fileid)}/>}</td>
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
      <Appbar name={this.state.name}  dept={this.state.dept}  nickname={this.state.nickname}  term={this.state.term}
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
 
export default Files;

// 

