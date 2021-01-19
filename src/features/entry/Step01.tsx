// Imports
// React Imports
import React from 'react';
// Formik and Yup Imports
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Material Ui Imports
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CancelIcon from '@material-ui/icons/Cancel';
// Store and reducer Actions
import { setCanEdit } from '../entry/editorSlice';
import { useAppDispatch } from '../../store';

// Types Defination
type Props = {
    submit: any;
    setFormValues: any;
    prevValues: any;
    updateEditedEntry: any;
    editedEntry: any
};

export const Step01: React.FC<Props> = ({ submit, setFormValues, prevValues, updateEditedEntry, editedEntry }) => {
    // use dispatch from store
    const dispatch = useAppDispatch();
    // Page Return
    return (
        <div>
            <Formik
                initialValues={prevValues}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .min(3, 'Must be 3 characters or more')
                        .max(15, 'Must be 15 characters or less')
                        .required('Title is required'),
                    content: Yup.string()
                        .min(3, 'Must be 3 characters or more')
                        .required('Content is required'),
                })}
                onSubmit={(values) => {
                    submit(1)
                    setFormValues({ ...prevValues, ...values })
                    updateEditedEntry({
                        ...editedEntry,
                        title: values.title,
                        content: values.content,
                    });
                }}
            >
                < Form className="formControl1">
                    <div className="fieldsDiv1">
                        <Field
                            as={TextField}
                            variant="outlined"
                            className="fields"
                            name="title"
                            label="Title"
                            helperText={<ErrorMessage name="title">{msg => <span className="error">{msg}</span>}</ErrorMessage>}
                        />
                    </div>
                    <div className="fieldsDiv2">
                        <Field
                            as={TextareaAutosize}
                            rowsMin={4}
                            rowsMax={4}
                            variant="outlined"
                            className="fields"
                            placeholder="Enter Content for this Entry"
                            required
                            name="content"
                            label="Content"
                        />
                    </div>
                    <div className="btnDivF">
                        <Button
                            style={{ color: "white" }}
                            variant="contained"
                            className="buttonFB"
                            onClick={() => dispatch(setCanEdit(false))}
                        >
                            <CancelIcon />
                        </Button>
                        <Button
                            style={{ color: "white" }}
                            variant="contained"
                            className="buttonFF"
                            type="submit"
                        >
                            <KeyboardArrowRightIcon />
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}