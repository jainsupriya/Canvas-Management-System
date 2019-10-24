import React, { Component } from 'react';
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const drawerWidth = 150;
const styles = theme => ({
  root: {
    display: "flex",
    
  },
  new: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 90,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    color:"blue",

  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});
class Appbar extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
          open: false,
          left: false,
        };
    }
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };

    handleDrawerClose = () => {
      this.setState({ open: false });
    };
    render()
    {
      const { classes, theme } = this.props;
        return(
            <AppBar
            style={{ backgroundColor: '#FCFDFF' }}
             className={classNames(classes.appBar, {
               [classes.appBarShift]: this.state.open
             })}>

          <Toolbar disableGutters={!this.state.open}>
             <IconButton            
              color="inherit"                     
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
              [classes.hide]: this.state.open
              })}>
              <Menu style={{ fill: '#094D98' }}/>
              </IconButton>
   
               <Typography variant="subtitle1" style={{ color: '#094D98' , marginLeft:1}} >
                 &nbsp; &nbsp; {this.props.term}:{this.props.dept}-{this.props.nickname} - {this.props.name} > {this.props.tag}
               </Typography>

             </Toolbar>
           </AppBar>
        )
    }
}
Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Appbar);
