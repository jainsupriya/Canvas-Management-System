import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import { signupCheck } from "../../actions";
import {signup} from '../../mutations/mutations';
import { graphql } from 'react-apollo';
class SignUp extends Component 
{
  constructor(props)
  {
  super(props);
  this.state = {
    name:"",
    email: "",
    password: "",
    teacherCheck : "",
    studentCheck:"",
    success:false,
    errormessage:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event)
    {
      const {name, value} = event.target;
      this.setState({ [name]: value });
    }

    handleSubmit (event){
      event.preventDefault();
    
       this.props.signup({
           variables: {
               Name: this.state.name,
               Email: this.state.email,
               Password: this.state.password,
               TeacherCheck:this.state.teacherCheck,
               StudentCheck:this.state.studentCheck
           }
       }).then((response)=>{
           console.log('Resposne', response.data);
           if(response.data.signup.success == true){
               this.setState({
                   isNewUserCreated : true
               });
           }
           if(response.data.signup.duplicateUser ==true){
               this.setState({
                   isDuplicateUser : true
               });
           }
       });
   }



    componentWillReceiveProps(nextProps) {
      console.log("here")
      if (nextProps.signupdetails.signupdetails) 
      {
        if(nextProps.signupdetails.signupdetails.isNewUserCreated)
          { this.setState({
              isAuthenticated:true,
              success:true });
              this.props.history.push("/login");
          }
          else if(nextProps.signupdetails.signupdetails.errorRedirect) 
            this.setState({
              errormessage:"Validations Error"
            });
      }
        else if (nextProps.signupdetails.duplicateUser) 
        this.setState({
          errormessage:"User Already exists"
        });

      
    }
    

  render() {

  return (
      <div className="login-form">
        <center><h1>
        Connecting to<div className="applogin-app-logo">
        <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7" alt="SJSU&#x20;Single&#x20;Sign-on" className="logo sanjosestateuniversity_devshibbolethsp_1"/></div>
        </h1></center>
        <form method="post" onSubmit={this.handleSubmit} method="post">
          <h2 className="text-center">Sign Up</h2>
              <div className="form-group">
              <input type="text" name="name" className="form-control" placeholder="Name" required="required" value={this.state.name} onChange={this.handleChange} />
              </div>         
              <div className="form-group">
              <input type="text" name="email" className="form-control" placeholder="Email" required="required" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="form-group">
              <input type="password" name="password" className="form-control"placeholder="Password" required="required" value={this.state.password} onChange={this.handleChange} />
              </div>
              <label> I am a Teacher <input name="teacherCheck" type="checkbox" checked={this.state.teacherCheck}  onChange={this.handleChange}/></label> &nbsp;
              <label> I am a Student <input name="studentCheck" type="checkbox" checked={this.state.studentCheck}  onChange={this.handleChange}/></label>
              <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
              <span style={{color : "red"}}>{this.state.errormessage}</span><br/>
              </div>         
            <div className="clearfix">
            </div>
            <div className="form-group">
              <h6>Already have an account? <Link to="/login">Login</Link></h6>
              </div>          

        </form>
      </div>
  );
  }
}

/*const mapStateToProps = state => ({
  signupdetails: state.signupdetails,

});*/
//export default connect(mapStateToProps,{signupCheck})(SignUp);
export default graphql (signup, {name:"signup"})(SignUp);