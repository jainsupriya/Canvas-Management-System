

import React,{Component} from 'react'
import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../../Layout/MiniDrawer';
import Sidebar from '../../Layout/Sidebar';
import Appbar from '../../Layout/Appbar';
import MenuList from '../../Layout/MenuList';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class FileOpen extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            numPages: null,
            pageNumber: 1,
        }
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      }
    render()
    {
        const { pageNumber, numPages } = this.state;
        return(

        <div>
        <Appbar name={this.props.name}  dept={this.props.dept}  nickname={this.props.nickname}  term={this.props.term}
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
            <br/><br/>
        <Document
        file= {this.props.fileToOpen}  onLoadSuccess={this.onDocumentLoadSuccess} >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        </div>

         </Grid>
    
         <Grid item xs={1}>
        <Sidebar/>
        </Grid>
        </Grid>
    
        </div>

        )
    }
};

export default FileOpen;