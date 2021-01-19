// Imports
// React Imports
import React from 'react';
// Formik and Yup Imports
import { Formik, Field, Form } from 'formik';
// Materail Ui Imports
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
// Reducer actions
import { setCurrentlyEditing, setCanEdit } from './editorSlice';
import { updateDiary } from '../diary/diariesSlice';
import { updateEntry } from './entriesSlice';
// Types Imports
import { Entry } from '../../interfaces/entry.interface';
import { Diary } from '../../interfaces/diary.interface';
// Store Imports
import { useAppDispatch } from '../../store';
// Api Imports
import http from '../../services/api';
// Alerts Imports
import { showAlert } from '../../util';

// Types Defination
type Props = {
  submit: any;
  prevValues: any;
  setFormValues: any;
  activeDiaryId: any;
  entry: any;
  editedEntry: any;
};

export const Step02: React.FC<Props> = ({ submit, prevValues, setFormValues, activeDiaryId, entry, editedEntry }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Formik
        initialValues={prevValues}
        onSubmit={(values, { resetForm }) => {
          submit(0)
          const saveEntry = async () => {
            if (activeDiaryId == null) {
              return showAlert('Please select a diary.', 'warning');
            }
            if (entry == null) {
              http
                .post<Entry, { diary: Diary; entry: Entry }>(
                  `/diaries/entry/${activeDiaryId}`,
                  editedEntry
                )
                .then((data) => {
                  if (data != null) {
                    const { diary, entry: _entry } = data;
                    dispatch(setCurrentlyEditing(_entry));
                    dispatch(updateDiary(diary));
                  }
                });
            } else {
              http
                .put<Entry, Entry>(`diaries/entry/${entry.id}`, editedEntry)
                .then((_entry) => {
                  if (_entry != null) {
                    dispatch(setCurrentlyEditing(_entry));
                    dispatch(updateEntry(_entry));
                  }
                });
            }
            dispatch(setCanEdit(false));
          };
          saveEntry()
        }}
      >
        < Form className="formControl1">
          <div className="fieldsDiv1">
            <Field label="Title" value={prevValues.title} as={TextField} variant="outlined" className="fields" disabled />
          </div>
          <div className="fieldsDiv">
            <Field label="Content" value={prevValues.content} as={TextareaAutosize} rowsMin={4} rowsMax={4} variant="outlined" className="fields" disabled />
          </div>
          <div className="btnDivF">
            <Button
              variant="contained"
              className="buttonFE"
              onClick={() => { submit(0) }}
            >
              <EditIcon />
            </Button>
            <Button
              style={{ color: "white" }}
              variant="contained"
              className="buttonFB"
              onClick={() => dispatch(setCanEdit(false))}
            >
              <CancelIcon />
            </Button>
            <Button
              variant="contained"
              style={{ color: "white" }}
              className="buttonFF"
              type="submit"
            >
              <SaveIcon />
            </Button>
          </div>
        </Form>
      </Formik>
    </div >
  )
}