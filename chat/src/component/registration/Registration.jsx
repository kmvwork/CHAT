import React, {useState} from 'react';
import {Formik} from 'formik'
import * as yup from 'yup'
import {
    Avatar,
    Box,
    Button,
    Container, createTheme,
    CssBaseline,
    TextField,
    Typography,
    ThemeProvider
} from "@material-ui/core"
import {ToastContainer, toast} from 'react-toastify'
import {Link} from "react-router-dom";


import 'react-toastify/dist/ReactToastify.css'
import AddToQueue from "@material-ui/icons/AddToQueue";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../redux/userSlice";
import {Alert} from "@mui/material";
import Grid from "@mui/material/Grid";

import styles from './Registration.module.css'
import {registrationUserAsync} from "../../sagas";


const Registration = ({onAddUser}) => {
    const validationsSchema = yup.object().shape({
        name: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения'),
        secondName: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения'),
        password: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения').min(6, 'Минимальная длина пароля 6 символов').max(15, 'Максимальная длина пароля 15 символов').matches(/(?=.*[!@#$%^&*])/, 'Пароль должен содержать минимум один спецсимвол: !@#$%^&*'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Поле обязательно для заполнения'),
        email: yup.string().email('Введите верный email').required('Поле обязательно для заполнения'),
    })

    const [send, setSend] = useState(false)
    const [repeatUser, setRepeatUser] = useState(false)
    const [registration, setRegistration] = useState(false)
    const dispatch = useDispatch()

    const selector = useSelector(store => store.user)

    const theme = createTheme();

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
                    // const repeat = selector.users.filter(item => {
                    //     return item.email === values.email
                    // })
                    //
                    // if (!!repeat.length) {
                    //     setRepeatUser(true)
                    // } else {
                    //     setSend(true)
                    //     toast.success('🎯 Данные успешно отправленны! Вы зарегистрированы!', {
                    //         position: "top-center",
                    //         autoClose: 5000,
                    //         hideProgressBar: false,
                    //         closeOnClick: true,
                    //         pauseOnHover: true,
                    //         draggable: true,
                    //         progress: undefined,
                    //     });
                    //     const value = {...values, uid: new Date().getTime()}
                    //     setRepeatUser(false)
                    //     setRegistration(true)
                    //     dispatch(addUser(value))
                    //
                    //     resetForm()
                    // }
                    dispatch(registrationUserAsync(values))

                }}
                validationSchema={validationsSchema}
            >
                {({
                      values, errors, touched,
                      handleChange, handleBlur,
                      isValid, handleSubmit, dirty
                  }) => (
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                    <AddToQueue/>
                                </Avatar>
                                <Typography className={styles.formTitle} component="h1" variant="h5">
                                    Регистрация
                                </Typography>
                                <Box component="form" noValidate sx={{mt: 1}}>

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Имя"
                                        name="name"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={!!(touched.name && errors.name)}
                                        helperText={errors.name}
                                        variant="filled"
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="secondName"
                                        label="Фамилия"
                                        name="secondName"
                                        autoComplete="secondName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.secondName}
                                        error={!!(touched.secondName && errors.secondName)}
                                        helperText={errors.secondName}
                                        variant="filled"
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        error={!!(touched.email && errors.email)}
                                        helperText={errors.email}
                                        variant="filled"
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Пароль"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        error={!!(touched.password && errors.password)}
                                        helperText={errors.password}
                                        variant="filled"
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Подтвердить пароль"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                        error={!!(touched.confirmPassword && errors.confirmPassword)}
                                        helperText={errors.confirmPassword}
                                        variant="filled"
                                    />

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
                                        toastStyle={{backgroundColor: "#1976d2", color: '#eee', borderRadius: '10px'}}
                                    />

                                    {
                                        repeatUser ? <Alert sx={{mt: 1, mb: 1}} variant="filled" severity="info">
                                            Пользователь с таким Email уже существует!
                                            Перейдите на страницу входа
                                            <div>
                                                <Link to="/">Перейти</Link>
                                            </div>

                                        </Alert> : null
                                    }
                                    {
                                        registration ? <Alert sx={{mt: 1, mb: 1}} variant="filled" severity="info">
                                            Успешная регистрация! Перейдите на страницу входа
                                            <div>
                                                <Link to="/">Перейти</Link>
                                            </div>

                                        </Alert> : null
                                    }

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                        onClick={handleSubmit}
                                        color='primary'
                                    >
                                        Зарегистрироваться
                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            <Link to='/' variant="body2" className={styles.formLink}>
                                                Вход в систему
                                            </Link>
                                        </Grid>
                                        {/*<Grid item>*/}
                                        {/*    <Link to="/signup" variant="body2" className={styles.formLink}>*/}
                                        {/*        Регистрация*/}
                                        {/*    </Link>*/}
                                        {/*</Grid>*/}
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                )}
            </Formik>
        </div>
    );
};

export default Registration;