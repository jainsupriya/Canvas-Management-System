import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CreateQuiz from './CreateQuiz';
import QuizDetails from './QuizDetails';
class QuizTabs extends Component {
constructor(props)
{
    super(props);

    console.log(props);
}
    render()
    {
        return(
            <div>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Details">  
                <QuizDetails courseid = {this.props.courseid} quizid = {this.props.quizid}/>   
                </Tab>
                <Tab eventKey="profile" title="Questions">
                <CreateQuiz courseid = {this.props.courseid} quizid = {this.props.quizid}/>
                </Tab>
                </Tabs>
                
            </div>
        )
    }
}
export default QuizTabs;




