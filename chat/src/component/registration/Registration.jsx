import React, {useState} from 'react';
import {Formik} from 'formik'
import * as yup from 'yup'
import {Button, Icon, TextField} from "@material-ui/core"
import {ToastContainer, toast} from 'react-toastify'

import styles from './Registration.module.css'
import 'react-toastify/dist/ReactToastify.css'

const Registration = () => {
    const validationsSchema = yup.object().shape({
        name: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения'),
        secondName: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения'),
        password: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения').min(4, 'Минимальная длина пароля 4 символа').max(15, 'Максимальная длина пароля 15 символов').matches(/(?=.*[!@#$%^&*])/, 'Пароль должен содержать минимум один спецсимвол: !@#$%^&*'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Поле обязательно для заполнения'),
        email: yup.string().email('Введите верный email').required('Поле обязательно для заполнения'),
    })

    const [send, setSend] = useState(false)

    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    secondName: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    confirmEmail: ''
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {
                    setSend(true)
                    toast.success('🎯 Данные успешно отправленны! Вы зарегистрированы!', {
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
                            <h3 className={styles.formTitle}>Регистрация</h3>
                        </div>

                        <div className={styles.field}>
                            <TextField label="Имя"
                                       error={false}
                                       type='text'
                                       name='name'
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.name}
                            />
                        </div>
                        {touched.name && errors.name && <p className={styles.error}>{errors.name}</p>}

                        <div className={styles.field}>
                            <TextField label="Фамилия"
                                       type='text'
                                       name='secondName'
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.secondName}
                            />
                        </div>
                        {touched.secondName && errors.secondName &&
                        <p className={styles.error}>{errors.secondName}</p>}

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

                        <div className={styles.field}>
                            <TextField label="Подтверждение пароля"
                                       type='password'
                                       name='confirmPassword'
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.confirmPassword}
                            />
                        </div>
                        {touched.confirmPassword && errors.confirmPassword &&
                        <p className={styles.error}>{errors.confirmPassword}</p>}

                        {send && <p className={styles.success}>Данные успешно отправлены.</p>}

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
                            toastClassName="dark-toast"
                            toastStyle={{ backgroundColor: "#4F4FD9",  color: '#eee', }}
                        />

                        <div className={styles.btn}>
                            <Button variant="contained"
                                    disabled={!isValid || !dirty}
                                    onClick={handleSubmit}
                                    type='submit'
                                    color='primary'
                                    endIcon={<Icon>send</Icon>}
                            >
                                Зарегестрироваться
                            </Button>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default Registration;