import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { fetchUsers } from '../../api/index';

const initialForm = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '',};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleSignup = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            const { data } = await fetchUsers();
            console.log(data)
            if (data.filter(user => user.email === result.email).length > 0) {
                console.log('signin')
                dispatch(signin({
                    email: result.email,
                    password: result.googleId
                }, history))
            } else {
                console.log('signup')
                dispatch(signup({
                    firstName: result.givenName,
                    lastName: result.familyName,
                    email: result.email,
                    password: result.googleId,
                    confirmPassword: result.googleId
                }, history))
            }
            // dispatch({ type: 'AUTH', data: { result, token }});

            // history.push('/');
        } catch (error) {
            console.log(error)
        }
    };

    const googleFailure = async (error) => {
        console.log(error);
        console.log("Google Sign In unsuccessful.");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            clientId='304299194324-ktrfu2mdfkqjpov4rprmfkqu1laaoqdn.apps.googleusercontent.com' //after deploying, add url here: https://console.cloud.google.com/apis/credentials?project=takemeback-308402&supportedpurview=project . no need to hide because urls are restricted
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                    Sign in with Google
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy='single_host_origin'
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={toggleSignup}>
                                    { isSignup ? 'Already have an account? Sign in' : 'Sign up for an account'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
