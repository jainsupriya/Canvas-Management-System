import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logincheck } from "../../actions";
import {login} from '../../queries/queries';
import { Redirect } from 'react-router';
import { graphql } from 'react-apollo';


import {withApollo} from 'react-apollo';
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

  handleSubmit(event)
  {
    event.preventDefault();
    this.props.client.query({
        query : login,
        variables: {
            Email : this.state.email,
            Password : this.state.password
        }
    }).then((response)=>{
        console.log('Response', response.data);
        console.log('UserData', response.data.login.userData);
        if(response.data.login.result == true){
            
            localStorage.setItem("Name",response.data.login.userData.Name);
            localStorage.setItem('Role', response.data.login.userData.Role);
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("Email", response.data.login.userData.Email);

            this.setState({
                isAuthenticated:true
            });
        }
        else{
            this.setState({
                validationFailure:true
            });
        }
    });

  }

  render() {

    let redrirectVar = null;        
    if(this.state.isAuthenticated === true){
        redrirectVar = <Redirect to="/teacherdashboard" />
    }
  return (
     <div>
      <div className="login-form">{redrirectVar}
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

      
//export default connect(mapStateToProps,{logincheck})(Login);


export default withApollo(Login);