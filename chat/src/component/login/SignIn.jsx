import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Lock from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import * as yup from "yup";
import {useState} from "react";
import {Formik} from "formik";
import {toast, ToastContainer} from "react-toastify";
import styles from "./SignIn.module.css";
import {useDispatch, useSelector} from "react-redux";
import {add, signIn, signUp} from "../../redux/userSlice";

import 'react-toastify/dist/ReactToastify.css';
import {Alert} from "@mui/material";

const theme = createTheme();

export default function SignIn() {

    const validationsSchema = yup.object().shape({
        password: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения'),
        email: yup.string().email('Введите верный email').required('Поле обязательно для заполнения')
    })

    const [send, setSend] = useState(false)
    const [login, setLogin] = useState(false)
    const [errorLogin, setErrorLogin] = useState(false)

    const selector = useSelector(store => store.user)
    console.log(selector)

    const dispatch = useDispatch()

    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    email: '',
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {

                    for(let user of selector.users) {
                        if(user.email === values.email && user.password === values.password) {
                            dispatch(signIn(values))
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
                            setLogin(true)
                            setErrorLogin(false)
                            resetForm()
                        } else {
                            console.log('NOT USER')
                            setErrorLogin(true)
                            setLogin(false)
                        }
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
                                        autoFocus
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
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                        onClick={handleSubmit}
                                    >
                                        Войти
                                    </Button>
                                    {
                                        login ? <Alert variant="filled" severity="success">
                                            Вы успешно вошли!
                                        </Alert> : null
                                    }
                                    {
                                        errorLogin ? <Alert variant="filled" severity="error">
                                            Не удалось войти - не верный логин или пароль!
                                        </Alert> : null
                                    }
                                    {/*<Alert className={login ? styles.hiddenAlert} variant="filled" severity="error">*/}
                                    {/*    Не удалось войти - не верный логин или пароль!*/}
                                    {/*</Alert>*/}
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2" className={styles.formLink}>
                                                Забыли пароль?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2" className={styles.formLink}>
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