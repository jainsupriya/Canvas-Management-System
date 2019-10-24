import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container, Row, Col } from 'reactstrap';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {Link} from 'react-router-dom';
const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',

  },
  paper: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  paper1: {
    marginRight: theme.spacing.unit * 2,
  },
});

  
class Appbar extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
          open: false,
        };
    }
    handleToggle = () => {
      this.setState(state => ({ open: !state.open }));
    };
  
    handleClose = event => {
      if (this.anchorEl.contains(event.target)) {
        return;
      }
  
      this.setState({ open: false });
    };
  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <Container>
          <Row>
            <Col> 
            <IconButton 
              className={classes.menuButton} color="inherit" 
              aria-label="Menu" 
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}>
              <MenuIcon/>
            </IconButton>
            <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          </Col><Col>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            </Typography></Col>
            <Col>
               </Col><Col></Col><Col></Col><Col></Col><Col></Col><Col></Col>
            <Col><Link to={"/teacherdashboard"}>Home</Link></Col>
            
          </Row>
          </Container>

          </Toolbar>
        </AppBar>
      </div>

    )
  }
}


Appbar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Appbar);