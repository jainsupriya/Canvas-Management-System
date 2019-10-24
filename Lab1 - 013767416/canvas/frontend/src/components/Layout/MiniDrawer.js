  import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/Dashboard";
import BookRounded from "@material-ui/icons/BookRounded";
import Help from "@material-ui/icons/Help";
import CalendarViewDay from "@material-ui/icons/CalendarToday";
import {Link} from 'react-router-dom';
import AccountCircleRounded from "@material-ui/icons/AccountCircleRounded";
import MailIcon from "@material-ui/icons/Mail";
import {Redirect} from 'react-router';

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

class MiniDrawer extends React.Component {
  state = {
    open: false,
    left: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handlePageChange = () => {
    console.log('m here')
    return <Redirect to="/courses" />
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.new}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >

          <Divider />
          <List  className={classes.list}  style = {{backgroundColor: '#094D98'} }>
                <ListItem button></ListItem> <ListItem button></ListItem> <ListItem button></ListItem>
                <Link to={"/profile"}><ListItem button>
                <ListItemIcon>
                <AccountCircleRounded style={{ fill: '#EFF1F2' }}/>
                </ListItemIcon>
                <ListItemText  inset primary={<Typography style={{ color: '#FCFDFF' }}>
                Account</Typography>}/>
                </ListItem></Link>
                <Link to={"/dashboard"}><ListItem button>
                <ListItemIcon>
                    <Dashboard  style={{ fill: '#EFF1F2' }}/>
                </ListItemIcon>
                <ListItemText inset primary={<Typography style={{ color: '#FCFDFF' }}>Dashboard</Typography>}/>
                </ListItem></Link>
                <Link to={"/courses"}>
                <ListItem button>
                <ListItemIcon>
                    <BookRounded  style={{ fill: '#EFF1F2' }}/>
                </ListItemIcon>
                <ListItemText inset primary= {<Typography style={{ color: '#FCFDFF' }}>Courses</Typography>} />
                </ListItem>
                </Link>
                <ListItem button>
                <ListItemIcon>
                    <CalendarViewDay style={{ fill: '#EFF1F2' }}/>
                </ListItemIcon>
                <ListItemText inset primary= {<Typography style={{ color: '#FCFDFF' }}>Calendar</Typography>} />
                </ListItem>
                
                <ListItem button>
                <ListItemIcon>
                    <MailIcon style={{ fill: '#EFF1F2' }}/>
                </ListItemIcon>
                <ListItemText inset primary= {<Typography style={{ color: '#FCFDFF' }}>Inbox</Typography>} />
                </ListItem>
                <ListItem button>
                <ListItemIcon>
                    <Help style={{ fill: '#EFF1F2' }}/>
                </ListItemIcon>
                <ListItemText inset primary= {<Typography style={{ color: '#FCFDFF' }}>Help</Typography>} />
               </ListItem>

                <ListItem button></ListItem> <ListItem button></ListItem> <ListItem button></ListItem>
                <ListItem button></ListItem> <ListItem button></ListItem> <ListItem button></ListItem>
                <ListItem button></ListItem> <ListItem button></ListItem> <ListItem button></ListItem>
                <ListItem button></ListItem> <ListItem button></ListItem> <ListItem button></ListItem>
                <ListItem >
                <div className={classes.toolbar}>
                  <IconButton onClick={this.handleDrawerOpen}>
                   <ChevronRightIcon />
                  </IconButton>
                </div>
                </ListItem> 
                <ListItem >
                <div className={classes.toolbar}>
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === "rtl" ? (<ChevronRightIcon />) : (<ChevronLeftIcon />)}
                  </IconButton>
                </div>
                </ListItem> 
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
