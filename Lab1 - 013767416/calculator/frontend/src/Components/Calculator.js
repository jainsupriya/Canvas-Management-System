import React, { Component } from 'react';
import '../index.css';
import './calculator.css';
const axios = require('axios');
class Calculator extends Component {
    constructor(){
        super();
        this.state={finalexp : ""}

        this.handleClick = this.handleClick.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick = (number)=> {
       this.setState({finalexp: this.state.finalexp.concat(number)})
    }
    handleClear(){
      this.setState({finalexp: ''})
    }
     handleSubmit(event){
        console.log('hi');
      event.preventDefault();
      const expression ={
        expression:this.state.finalexp,
        };
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/calculate', expression).then(res=>
        {
               if(res.status ===200)
                  this.setState({finalexp: res.data});
               
        });
      
     }
render() {
return (
<div>
<center><form onSubmit={this.handleSubmit} method="post">
<br/><br/><br/><br/><br/>
<table border="1"> 
         <tr> 
            <td colspan="3"><input type="text" name="result" onChange={ this.handleChange } value= {this.state.finalexp}/></td> 
            <td><input type="button" value="c" onClick= {this.handleClear}/> </td> 
         </tr> 
         <tr> 
            <td><input type="button" value="1" onClick={() => this.handleClick('1')}/> </td> 
            <td><input type="button" value="2" onClick={() => this.handleClick('2')}/> </td> 
            <td><input type="button" value="3" onClick={() => this.handleClick('3')}/> </td> 
            <td><input type="button" value="/" onClick={() => this.handleClick('/')}/> </td> 
         </tr> 
         <tr> 
            <td><input type="button" value="4" onClick={() => this.handleClick('4')}/> </td> 
            <td><input type="button" value="5" onClick={() => this.handleClick('5')}/> </td> 
            <td><input type="button" value="6" onClick={() => this.handleClick('6')}/> </td> 
            <td><input type="button" value="-" onClick={() => this.handleClick('-')}/> </td> 
         </tr> 
         <tr> 
            <td><input type="button" value="7" onClick={() => this.handleClick('7')}/> </td> 
            <td><input type="button" value="8" onClick={() => this.handleClick('8')}/> </td> 
            <td><input type="button" value="9" onClick={() => this.handleClick('9')}/> </td> 
            <td><input type="button" value="+" onClick={() => this.handleClick('+')}/> </td> 
         </tr> 
         <tr> 
            <td><input type="button" value="." onClick={() => this.handleClick('.')}/> </td> 
            <td><input type="button" value="0" onClick={() => this.handleClick('0')}/> </td> 
            <td><input type="submit" value="=" /> </td> 
            <td><input type="button" value="*" onClick={() => this.handleClick('*')}/> </td> 
         </tr> 
      </table> 
      </form>
      </center>
</div>
);
}
}
export default Calculator;