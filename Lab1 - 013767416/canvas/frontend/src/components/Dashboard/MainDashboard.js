import React, { Component } from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import 'antd/dist/antd.css';
import './t.css';
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Row, Col } from 'reactstrap';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../Layout/Sidebar';
import MiniDrawer from '../Layout/MiniDrawer';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Table } from 'reactstrap';
const axios = require('axios');
class MainDashboard extends Component 
{
  constructor(props)
  {
      super(props);
      this.state={
        expanded :false,
        role:'',
        courses:[],
        showGrades:false
        };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  componentDidMount(){
    axios.defaults.withCredentials = true;
    axios.get('/courses').then(
        res => {
            if(res.status ===200)
                this.setState({courses: res.data});
        }
    )
  }
  showGrades = () =>{
      this.setState({showGrades:true})
  }
  render() {

    var imgsrc= ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAABzCAMAAADjYB1gAAAAA1BMVEUAAP79f+LBAAAALklEQVR4nO3BMQEAAADCoPVPbQo/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAswFcFwABlC4FZQAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAFVBMVEX/AAD/sLDj6OHk5d7/rK3c2dD/4ODg6GgXAAAAZklEQVRoge3bSQHAMAzAsFwtf8hlsTwmExACx+naqE/0nfy+uR01sdFUVK7ISSaTyWQymUwmk8lkMplMJpPJZDKZTCaTyWQymUwmk8lkMplMJpPJZDKZTCaTyeRfyWsf3d47uPZLPsA6BdmDZs5MAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAG1BMVEX/ZgDj5uD/xbb/WgDj5N3/wrLc2dD/6eT/TQB0vkz1AAAAbElEQVRoge3bgQ0AIQgAMVBQ95/4xyD59BboBBencqY6UbfXRH0rst+e6HVGrh0T7cVms9lsNpvNZrPZbDabzWaz2Ww2m81ms9lsNpvNZrPZbDabzWaz2Ww2m81ms9lsNvsX9uAnOfmHDn6xHyTyC53QNQIUAAAAAElFTkSuQmCC",
"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHoAegMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIHA//EACIQAQEAAgICAQUBAAAAAAAAAAABEUEhMVFhwYGRobHwQv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgcF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAEx/9oADAMBAAIRAxEAPwDp15JDSuVvUJ0AgsJo8E6ihdcgoG/qipsQURBQSCrpM+w59CJgXSdYFNKLtYAC1DwkXwiCw8BsEUAAMJQgGP7KCVFT9tKq7ZX37ILoTSrdRAoyLDATtQiooIEVKCfYEGdZAVTaz5McwWBqKm1KiG4HtBYQJxFAIAKmgFDRhBgiZ81cirslJ2NRBUisiAAZXPCX8qoZNGzQKJ9FBFxfIuUHnfQUgqztJ8LBqIKGmRBYgGgUEUFBWecLoFPudGQYz2sqdRRQCCKEEBM8gBnlZ0kNAoEihpU0AsEiceATITtP9UVoTyt0IpCJCgs7CdxBIsRZ0ATqhFDQTqCios+Fwg//2Q==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAAB1CAMAAAAhrGCcAAAAA1BMVEVMuxdaGLvKAAAALElEQVR4nO3BMQEAAADCoPVPbQhfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgNVewAAULEThYAAAAASUVORK5CYII=",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAACECAMAAAAjtxxSAAAAA1BMVEW/AP4zfVvsAAAAIklEQVRoge3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAeDEt5AABUlvaawAAAABJRU5ErkJggg==",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEXeXYNbydRjAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC",
"http://pontus.mentalfloss.com/sites/default/files/smaragdine.png",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4KhyTNCOUVHzURvo6olStehpcq56piJavsQ_hqxR_E7AHL4ilA",
"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwoHCAYIBwYIBwcHDRYHBwcGCBsICQcKFB0WFhURExMYHCggGBolJxMTITEhJSkrLi4uHh8zODMsNygtLisBCgoKDg0OFQ8PGCsaFR4rMCsrMistNysrNys3Ky0rKysrNys3KysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAwECBQT/xAAoEAEAAQIGAQQBBQAAAAAAAAAAEQECAxNCQ1NxMRIyUmGRISIjQVH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIHBv/EABkRAQEBAQEBAAAAAAAAAAAAAAABETESAv/aAAwDAQACEQMRAD8A9HEutp6JpT20TrfZ8KVZix+yf8TnzHh7CRzGLZlnwMyz4ITUmqYYvmWcZmWcaEkmGL5lnGZlnGhJJhi+ZZxmZZxoSSYYvmWcZmWcaEkmGL5lnGZlnGhJNTDF8yzjMyzjQmrZXyYtmWcZmWcaMsmp5MXzLOMzLONCSamGL5lnGZlnwQmpJhi+ZZxmZZxoTUmphi+ZZxmZZ8EJJMMXriWcbaX2xf8Ax+EJqpbbWL/1oYWO/XTjHEdfkTGTF0dJKYu30m1G/kAUAAAAAAAAAAAAAAAAAAAAAAKu6eMTtxV3b4v+wpDQE0xdvpNTF2+k0iwAKACAAAAAAAAAAAAAAAAAAAAA7t8X0cKW6xKANJhi7fSamLt9JpGpwAKACAAAAAAAAAAAAAAAAAAAAApbrTUt1iADQYu30mpi7fSaRZwAKACAAAAAAAAAAAAAAAAAAAAApbrTUt1iADQYu30mpi7fSaRZwAKACAAAAAAAAAAAAAAAAAAAAApbrTUt1iADQYu30mpi7fSaRZwAKACAAAAAAAAAAAAAAAAAAAAApbrTUt1iADQYu30mpi7fSaRZwAKACAAAAAAAAAAAAAAAAAAAAApbrTUt1iADQYu30mpi7fSaRZwAKACAAAAAAAAAAAAAAAAAAAAApbrTUt1iADQYu30mpi7fSaRZwAKACAAAAAAAAAAAAAAAAAAAAApbrTUt1iADQYu30mpi7fSaRZwAKACAAAAAAAAAAAAAAAAAAAAApbrTUt1iADQYu30mpi7fSaRZwAAAQAAAAAAAAAAAAAAAAAAAAFLdaalusQBrRrMXb6TUxdvpNIsACgAgAAAAAAAAAAAAAAAAAAAAO7fF9XDu3xepWg1WcZjU9nVE4fTiV9nVHDMJ9JQQ78NlV1OCFJJDU4IUkkNTghSSQ1OCFJJDU4IUkkNTghSSQ1OCFJJDU4IUkkNTghSSQ1OCFJJDU4ZWisnq+g1KFLPbfNG+r6d/1f8AkTU5a1iGu7/FnTgEjMYA1FAFAAAAAAAAAAAAAAAAAABlQAopTxcDI5AFf//Z",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASkAAACqCAMAAADGFElyAAAAA1BMVEWbUeBVluSmAAAASElEQVR4nO3BMQEAAADCoPVPbQo/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+BsXkAAEO2CijAAAAAElFTkSuQmCC",
];

    const { classes } = this.props;
    let redirectVar= null;
    if(!cookie.load('cookie'))
        redirectVar = <Redirect to= "/login"/>
    else if(this.state.showGrades)
        redirectVar = <Redirect to= "/showGrades"/>
      return (
        <Grid container> {redirectVar}  
        <Grid item xs={4.5}>
        <MiniDrawer/>
        </Grid>                    
        <Grid item xs={9}>
        <div >
           <br/><h3> &nbsp;&nbsp; Dashboard  </h3>
          
          <Divider variant="middle" /><br/>
       
            <div className ="DashboardCard_Container">
              <div className = "ic-DashboardCard__box" >
              <Row>
              {this.state.courses.map(function(course, key) {   
                var random = imgsrc[Math.floor(Math.random()*5)];          
                return (
                 <Card className={classes.card} key={course}  style={{ marginLeft: 20, maxWidth:250}} >
                  <CardMedia
                    className={classes.media}
                    image={random}
                    title="Paella dish"              
                  />
                  <CardContent>
                    <Typography component="p"><Link to={"/course/"+course.courseid}>
                    <b>{course.term}{':'}{course.dept}{course.nickname}{'-'}{course.name}</b></Link>
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>               
                )
              })}
              </Row>
              </div>
            </div>
        </div>
        </Grid>
        <Grid item xs={1.5}>
        <br/>
        <Button variant="outline-primary"  onClick={this.showGrades}>View Grades</Button>
        </Grid>
      </Grid>        
      )
    
  }
}
const styles = theme => ({
 
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

MainDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainDashboard);
