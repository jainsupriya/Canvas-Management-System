import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {url} from '../../config'
import axios from 'axios';
//axios.defaults.baseURL = "localhost"
//axios.defaults.proxy.port = 3001

class Login extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
    email: "",
    password: "",
    error_message:"",
    role:""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event)
  {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }
  handleSubmit(event)
  {
    event.preventDefault();
    const logindetails ={
    email : this.state.email,
    password:this.state.password
    }

    axios.defaults.withCredentials = true;
    axios.post('/login',  logindetails).
      then(res=>{
        if(res.status === 201)
        {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("userid", res.data.userdata.userid);
          localStorage.setItem("role", res.data.userdata.role);
          localStorage.setItem("username", res.data.userdata.username);
           this.setState ( {
            role:res.data,
            email: "",
            password: ""});
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
          if (err.response.status === 400) {
              this.setState({
                  errormessage: "Invalid Credentials"
              })
          }
        }
  });

  }

  render() {
    let redirectVar = null;
    console.log(cookie.load('cookie'))
    if(cookie.load('cookie'))
    {
        redirectVar = <Redirect to= "/teacherdashboard"/>
    }

  return (
     <div>{redirectVar}
      <div className="login-form">
        <h1>
        Connecting to<div className="applogin-app-logo">
        <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7" alt="SJSU&#x20;Single&#x20;Sign-on" className="logo sanjosestateuniversity_devshibbolethsp_1"/></div>
        </h1>
        <p>Sign-in with your San Jose State University account to access SJSU Single Sign-on</p>
        <form onSubmit={this.handleSubmit} method="post">
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

export default Login;