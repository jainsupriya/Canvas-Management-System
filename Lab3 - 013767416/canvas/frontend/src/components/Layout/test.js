import React,{Component} from 'react'
import MiniDrawer from './MiniDrawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Layout from './Layout';
import Sidebar from './Sidebar';

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

class Test extends Component{
    constructor(props)
    {
        super(props);
        console.log(localStorage.getItem("jwt"));
    }
    render()
    {
        //const { classes } = this.props;
        return(
           
            <Grid container>   
              <Grid item xs={4.5}>
              <Layout/>
              </Grid>                    
              <Grid item xs={6}><br/>
               <div className="border mt-5 search-container">
                I am a middle component
               </div>
              </Grid>
              <Grid item xs={1.5}>
              <Sidebar/>
              </Grid>
            </Grid>
      
        )
    }
};


Test.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Test);
  