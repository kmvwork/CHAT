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
// import styles from "./Login.module.css";
import {Alert} from "@mui/material";


const theme = createTheme();

export default function SignIn() {

    const validationsSchema = yup.object().shape({
        password: yup.string().typeError('Должно быть строкой').required('Поле обязательно для заполнения').min(4, 'Минимальная длина пароля 4 символа').max(15, 'Максимальная длина пароля 15 символов').matches(/(?=.*[!@#$%^&*])/, 'Пароль должен содержать минимум один спецсимвол: !@#$%^&*'),
        email: yup.string().email('Введите верный email').required('Поле обязательно для заполнения')
    })

    const [send, setSend] = useState(false)

    const helperText = 'HELP'

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
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="sm">
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
                                    <Lock/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
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
                                        error={touched.email && errors.email}
                                        helperText={errors.email}
                                        variant="filled"
                                    />
                                    {/*{touched.email && errors.email &&*/}
                                    {/*<Alert variant="filled" severity="error">{errors.email}</Alert>}*/}
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
                                        error={touched.password && errors.password}
                                        helperText={errors.password}
                                        variant="filled"
                                    />
                                    {/*{touched.password && errors.password &&*/}
                                    {/*<Alert variant="filled" severity="error">{errors.password}</Alert>}*/}

                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary"/>}
                                        label="Remember me"
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                        onClick={handleSubmit}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                )}
            </Formik>

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
        </div>
        // <ThemeProvider theme={theme}>
        //     <Container component="main" maxWidth="xs">
        //         <CssBaseline />
        //         <Box
        //             sx={{
        //                 marginTop: 8,
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        //                 <Lock />
        //             </Avatar>
        //             <Typography component="h1" variant="h5">
        //                 Sign in
        //             </Typography>
        //             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        //                 <TextField
        //                     margin="normal"
        //                     required
        //                     fullWidth
        //                     id="email"
        //                     label="Email Address"
        //                     name="email"
        //                     autoComplete="email"
        //                     autoFocus
        //                 />
        //                 <TextField
        //                     margin="normal"
        //                     required
        //                     fullWidth
        //                     name="password"
        //                     label="Password"
        //                     type="password"
        //                     id="password"
        //                     autoComplete="current-password"
        //                 />
        //                 <FormControlLabel
        //                     control={<Checkbox value="remember" color="primary" />}
        //                     label="Remember me"
        //                 />
        //                 <Button
        //                     type="submit"
        //                     fullWidth
        //                     variant="contained"
        //                     sx={{ mt: 3, mb: 2 }}
        //                 >
        //                     Sign In
        //                 </Button>
        //                 <Grid container>
        //                     <Grid item xs>
        //                         <Link href="#" variant="body2">
        //                             Forgot password?
        //                         </Link>
        //                     </Grid>
        //                     <Grid item>
        //                         <Link href="#" variant="body2">
        //                             {"Don't have an account? Sign Up"}
        //                         </Link>
        //                     </Grid>
        //                 </Grid>
        //             </Box>
        //         </Box>
        //     </Container>
        // </ThemeProvider>
    );
}