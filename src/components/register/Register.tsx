import React from 'react';
import { useForm } from 'react-hook-form';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import firebase from '../Firebase/firebase';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '85vh',
    },
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface RegisterFormObject {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function Register(): JSX.Element {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm<RegisterFormObject>();
    const onSubmit = (data: RegisterFormObject) => {
        firebase.createUser(data.email, data.password, data.firstName, data.lastName);
    };

    // This is redundant, but when I tried to use the FirebaseWrapper member function directly I got an error saying `this` is undefined
    const emailIsUnique = async (email: string) => {
        return await !firebase.userAlreadyExists(email);
    };
    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                inputRef={register({ required: true, maxLength: 19 })}
                            />
                            {errors.firstName && errors.firstName.type === 'required' && (
                                <Typography color="error" className="error">
                                    Required
                                </Typography>
                            )}

                            {errors.firstName && errors.firstName.type === 'maxLength' && (
                                <Typography color="error" className="error">
                                    Too Long
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                inputRef={register({ required: true, maxLength: 19 })}
                            />
                            {errors.lastName && errors.lastName.type === 'required' && (
                                <Typography color="error" className="error">
                                    Required
                                </Typography>
                            )}

                            {errors.lastName && errors.lastName.type === 'maxLength' && (
                                <Typography color="error" className="error">
                                    Too Long
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputRef={register({
                                    required: true,
                                    maxLength: 39,
                                    validate: emailIsUnique,
                                })}
                            />
                            {errors.email && errors.email.type === 'required' && (
                                <Typography color="error" className="error">
                                    Required
                                </Typography>
                            )}

                            {errors.email && errors.email.type === 'maxLength' && (
                                <Typography color="error" className="error">
                                    Too Long
                                </Typography>
                            )}

                            {errors.email && errors.email.type === 'validate' && (
                                <Typography color="error" className="error">
                                    Account Exists
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={register({ required: true, minLength: 6 })}
                            />
                            {errors.password && errors.password.type === 'required' && (
                                <Typography color="error" className="error">
                                    Required
                                </Typography>
                            )}

                            {errors.password && errors.password.type === 'minLength' && (
                                <Typography color="error" className="error">
                                    Too Short
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
