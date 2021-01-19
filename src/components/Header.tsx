// Imports
// React Imports
import React from 'react';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';

// Styling for Header Component
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(0),
    },
    title: {
        flexGrow: 1,
    },
}));

// Header component
export default function Header() {
    // use Styles const
    const classes = useStyles();
    // component return
    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0} style={{ background: 'none', border: 'none' }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="timer">
                        <BookIcon style={{ fontSize: 40 }} />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        Diaries App
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}