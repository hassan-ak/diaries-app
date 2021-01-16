import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CancelIcon from '@material-ui/icons/Cancel';
import { setCanEdit } from '../entry/editorSlice';
import { useAppDispatch } from '../../store';

// Types Defination
type Props = {
    submit: any;
    setFormValues: any;
    prevValues:any;
    updateEditedEntry:any;
    editedEntry: any
};

export const Step01: React.FC<Props> = ({ submit, setFormValues,prevValues,updateEditedEntry,editedEntry}) => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <Formik
                initialValues={prevValues}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .min(3, 'Must be 3 characters or more')
                        .required('Title is required'),
                    content: Yup.string()
                        .min(3, 'Must be 3 characters or more')
                        .required('Content is required'),
                })}
                onSubmit={(values) => {
                    submit(1)
                    setFormValues({...prevValues,...values})
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
                                    variant="contained"
                                    className="buttonF"
                                    onClick={()=>dispatch(setCanEdit(false))}
                                >
                                    <CancelIcon/>
                                </Button>
                                <Button
                                    variant="contained"
                                    className="buttonF"
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