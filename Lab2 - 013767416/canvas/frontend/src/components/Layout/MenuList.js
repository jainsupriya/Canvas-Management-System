import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class MenuList extends React.Component {
  state = {
    dense: false,
    secondary: false,
  };

  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
            <div className={classes.root}>
            <div className={classes.demo}   style = {{width: 200} }>
              <List dense={dense}  style = {{width: 200} }>
                  <ListItem><ListItemText  primary="Home"/></ListItem>
                  <Link to={"/announcement"} style={{ textDecoration: 'none' }}><ListItem><ListItemText  primary="Announcement"/></ListItem></Link>
                  <Link to={"/assignment"} style={{ textDecoration: 'none' }}><ListItem><ListItemText  primary="Assignment"/></ListItem></Link>
                  <Link to={"/grades"} style={{ textDecoration: 'none' }}><ListItem><ListItemText  primary="Grades"/></ListItem></Link>
                  <Link to={"/people"} style={{ textDecoration: 'none' }}><ListItem><ListItemText  primary="People"/></ListItem></Link>
                  <Link to={"/files"} style={{ textDecoration: 'none' }}><ListItem><ListItemText  primary="Files"/></ListItem></Link>
                  <Link to={"/quizzes"} style={{ textDecoration: 'none' }}><ListItem><ListItemText  primary="Quizzes"/></ListItem></Link>
                  <Link to={"/random"} style={{ textDecoration: 'none' }}><ListItem><ListItemText  primary="PNR Codes"/></ListItem></Link>
                 <ListItem><ListItemText  primary="Syllabus"/></ListItem>
                 <ListItem><ListItemText  primary="Discussion"/></ListItem>
                  <ListItem><ListItemText  primary="Conference"/></ListItem>
                  <ListItem><ListItemText  primary="Collaboration"/></ListItem>
                  <ListItem><ListItemText  primary="Chat"/></ListItem>
                  <ListItem><ListItemText  primary="Criterion"/></ListItem>
                  <ListItem><ListItemText  primary="Portfolium"/></ListItem>
              </List>
            </div>
            </div>
     
    );
  }
}

MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuList);