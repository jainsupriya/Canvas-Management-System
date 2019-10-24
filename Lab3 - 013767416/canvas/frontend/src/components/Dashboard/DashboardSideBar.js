import React, { Component } from 'react';
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import Profile from '../Profile/profile';
import { FaTrash, FaInbox } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { TiCogOutline } from "react-icons/ti"; 
import { IoMdHelpCircle } from "react-icons/io";  
import Courses from '../Courses/Courses';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import './t.css';
import MainDashboard from './MainDashboard';

const styles = {
  root: {
    width: 70
  },
};
class DashboardSideBar extends Component 
{constructor(props)
    {
        super(props);
        this.state = {selectedPath: ''};
    }
    onItemSelection = (arg) => {
        this.setState({ selectedPath: arg.path })
    }
  render() {
    const { classes } = this.props;
    return (
        <div>
        <Tabs defaultTab="vertical-tab-one" vertical className="vertical-tabs">
        <TabList>
          <Tab tabFor="vertical-tab-one" > <TiCogOutline /><br/>Canvas</Tab>
          <Tab tabFor="vertical-tab-two"><MdAccountCircle /><br/>Account</Tab>
          <Tab tabFor="vertical-tab-three"><FaTrash /><br/>Dashboard</Tab>
          <Tab tabFor="vertical-tab-four"><FaRegFileAlt /><br/>Courses</Tab>
          <Tab tabFor="vertical-tab-five"><FaCalendar /><br/>Calender</Tab>
          <Tab tabFor="vertical-tab-six"> <FaFacebookMessenger /><br/>Inbox</Tab>
          <Tab tabFor="vertical-tab-seven"><IoMdHelpCircle /><br/>Help</Tab>
          <Tab tabFor="vertical-tab-eight"></Tab>
          <Tab tabFor="vertical-tab-nine"></Tab>
          <Tab tabFor="vertical-tab-ten"></Tab>
          <Tab tabFor="vertical-tab-eleven"></Tab>
          <Tab tabFor="vertical-tab-twelve"></Tab>
          <Tab tabFor="vertical-tab-thirteen"></Tab>
          <Tab tabFor="vertical-tab-fourteen"></Tab>
          
        </TabList>
  
        <TabPanel tabId="vertical-tab-one">
          <p>Tab 1 content</p>
        </TabPanel>
  
        <TabPanel tabId="vertical-tab-two">
        <Profile/>
        </TabPanel>
  
        <TabPanel tabId="vertical-tab-three">
          <p><MainDashboard/></p>
        </TabPanel>

        <TabPanel tabId="vertical-tab-four">
          <Courses/>
        </TabPanel>

        <TabPanel tabId="vertical-tab-five">
        </TabPanel>

        <TabPanel tabId="vertical-tab-six">
          <p>Tab 6 content</p>
        </TabPanel>


        <TabPanel tabId="vertical-tab-seven">
          <p>Tab 7 content</p>
        </TabPanel>

      </Tabs>
      </div>
    )
  }
}


DashboardSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardSideBar);