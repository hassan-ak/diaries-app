// Imports
// React Imports
import React, { FC, useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
// Routers imports
import { useParams, Link } from 'react-router-dom';
// Redux Imports
import { useSelector } from 'react-redux';
// Reducer and reducewr actions imports
import { RootState } from '../../rootReducer';
import { setEntries } from '../entry/entriesSlice';
import { setCurrentlyEditing, setCanEdit } from '../entry/editorSlice';
import { useAppDispatch } from '../../store';
import { setAuthState } from "../auth/authSlice";
// Api Imports
import http from '../../services/api';
// Interfaces Imports
import { Entry } from '../../interfaces/entry.interface';
// Materail Ui Imports
import { Card, Grid } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Dy js imports
import dayjs from 'dayjs';
///////
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Editor } from '../entry/Editor';

// Styles for power off button
const useStyles = makeStyles((theme) => ({
  lgelem: {
    backgroundColor: 'transparent',
    color: "white"
  },
}));

const DiaryEntriesList: FC = () => {
  //  useStyles
  const classes = useStyles();
  // use displatch to use store functions
  const dispatch = useAppDispatch();
  // use data from store
  const { canEdit } = useSelector((state: RootState) => state.editor);
  const { currentlyEditing: entry} = useSelector((state: RootState) => state.editor);
  const { entries } = useSelector((state: RootState) => state);
  const [viewDetails, setViewDetails] = useState(false)
  // power off button action
  const saveEntry = async () => {
    dispatch(setAuthState(false))
    dispatch(setCanEdit(false))
  }
  // for linking
  const { id } = useParams();

  // fetch diaries on load
  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div>
      <div>
        <Grid container justify="flex-end">
          <Grid item xs={3} >
            <Grid container justify="flex-end">
              <Grid item xs={8} md={6} component={Card} elevation={0} className={classes.lgelem}>
                <Link to="/">
                  <Button
                    disableRipple
                    aria-label="Sign Out"
                    className={classes.lgelem}
                    onClick={() => saveEntry()}
                  >
                    <PowerSettingsNewIcon />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {canEdit === false ?
        <div className="entries">
        {viewDetails === false ?
          <div>
            <header className="moveBack">
              <Link to="/">
                <Button
                  disableRipple
                  aria-label="last Page"
                  className={classes.lgelem}
                >
                  <KeyboardBackspaceIcon fontSize="large" />
                </Button>
              </Link>
            </header>
            <div className="entriesContainer">
              <h2 className="entriesTitle">Entries List</h2>
              <div className="entriesGrid">
                {entries.map(
                  (entry) => (
                    <div key={entry.id} className="entryCard" onClick={() => { dispatch(setCurrentlyEditing(entry)); setViewDetails(true);}}>
                      <div><p><strong>{entry.title}</strong></p></div>
                    </div>
                  )
                )}
              </div>
            </div> 
          </div>
        :
          <div className="detailsContainer">
            <header className="moveBack1">
              <Button
                disableRipple
                aria-label="Sign Out"
                className={classes.lgelem}
                onClick={()=>setViewDetails(false)}
              >
                <KeyboardBackspaceIcon fontSize="large" />
              </Button>
            </header>
            <div className="detailsDiv">
              <h3 className="detailsDivh">{entry?.title}</h3>
              <p className="para">{entry?.content}</p>
              <div className="btzDiv">
                <Button
                  variant="contained"
                  className="buttonZ"
                  onClick={()=>dispatch(setCanEdit(true))}
                >
                  < EditIcon/>
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
      :
        <Editor/>
      }
    
    </div>
  );
};

export default DiaryEntriesList;