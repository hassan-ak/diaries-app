// imports
// React Imports
import React from 'react';
// Material Ui imports
import { Card, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
// Store Imports
import { useAppDispatch } from '../../store';
import { setAuthState } from "../auth/authSlice";

// Styling for LogOut button
const useStyles = makeStyles((theme) => ({
    lgelem: {
        backgroundColor:'transparent',
        color:"white"
    },
}));


const Home = () => {
    //  useStyles
    const classes = useStyles();
    // use displatch to use store functions
    const dispatch = useAppDispatch();
    return (
        <div>
            <Grid container justify="flex-end">
                <Grid item xs={3} >
                    <Grid container justify="flex-end">
                        <Grid item xs={8} md={6}  component={Card} elevation={0} className={classes.lgelem}>
                            <Button 
                                disableRipple
                                aria-label="Sign Out"
                                className={classes.lgelem}
                                onClick={()=>(dispatch(setAuthState(false)))}
                            >
                                <PowerSettingsNewIcon />
                            </Button>
                        </Grid>
                    </Grid>  
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;