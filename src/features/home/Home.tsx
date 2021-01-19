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
// Components imports
import { Diaries } from '../diary/Diaries';
// Reducer Imports
import { RootState } from '../../rootReducer';
// Redux Imports
import { useSelector } from 'react-redux';
import { Editor } from '../entry/Editor';
import { setCanEdit } from '../entry/editorSlice';

// Styling for LogOut button
const useStyles = makeStyles((theme) => ({
    lgelem: {
        backgroundColor: 'transparent',
        color: "white"
    },
}));


const Home = () => {
    //  useStyles
    const classes = useStyles();
    // use displatch to use store functions
    const dispatch = useAppDispatch();
    // use data from store
    const { canEdit } = useSelector((state: RootState) => state.editor);
    const saveEntry = async () => {
        dispatch(setAuthState(false))
        dispatch(setCanEdit(false))
    }
    return (
        <div>
            {/* LogOut Button */}
            <div>
                <Grid container justify="flex-end">
                    <Grid item xs={3} >
                        <Grid container justify="flex-end">
                            <Grid item xs={8} md={6} component={Card} elevation={0} className={classes.lgelem}>
                                <Button
                                    disableRipple
                                    aria-label="Sign Out"
                                    className={classes.lgelem}
                                    onClick={() => saveEntry()}
                                >
                                    <PowerSettingsNewIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            {canEdit ? <Editor /> : <Diaries />}
        </div>
    )
}

export default Home;