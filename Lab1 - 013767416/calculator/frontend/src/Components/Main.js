import React, {Component} from 'react';
import {  Route } from 'react-router-dom';
import Calculator from '../Components/Calculator';

class Main extends Component {
    render() {
    return (
      
        <Route path="/" component={Calculator}/>
    );
    }
    }
export default Main;