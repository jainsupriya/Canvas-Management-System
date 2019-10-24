import React,{Component} from 'react'
import { Carousel } from "react-responsive-carousel";
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router';

class Caraousal extends Component{

  constructor(props)
  {
    super(props);
    this.state = {
      toSignUp: false
    };
  }
  pathChange = () => {
      this.setState(state => ({
        toSignUp: !state.toSignUp
      }));
    };

  render(){
      if (this.state.toSignUp === true) {
        return <Redirect to='/login' />
      }
      return(
        
        <Carousel autoPlay>

        <div>
          <img  src="https://www.lifeplanlabs.com/wp-content/uploads/AdobeStock_53247538.jpeg" />
         
          <p className="legend" style={{marginTop:25, }}> Align more with<br/> <b><i>Awesomeness</i></b>
              Canvas is the LMS that makes teaching and learning 
              (and implementation and adoption and customer support and 
              student success and bragging to your non-Canvas-using peers) easier.
              <Button  variant="outline-primary"  onClick={this.pathChange}>Try Canvas for free</Button></p>
              
        </div>
        <div>
          <img src="https://www.lifeplanlabs.com/wp-content/uploads/AdobeStock_53247538.jpeg" />
          <p className="legend">Legend 3</p>
        </div>
        <div>
          <img src="https://www.lifeplanlabs.com/wp-content/uploads/AdobeStock_53247538.jpeg" />
          <p className="legend">Legend 4</p>
        </div>
        <div>
          <img src="https://www.lifeplanlabs.com/wp-content/uploads/AdobeStock_53247538.jpeg" />
          <p className="legend" style={{marginTop:25}}>Legend 4</p>
        </div>
     
      </Carousel>
      )}
};

export default Caraousal;