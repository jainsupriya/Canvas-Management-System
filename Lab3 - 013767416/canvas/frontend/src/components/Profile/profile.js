import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router';
import Grid from '@material-ui/core/Grid';
import MiniDrawer from '../Layout/MiniDrawer';
//import { getProfile } from "../../actions";
//import { updateProfile } from "../../actions";
import { connect } from 'react-redux';
import {graphql, compose} from 'react-apollo';
import {profile} from '../../queries/queries';
import {updateProfile} from '../../mutations/mutations';
import {withApollo} from 'react-apollo';
const axios = require('axios');




class Profile extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
        name: "",
        email: "",
        phone:"",
        aboutme:"",
        city:"",
        country:"",
        company:"",
        school:"",
        hometown:"",
        languages:"",
        submitsuccess:false,
        loggedout:false,
        profilechange:false,
        image_path:'',
        profilePicView:'',
        profilepic:''
       // male:"",
        //female:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handlePhotoChange= this.handlePhotoChange.bind(this);
  }
  handlePhotoChange() {
    this.setState({ profilechange: true });
  }
  componentDidMount(){
    //this.props.getProfile();
    localStorage.setItem("Email" ,  "supriyajain5230@gmail.com")
    this.props.client.query({
        query : profile,
        variables: {
            Email : localStorage.getItem("Email")
        },
    }
    ).then((response)=>{
        console.log('Response profile',  response.data.profile);
        const result = response.data.profile;
        var keyArray = Object.keys(response.data.profile);

        this.setState({
            name: response.data.profile.Name,
            email: response.data.profile.Email,
            phone: response.data.profile.Phone,
            aboutme:  response.data.profile.Aboutme,
            city: response.data.profile.City,    
            country: response.data.profile.Country,
            company:  response.data.profile.Company,
            school: response.data.profile.School,
            hometown: response.data.profile.Hometown,
            languages: response.data.profile.Languages,
        });
        console.log('state', this.state);
        });
  }
 
  handleChange(event)
  {
    const target = event.target;
    const name = target.name;
    if (name === "profilepic") {
        console.log(target.files);
        var profilePhoto = target.files[0];
        var data = new FormData();

        data.append('photos', profilePhoto);
        console.log(data)
        axios.defaults.withCredentials = true;
        axios.post('/users/upload-file', data)
            .then(res => {
                if (res.status === 200) {
                    console.log('Profile Photo Name: ', profilePhoto.name);

                    //Download image
                    axios.post('/users/download-file/' + profilePhoto.name)
                        .then(res => {
                            let preview = 'data:image/jpg;base64, ' + res.data;
                            this.setState({
                                profilepic: profilePhoto.name,
                                profilePicView: preview
                            })

                        }).catch((err) =>{
                            if(err){
                                this.setState({
                                    errorRedirect: true
                                })
                            }
                        });
                }
            });
    }
    else{
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }
  }

  handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.post('/users/logout')
        .then(response => {
            if (response.status === 200) {
                console.log('User logged out successfully!');
                this.setState ( {
                    loggedout:true,
                        });
            }
        });
}
  handleSubmit(event)
  {
    this.props.client.mutate({
        mutation: updateProfile,
        variables:{
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            PhoneNumber: this.state.PhoneNumber,
            Aboutme: this.state.Aboutme,
            Country: this.state.Country,
            City: this.state.City,
            Gender: this.state.Gender,
            School: this.state.School,
            Hometown: this.state.Hometown,
            Language: this.state.Language,
            Company: this.state.Company
        }

    });
  }

  render() {

      let profileImageData = <img src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
      if (this.state.profilePicView) {
          profileImageData = <img src={this.state.profilePicView} alt="logo" onClick={this.handlePhotoChange}/>
      }

  return (
    <div>
    <Grid container>   
    <Grid item xs={4.5}>
    <MiniDrawer/>
    </Grid>                    
    <Grid item xs={8}>
    <div style={{backgroundColor : "white"}}  className="container">
    <br/>
 

    <div className="container"> 
    <div className="center-content profile-heading"> {profileImageData} </div>
    <br/>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button  variant="primary" onClick={this.handleLogout} >Logout</Button>
    <form method="post" onSubmit={this.handleSubmit} >
        <div >
            <div>
                <h1>Profile Information</h1>
                    
                    <div className="form-group"  style={{width : 200}}>
                     <input value={this.state.name}  onChange = {this.handleChange} type="text" className="form-control" name="name" placeholder="Name" />
                      </div>
                    
                    <div className="form-group"  style={{width : 200}}>
                        <input value={this.state.email}  onChange = {this.handleChange} type="text" className="form-control"  name="email" placeholder="Email" />
                    </div>
                    <div className="form-group" style={{width : 200}}>
                        <input value={this.state.phone}  onChange = {this.handleChange} type="text" className="form-control"  name="phone" placeholder="Phone Number" />
                    </div>
                    <div>
                        <textarea value={this.state.aboutme}  onChange = {this.handleChange} rows="4" cols="40" className="form-group" placeholder="About Me">
                        </textarea>
                    </div>

                    <div className="form-group"  style={{width : 200}} >
                        <input value={this.state.city}  onChange = {this.handleChange} type="text" className="form-control" name="city" placeholder="city" required/>
                    </div>

                    <div className="form-group"  style={{width : 200}}>
                        <input value={this.state.country}  onChange = {this.handleChange} type="text" className="form-control" name="country" placeholder="Country" required/>
                    </div>

                    <div className="form-group"  style={{width : 200}}>
                        <input value={this.state.company}  onChange = {this.handleChange} type="text" className="form-control" name="company" placeholder="Company" required/>
                    </div>

                    <div className="form-group"  style={{width : 200}}>
                    <input value={this.state.school} onChange = {this.handleChange} type="text" className="form-control" name="school" placeholder="School" required/>
                    </div>

                    <div className="form-group"  style={{width : 200}}>
                    <input value={this.state.hometown}  onChange = {this.handleChange} type="text" className="form-control" name="hometown" placeholder="Hometown" required/>
                    </div>

                    <div className="form-group"  style={{width : 200}}>
                    <input value={this.state.languages}   onChange = {this.handleChange} type="text" className="form-control" name="languages" placeholder="Languages" required/>
                    </div>
                    <div class="row form-group" className="form-group"  style={{width : 200}} >
                        <div >
                            <select onChage={this.handlegender} value={this.state.gender} class="form-control input-lg js-input-field" id="profileGenderInput" data-input-model-name="gender">
                                    <option selected="selected">Gender</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="profilepic"><strong>Profile Image : </strong></label><br />
                    <input type="file" name="profilepic" id="profilepic" className="btn btn-lg photo-upload-btn" onChange={this.handleChange} className="btn btn-lg photo-upload-btn" />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>   
                
                   
            </div>
        </div>
        </form>
    </div>
    </div>
    </Grid>
    </Grid>
    </div>
  );
  }
}

function mapStateToProps(state) {
    return { profiledetails: state.profiledetails };
  }

//export default connect(mapStateToProps,{ getProfile, updateProfile })(Profile);
export default withApollo(Profile);



