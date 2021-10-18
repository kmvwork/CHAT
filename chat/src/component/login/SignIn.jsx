import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Lock from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import * as yup from "yup";
import {useEffect, useState} from "react";
import {Formik} from "formik";
import {toast, ToastContainer} from "react-toastify";

import styles from "./SignIn.module.css";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../redux/userSlice";

import 'react-toastify/dist/ReactToastify.css';
import {Alert} from "@mui/material";

import {
    Link, useHistory
} from "react-router-dom";
import {loginUserAsync} from "../../sagas";
import {getData, getDataSnapshot} from "../../services/getDatabase";


const theme = createTheme();

export default function SignIn() {

    const validationsSchema = yup.object().shape({
        password: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения'),
        email: yup.string().email('Введите верный email').required('Поле обязательно для заполнения')
    })

    const [rememberUser, setRememberUser] = useState(false)

    const selector = useSelector(store => store.user)
    const errorLogin = useSelector(store => store.user.userSignInError.error)
    const userLogged = useSelector(store => store.user.userLogged)

    const dispatch = useDispatch()

    let history = useHistory();

    useEffect(() => {
        // if (localStorage.getItem('uid') === selector.currentUser.uid) {
        if (localStorage.getItem('uid') ) {
            console.log('TRRRUEEE')
            setTimeout(() => {
                history.push('/chat')
            }, 3000)
        }
    }, [])

// else if (selector.currentUser.uid) {
//         console.log('UUUU', localStorage.getItem('uid'))
//         history.push('/chat')
//     }

    useEffect(() => {
        setTimeout(() => {
            if (selector.currentUser.uid) {
                console.log('UUUU', localStorage.getItem('uid'))
                history.push('/chat')

                getData(selector.currentUser.uid)
            }
        }, 3000)
        // getDataSnapshot(selector.currentUser.uid)


    }, [selector.currentUser.uid])

    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    email: '',
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {

                    values.remember = rememberUser
                    console.log('V', values)

                    dispatch(loginUserAsync(values))
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
                                    Вход в систему
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
                                        label="Password"
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

                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary"/>}
                                        className={styles.formRemember}
                                        label="Запомнить меня"
                                        defaultChecked={rememberUser}
                                        onChange={() => setRememberUser(!rememberUser)}
                                    />

                                    {
                                        userLogged ? <Alert variant="filled" severity="success">
                                            Вы успешно вошли!
                                        </Alert> : null
                                    }
                                    {
                                        errorLogin ? <Alert variant="filled" severity="error">
                                            Не удалось войти - не верный логин или пароль!
                                        </Alert> : null
                                    }

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                        onClick={handleSubmit}
                                    >
                                        Войти
                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            <Link to='/passwordChange' variant="body2" className={styles.formLink}>
                                                Забыли пароль?
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