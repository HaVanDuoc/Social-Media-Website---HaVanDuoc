import React from 'react';
import * as Yup from 'yup';
import { LoginCall } from '../../../api/CallApi';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { selectorError } from '../../../redux/reducers/AuthReducer.js';
import { CloseModalLogin } from '../../../redux/actions/ModalAction.js';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { FormRegister as FormRegisterAction } from '../../../redux/actions/SignInOutAction.js';

function FormLogin() {
    const error = useSelector(selectorError);
    const dispatch = useDispatch();

    const initialValues = {
        username: '',
        password: '',
    };

    const handleSignUpNow = () => {
        dispatch(FormRegisterAction());
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().email('*Định dạng email sai').required('*Không được để trống email'),
        password: Yup.string().required('*Mật khẩu không được để trống'),
    });

    const onSubmit = (values, props) => {
        setTimeout(() => {
            LoginCall({ email: values.username, password: values.password }, dispatch);           
            props.resetForm();
            props.setSubmitting(false);
            // if there is no error then close the modal and vice versa
            if (error === false) {
                dispatch(CloseModalLogin());
                window.location.reload()
            } else {
                console.log('Đăng nhập thất bại');
            }
        }, 2000);
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    '.MuiFormHelperText-root': {
                        color: 'red',
                        fontSize: 15,
                    },
                }}
            >
                <Box textAlign="center" margin="10px 0">
                    <Typography fontSize="25px" sx={{ pointerEvents: 'none' }}>
                        Đăng nhập
                    </Typography>
                </Box>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field
                                as={TextField}
                                label="Tên đăng nhập/Email"
                                name="username"
                                type="text"
                                fullWidth
                                required
                                helperText={<ErrorMessage name="username" />}
                                sx={{ margin: '10px 0' }}
                            />
                            <Field
                                as={TextField}
                                label="Mật khẩu"
                                name="password"
                                type="password"
                                fullWidth
                                required
                                helperText={<ErrorMessage name="password" />}
                                sx={{ margin: '10px 0' }}
                            />
                            <Field
                                as={Button}
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={props.isSubmitting}
                                sx={{ margin: '10px 0' }}
                            >
                                {props.isSubmitting ? 'Đang tải...' : 'Đăng nhập'}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '10px 0',
                }}
            >
                <Link href="#" underline="none" onClick={(e) => e.preventDefault()}>
                    Gặp khó khăn
                </Link>
                <Link href="#" underline="none" onClick={handleSignUpNow}>
                    Đăng ký ngay
                </Link>
            </Box>
        </React.Fragment>
    );
}

export default FormLogin;
