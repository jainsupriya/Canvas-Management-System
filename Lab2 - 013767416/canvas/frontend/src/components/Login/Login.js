import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logincheck } from "../../actions";

class Login extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
    email: "",
    password: "",
    error_message:"",
    role:"",
    isAuthenticated:false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event)
  {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.loginstatus.loginstatus.isAuthenticated)
    if (nextProps.loginstatus) {
        this.setState({
          isAuthenticated:true
        });
    }
  }
  handleSubmit(event)
  {
    event.preventDefault();
    const logindetails ={
    email : this.state.email,
    password:this.state.password
    }
    this.props.logincheck(logindetails);
  }

  render() {
    if(this.state.isAuthenticated === true){
      this.props.history.push("/teacherdashboard");
    } 
  return (
     <div>
      <div className="login-form">
        <h1>
        Connecting to<div className="applogin-app-logo">
        <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7" alt="SJSU&#x20;Single&#x20;Sign-on" className="logo sanjosestateuniversity_devshibbolethsp_1"/></div>
        </h1>
        <p>Sign-in with your San Jose State University account to access SJSU Single Sign-on</p>
        <form onSubmit={this.handleSubmit}>
          <h2 className="text-center">Log in</h2>
              <div className="form-group">
              <input type="text" name="email" className="form-control" placeholder="Email" required="required" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="form-group">
              <input type="password" name="password" className="form-control"placeholder="Password" required="required" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Log in</button>
              </div>
              <span style={{color : "blue"}}>{this.state.success_message}</span><br/>
              <span style={{color : "red"}}>{this.state.error_message}</span><br/>
              <div className="form-group">
              <h6>Need an account? <Link to="/signup">Sign Up</Link></h6>
              </div>          

            <div className="clearfix">
            </div>
        </form>
        </div>
      </div>
  );
  }
}


//This method provides access to redux store
const mapStateToProps = state => ({
  loginstatus: state.loginstatus,

});

      
export default connect(mapStateToProps,{logincheck})(Login);