import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { Container, Row, Col } from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import CreateQuestion from './CreateQuestion';
class CreateQuiz extends Component {
    constructor()
    {
        super();
        this.state = {
          show: false,
        }
    }
    toggleComponent = () => {
      this.setState(state => ({
        show: !state.show
      }));
    };

  
    render()
    {
        const { show } = this.state;
        return(
            <div>
                <br/>
                <div >
                    {show && <CreateQuestion courseid = {this.props.courseid} quizid = {this.props.quizid}/>}
                </div>          
                <br/>
                <Container>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col> <Button variant="outline-secondary"  onClick={this.toggleComponent}>New Question</Button> </Col>
                    <Col><Button variant="outline-secondary">New Question Group</Button></Col>
                    <Col><Button variant="outline-secondary">Find Question</Button></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                </Container>    
                <br/>

            </div>
        )
    }
}
export default CreateQuiz;



