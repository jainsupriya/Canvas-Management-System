import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import 'antd/dist/antd.css';
import './t.css';
import DashboardSideBar from './DashboardSideBar';
import Appbar from '../Appbar';

class TeacherDash extends Component 
{constructor(props)
    {
        super(props);
        this.state = {selectedPath: ''};
    }
    onItemSelection = (arg) => {
        this.setState({ selectedPath: arg.path })
    }
  render() {
    return (
        <div xs="6" sm="4">
          <Appbar/>
         <DashboardSideBar/>
        </div>
    )
  }
}

export default TeacherDash;
