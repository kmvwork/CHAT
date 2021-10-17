import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Lock from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import * as yup from "yup";
import {useState} from "react";
import {Formik} from "formik";
import {ToastContainer} from "react-toastify";
import styles from "./PasswordChange.module.css";
import {useDispatch, useSelector} from "react-redux";
import {passwordChange} from "../../redux/userSlice";

import 'react-toastify/dist/ReactToastify.css';
import {Alert} from "@mui/material";

import {
    Link, useHistory
} from "react-router-dom";
import Grid from "@mui/material/Grid";

const theme = createTheme();

export default function PasswordChange() {

    const validationsSchema = yup.object().shape({
        password: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения').min(4, 'Минимальная длина пароля 4 символа').max(15, 'Максимальная длина пароля 15 символов').matches(/(?=.*[!@#$%^&*])/, 'Пароль должен содержать минимум один спецсимвол: !@#$%^&*'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Поле обязательно для заполнения'),
        email: yup.string().email('Введите верный email').required('Поле обязательно для заполнения')
    })

    const [send, setSend] = useState(false)
    const [newPassword, setNewPassword] = useState(false)
    const [errorChangePassword, setErrorChangePassword] = useState(false)

    const selector = useSelector(store => store.user)

    const dispatch = useDispatch()

    let history = useHistory();


    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    email: '',
                    confirmPassword: ''
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {

                    const changeUser = selector.users.filter(item => {
                        return item.email === values.email
                    })

                    if (changeUser.length) {
                        setNewPassword(true)
                        setErrorChangePassword(false)
                        dispatch(passwordChange(values))
                    } else {
                        setErrorChangePassword(true)
                    }

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
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                    <Lock/>
                                </Avatar>
                                <Typography className={styles.formTitle} component="h1" variant="h5">
                                    Смена пароля
                                </Typography>

                                <Box component="form" noValidate sx={{mt: 1}}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
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
                                        label="Новый пароль"
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

                                    {
                                        newPassword ? <Alert variant="filled" severity="success">
                                            Пароль успешно был изменен! Войдите в систему
                                            <div>
                                                <Link to="/">Войти</Link>
                                            </div>
                                        </Alert> : null

                                    }
                                    {
                                        errorChangePassword ? <Alert variant="filled" severity="error">
                                            Пользователь с таким Email не найден.
                                            Перейдите на страницу Регистрации
                                            <div>
                                                <Link to="/signup">Перейти</Link>
                                            </div>
                                        </Alert> : null
                                    }

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                        onClick={handleSubmit}
                                    >
                                        Сменить пароль
                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            <Link to='/' variant="body2" className={styles.formLink}>
                                                Вход в систему
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/signup" variant="body2" className={styles.formLink}>
                                                Регистрация
                                            </Link>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                )}
            </Formik>
        </div>

    );
}