import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


const axios = require('axios');

class ChangeDP extends Component 
{

  constructor(props)
  {
      super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            show:true,
            };
            //this.handleShow = this.handleShow.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.handleSave = this.handleSave.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
}
  handleSave(event) {
    event.preventDefault();
    console.log('handle uploading-', this.state.file);
   /* const courseDetails ={
      };
      axios.defaults.withCredentials = true;
      axios.post('/addcourse', courseDetails).then(res=>
      {
        this.state = {
            show:false,
            };
      });*/
      const formData = new FormData();
      formData.append('file', this.state.file);

      axios.post('/users/uploadDP', formData).
      then(res=>{
        console.log(res.status);
        if(res.status === 200)
            console.log(res.status);
          this.setState({show:false});
      });

  }
  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
    <div>
       <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Start a new Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form method="post" onSubmit={this.handleSave}>
          <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
        </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary"   onClick={this.handleSave}>
              Upload Photo
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
    )
  }
}

export default ChangeDP;
