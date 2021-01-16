// Imports
// React Imports
import React, { FC, useState, useRef} from 'react';
// Formik Imports
import { Formik, Field, Form, ErrorMessage } from 'formik';
// Yup imports
import * as Yup from 'yup';
// Materail Ui Imports
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
// Interface Imports
import { User } from '../../interfaces/user.interface';
// Store Imports
import { useAppDispatch } from '../../store';
// Api imports
import http from "../../services/api";
// Routes Import
import { AuthResponse } from "../../services/mirage/routes/user";
// Reducer actions
import { saveToken, setAuthState } from "./authSlice";
import { setUser } from "./userSlice";

// initial Values Declaration
const initialValues: User = {
    username: '',
    email: '',
    password: '',
    diaryIds: null,
}

// Authentication form
const Auth: FC = () => {
    // use states for login and setup
    const [isLogin, setIsLogin] = useState(true);
    // use displatch to use store functions
    const dispatch = useAppDispatch();
    // check for loading
    const [loading, setLoading] = useState(false);
    let userNameInput : any | null = useRef(null);
    let passwordInput : any | null = useRef(null);
    let emailInput : any | null = useRef(null);
    return (
        <div className="slContainer">
            <div className="steperContainer">
                <Formik
                    // inital state
                    initialValues={initialValues}
                    // Form validation
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .required('What? No username?')
                            .max(16, 'Username cannot be longer than 16 characters.')
                            .min(3, 'Username cannot be smaller than 3 characters.'),
                        password: Yup.string()
                            .min(4, 'Password must be 4 characters long. ')
                            .required('Without a password, "None shall pass!"'),
                        email: Yup.string()
                            .email("Invalid Email address")
                    })}
                    // onSubmit function
                    onSubmit={(values, {resetForm}) => {
                        setLoading(true)
                        const path = isLogin ? "/auth/login" : "/auth/signup";
                        http
                            .post<User, AuthResponse>(path, values)
                            .then((res) => {
                                if (res) {
                                    const { user, token } = res;
                                    dispatch(saveToken(token));
                                    dispatch(setUser(user));
                                    isLogin ? dispatch(setAuthState(true)) : dispatch(setAuthState(false));
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                            .finally(() => {
                                if (isLogin) {
                                    resetForm()
                                    setLoading(false)
                                    resetForm()
                                } else {
                                    setIsLogin(!isLogin)
                                    setLoading(false)
                                    resetForm()
                                }
                            });
                    }}
                >
                    < Form className="formControl">
                        <div className="fieldsDiv">
                            <Field
                                as={TextField}
                                variant="outlined"
                                className="fields"
                                name="username"
                                label="UserName *"
                                autoComplete="off"
                                inputRef={userNameInput}
                                helperText={<ErrorMessage name="username">{msg => <span className="error">{msg}</span>}</ErrorMessage>}
                            />
                        </div>
                        <div className="fieldsDiv">
                            <Field
                                as={TextField}
                                variant="outlined"
                                className="fields"
                                type="password"
                                name="password"
                                label="Password *"
                                autoComplete="off"
                                inputRef={passwordInput}
                                helperText={<ErrorMessage name="password">{msg => <span className="error">{msg}</span>}</ErrorMessage>}
                            />
                        </div>
                        {/* Shows email form when only singing up */}
                        {!isLogin && (
                            <div className="fieldsDiv email">
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    className="fields"
                                    name="email"
                                    label="Email (optional)"
                                    autoComplete="off"
                                    inputRef={emailInput}
                                    helperText={<ErrorMessage name="email">{msg => <span className="error">{msg}</span>}</ErrorMessage>}
                                />
                            </div>
                        )}
                        <div className="btnDiv">
                            <Button
                                variant="contained"
                                className="buttonN"
                                disabled={loading}
                                type="submit"
                            >
                                {isLogin ? "Login" : "SignUP"}
                            </Button>
                        </div>
                        <p
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ cursor: 'pointer', opacity: 0.7, textAlign: 'center' }}
                        >
                            {isLogin ? 'No account? Create one' : 'Already have an account?'}
                        </p>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}

export default Auth;