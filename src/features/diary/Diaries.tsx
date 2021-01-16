// Imports
// react Imports
import React, { useState, useEffect } from 'react';
// Material Ui Imports
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
// Api Imports
import http from '../../services/api';
// Interface Imports
import { Diary } from '../../interfaces/diary.interface';
import { User } from '../../interfaces/user.interface';
// react redux imports
import { useSelector } from 'react-redux';
// Store Imports
import { useAppDispatch } from '../../store';
// Reducer imports
import { RootState } from '../../rootReducer';
// DayJs Imports
import dayjs from 'dayjs';
// Reducer actions imports
import { addDiary } from './diariesSlice';
import { setUser } from '../auth/userSlice';
// Formik Imports
import { Formik, Field, Form, ErrorMessage } from 'formik';
// Yup imports
import * as Yup from 'yup';

// initial Values Declaration
const initialValues: Diary = {
    title: '',
    type: "private",
    entryIds: null,
}


export const Diaries = () => {
    // use state to open and close create diaries form
    const [openN, setOpenN] = useState(false);
    // use selecter for selecting user and diaries
    const user = useSelector((state: RootState) => state.user);
    const diaries = useSelector((state: RootState) => state.diaries);
    // use dispatch for using reducer actions
    const dispatch = useAppDispatch();
    // fetch diaries on page load, user change or reducer action
    useEffect(() => {
        const fetchDiaries = async () => {
            if (user) {
                http.get<null, Diary[]>(`diaries/${user.id}`).then((data) => {
                    if (data && data.length > 0) {
                        const sortedByUpdatedAt = data.sort((a, b) => {
                            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
                        });
                        dispatch(addDiary(sortedByUpdatedAt));
                    }
                });
            }
        };
        fetchDiaries();
    }, [dispatch, user]);
    return (
        <div>
            {/* Home Page */}
            {openN === false ?
                <div className="cndContainer">
                    <div className="cdnDiv">
                        <div className="cBtnDiv">
                            <Button
                                variant="contained"
                                className="buttonN"
                                onClick={()=>setOpenN(true)}
                            >
                                Create New Diary
                            </Button>
                        </div>
                    </div>
                </div>
            :
                // Editor to add new diary
                <div>
                    <div className="cndContainer">
                        <div className="steperContainer">
                        <h2>Create Diary</h2>
                        <Formik
                            // inital state
                            initialValues={initialValues}
                            // Form validation
                            validationSchema={Yup.object({
                                title: Yup.string()
                                    .required('Title is Required')
                                    .max(16, 'Title cannot be longer than 16 characters.')
                                    .min(3, 'Title cannot be smaller than 3 characters.'),
                                type: Yup.string()
                                    .required("Kindly Speicfy Type")
                            })}
                            // onSubmit function
                            onSubmit={(values) => {
                                const createDiary = async () => {
                                    if (values) {
                                        const { diary, user: _user } = await http.post<Partial<Diary>, { diary: Diary; user: User }>
                                        ('/diaries/', {
                                            title: values.title,
                                            type: values.type,
                                            userId: user?.id,
                                        });
                                        if (diary && user) {
                                            dispatch(addDiary([diary] as Diary[]));
                                            dispatch(addDiary([diary] as Diary[]));
                                            dispatch(setUser(_user));
                                        }
                                    }
                                    setOpenN(false)
                                };
                                createDiary()
                            }}
                        >
                            < Form className="formControl">
                                <div className="fieldsDiv">
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        className="fields"
                                        name="title"
                                        label="Title *"
                                        autoComplete="off"
                                        helperText={<ErrorMessage name="title">{msg => <span className="error">{msg}</span>}</ErrorMessage>}
                                    />
                                </div>
                                <div className="divG">
                                    <div>Type</div>
                                    <div role="group" className="fieldsG">
                                        <label>
                                            <Field type="radio" name="type" value="private" />
                                            Private
                                        </label>
                                        <label>
                                            <Field type="radio" name="type" value="public" />
                                            Public
                                        </label>
                                    </div>
                                </div>
                                <div className="btnDiv">
                                    <Button
                                        variant="contained"
                                        className="buttonN"
                                        type="submit"
                                    >
                                        Create
                                    </Button>
                                </div>
                                <div className="btnDiv">
                                    <Button
                                        variant="contained"
                                        className="buttonN"
                                        onClick={()=>setOpenN(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div >
            </div>}
        </div>
    )
}