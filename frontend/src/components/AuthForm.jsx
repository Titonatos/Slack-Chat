import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import {
    Card,
    Col,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Row,
    Button,
    FloatingLabel,
  } from 'react-bootstrap';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
      inputRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
          username: Yup.string()
            .typeError(t('required'))
            .required(t('required')),
          password: Yup.string()
            .typeError(t('required'))
            .required(t('required')),
        }),
        onSubmit: async (values) => {
          try {
            const res = await axios.post('/api/v1/login', values);
            localStorage.setItem('userId', JSON.stringify(res.data));
            navigate("/");
          } catch (error) {
            formik.setSubmitting(false);
            if (error.isAxiosError && error.response.status === 401) {
              
              inputRef.current.select();
              return;
            }
              throw error;
            }            
        },
    });
    
    return (
        <>
            <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={'username'}>
                      <Form.Control
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder="username"
                        name="username"
                        id="username"
                        autoComplete="username"
                        required
                        ref={inputRef}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel label={'password'}>
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        placeholder="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        required
                      />
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">{'noValidUsername'}</Form.Control.Feedback>
                  </Form.Group>
                <Button className="w-100 mb-3 btn btn-outline-primary" type="submit">Войти</Button>
            </Form>
        </>
    )
}

export default Login;