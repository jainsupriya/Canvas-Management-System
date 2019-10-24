import React,{Component} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MiniDrawer from '../Layout/MiniDrawer';
import axios from "axios";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import {Redirect} from 'react-router';



class Inbox extends Component{
    constructor(props) 
    {
        super(props);
        console.log(props);
        this.state = {
          messageData: [],
          messageDetails:'',
          receiverEmailId:'',
          redirectToJobDisplayPage: false,
          saveClicked: false,
          redirectToJobApplication:false
        };
    
        this.sendMessageHandler = this.sendMessageHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextprops) {
    console.log(JSON.stringify(nextprops))
    }
    
    componentDidMount() {
    axios.defaults.withCredentials = true;
    if(this.props.loginstatus.loginstatus.isAuthenticated)
    {
    var values = {
        senderEmailId : this.props.loginstatus.loginstatus.email
    }
    axios.post("/message/get",values).then(response => {
        if (response.status === 200) {
        var messageResult = response.data;
        console.log("message data", messageResult);
        if(messageResult.length === 0)
        {
            console.log("No messages found");
        }
        else{
        this.setState({
            messageData: messageResult,
            messageDetails: messageResult[0]
        });
        }
        }     
    });
    }
    }

    inputHandler = (e) => {
    this.setState({
        message : e.target.value
    })
    }
    handleChange(event)
    {
      const {name, value} = event.target;
      this.setState({ [name]: value });
    }
    sendMessageHandler = ()=>
    {
    //console.log("Sender Email ID " + this.props.loginreducer)
        var senderdetailstoggle;
        console.log(this.state.messageDetails.senderEmailId)
        if(!this.state.messageDetails.senderEmailId)
          senderdetailstoggle = this.state.receiverEmailId
        else if(this.state.messageDetails.senderEmailId ===this.props.loginstatus.loginstatus.email)
        {
        senderdetailstoggle = this.state.receiverEmailId
        }
        else
        {
        senderdetailstoggle = this.state.messageDetails.senderEmailId
        }

    var values = {

        messageThread : this.props.loginstatus.loginstatus.username + " : " + this.state.message,
        senderEmailId : this.props.loginstatus.loginstatus.email,
        receiverEmailId : senderdetailstoggle,
        senderFName : this.props.loginstatus.loginstatus.username,
        
    }
    console.log("values send" + JSON.stringify(values))
    axios.post('/message/send', values)
        .then((response)=>{
            if(response.status === 200){
                console.log("Message sent")
            }
        });  
    
    }

    toggleDetailsPane = (Parameter, event) =>{

        const index = Parameter;
        var messageDetail = this.state.messageData[index];     
        console.log('Message details', messageDetail);
        this.setState({
            messageDetails: messageDetail,
        });
    }

    render()
    {
  
        var sendertoggle;
        var redirectVar = null
        if(this.props.loginstatus.loginstatus.isAuthenticated=== false){
            redirectVar  = <Redirect to="/login"/>
        }
        console.log(this.state.messageData)
        var briefPaneContent = this.state.messageData.map((message, index)=> {
          if(message.senderEmailId === this.props.loginstatus.loginstatus.email)
          {
            sendertoggle = message.receiverEmailId
          }
          else
          {
            sendertoggle = message.senderEmailId
          }
    
          return (
            <div className="job-result-data p-3 mt-2 mb-2 row border" key={index}>{redirectVar}
              <span className="job-logo-container col-lg-2">
                <img
                  className="job-logo"
                  src="data:image/png;base64,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"
                  alt="person-logo"
                />
              </span>
              <span className="col-lg-10">
                <div className="">
                  <b>
                    <Link to="#" onClick={this.toggleDetailsPane.bind(this, index)}>{sendertoggle}</Link>
                  </b>
                  <br />
                </div>
              </span>
            </div>
          );
        });
    
        if(this.state.messageDetails.messageThread != null){
          messages = this.state.messageDetails.messageThread[0];
          var messages = this.state.messageDetails.messageThread.map((message, key) => {
          return(
            <div key = {key} >  
                 <h1>{message}</h1>
                 </div>

          )
        })
      }
    
        var detailsPaneContent = (
          <div className="mt-2 border">
            <div className="job-title-container pad-2-pc row">
    
              <div className="col-lg-9">
                <div className="">
                  {messages}
                  <hr/>
                </div>
    
              </div>
            </div>
            <hr />
    
            <div className="pad-2-pc job-desc-cotainer">
            <form>
                  <div className="form-group">
                  <input type="text" name="receiverEmailId" value={this.state.receiverEmailId}  onChange = {this.handleChange} placeholder="Receiver Email Id"/>
                  <label htmlFor="message-text" className="col-form-label">Message:</label>
                  <textarea className="form-control" id="message-text" onChange = {this.inputHandler}></textarea>
                  <button type="button" className="btn btn-primary" onClick = {this.sendMessageHandler}>Send</button>
                  </div>
            </form>
            </div>
          </div>
        );
        return(
        <div >          

        <MiniDrawer/>

        <div>
            <div className="row center-content">
            <div className="col-lg-1 col-md-1 col-sm-1" />
            <div className="ml-4 mt-5 jobs-result-container content-left-align col-lg-5 col-md-5 col-sm-5">
                <div>{briefPaneContent}</div>
            </div>
            <div className="mt-5 jobs-result-details-container content-left-align col-lg-5 col-md-5 col-sm-5">
                <div className="">{detailsPaneContent}</div>
            </div>
            </div>
            <hr />
        </div>
 
        </div>
        )
    }
};

const mapStateToProps = state => ({
    loginstatus: state.loginstatus,
  
  });
  
        
  export default connect(mapStateToProps,null)(Inbox);