import React,{Component} from 'react'
import MiniDrawer from './MiniDrawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuList from '../Layout/MenuList';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Layout extends Component{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            <Grid container>
              <Grid item xs={2.5}>
                <MiniDrawer/>
              </Grid>
              <Grid item xs={2} >
              <MenuList />
              </Grid>
            </Grid>
          </div>
        )
    }
};


Layout.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Layout);
  