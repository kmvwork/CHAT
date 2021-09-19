import React, {useState} from 'react';
import {Formik} from 'formik'
import * as yup from 'yup'
import {Avatar, Button, ButtonGroup, Icon, Link, TextField} from "@material-ui/core"
import {ToastContainer, toast} from 'react-toastify'

import user from '../../img/form/user.svg'

import styles from './Login.module.css'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const validationsSchema = yup.object().shape({
        password: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения').min(4, 'Минимальная длина пароля 4 символа').max(15, 'Максимальная длина пароля 15 символов').matches(/(?=.*[!@#$%^&*])/, 'Пароль должен содержать минимум один спецсимвол: !@#$%^&*'),
        email: yup.string().email('Введите верный email').required('Поле обязательно для заполнения')
    })

    const [send, setSend] = useState(false)

    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    email: '',
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {
                    setSend(true)
                    toast.success(' Вход в систему!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    resetForm()
                }}
                validationSchema={validationsSchema}
            >
                {({
                      values, errors, touched,
                      handleChange, handleBlur,
                      isValid, handleSubmit, dirty
                  }) => (
                    <div className={styles.form}>
                        <div>
                            <Avatar className={styles.userLoginImg} alt="USER" src={user}/>
                        </div>

                        <div className={styles.field}>
                            <TextField label="Email"
                                       type='text'
                                       name='email'
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.email}
                            />
                        </div>
                        {touched.email && errors.email && <p className={styles.error}>{errors.email}</p>}

                        <div className={styles.field}>
                            <TextField label="Пароль"
                                       type='password'
                                       name='password'
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.password}
                            />
                        </div>
                        {touched.password && errors.password && <p className={styles.error}>{errors.password}</p>}

                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            toastStyle={{backgroundColor: "#4F4FD9", color: '#eee'}}
                        />

                        <div className={styles.btn}>
                            <Button variant="contained"
                                    disabled={!isValid || !dirty}
                                    onClick={handleSubmit}
                                    type='submit'
                                    color='primary'
                                    endIcon={<Icon>login</Icon>}
                                    size={'large'}
                                    classes={styles.btn}
                            >
                                Войти
                            </Button>
                            <ButtonGroup className={styles.linkBtnGroup} variant="outlined" aria-label="outlined button group">
                                <Link  className={styles.linkBtn} href="#" color="inherit">
                                    Забыли пароль?
                                </Link>
                                <Link className={styles.linkBtn} href="#" color="inherit">
                                    Регистрация
                                </Link>
                            </ButtonGroup>
                        </div>

                    </div>
                )}
            </Formik>
        </div>
    );
};

export default Login;