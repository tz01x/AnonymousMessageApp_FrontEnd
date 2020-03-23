import React, { useState } from 'react';
import Button_my from './button'
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import CircularProgress from '@material-ui/core/CircularProgress';
import CircularProgress from './compunent/circularProgressl';
const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            color: 'white'
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
        "& .MuiInputBase-input": {
            //input field text 
            color: 'white',

        },
        "&:hover .MuiInputBase-input": {
            borderColor: "white"
        },
        "& label.Mui-focused": {
            color: "white"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "pink"
        },
        "& .MuiInput-underline.Mui-error:after": {
            borderBottomColor: 'red',
        },
        //   for full border 
        "&.Mui-focused fieldset": {
            borderColor: "pink"
        },
        "& .MuiInputLabel-formControl": {
            color: "white"
        },
        '& .MuiFormHelperText-root':
        {
            color: 'rgba(156, 156, 156, 0.54)'
        }

    },
}));
const LoginForm = (props) => {
    const classes = useStyles();
    //for loading 
    const [isloading,setloading]=useState(false);
    // for error 
    const [checkError, setError] = useState({
        username_error: false,
        username_errortext: 'this enter a valid username',
        email_error: false,
        email_errortext: 'Pleas enter a valid Email ',
        password_error: false,
        password_errortext: ''
    });
    const handleChange = prop => event => {
        props.setFormValues({ ...props.FormValues, [prop]: event.target.value });
    }
    const handleClickShowPassword = () => {
        props.setFormValues({ ...props.FormValues, showPassword: !props.FormValues.showPassword });
    };
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const sendData = () => {
        // return;
        setloading(true);
        let url = 'https://tumzied.pythonanywhere.com/api/account/token/';
        axios.post(url, {
            username: props.FormValues.username,
            password: props.FormValues.password,
        }).then(r => {
            let data = r.data;
            //updating to user info 
            props.setUserinfo({
                token: data.token,
                uid: data.user.uid,
                username: data.user.username,
                expir: data.expire

            });
            props.setLogin(true);
            //save it to the local storage 
            window.localStorage.setItem('userinfo', JSON.stringify(data));
            
        }).catch((r) => {
            //show error 

            setError({ ...checkError, username_error: true, username_errortext: 'please enter a valid username ',password_error:true,password_errortext:'please enter a valid password ' });
            // alert(r);

        });
        setloading(false);
    }
    const onClickHandelder = () => {
        //validation 
        const username = props.FormValues.username;
        const password = props.FormValues.password;
        if (username.length == 0) {
            setError({ ...checkError, username_error: true, username_errortext: 'this field is required ' });
            return;
        }

        if (password.length == 0) {
            setError({ ...checkError, password_error: true, password_errortext: 'this field is required ' });
            return;
        }
        setError({ ...checkError, password_error: false, username_error: false });

        sendData();

    };

    return (
        <div className='section-signup'>
        <div className='section-signup-title'>Login</div>
        <div className='from-control'>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    required
                    id="standard-basic"
                    onChange={handleChange('username')}
                    label="username"
                    error={checkError.username_error}
                    helperText={checkError.username_error ? checkError.username_errortext : null}
                    variant="standard" />
                <br></br>
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        required
                        id="standard-adornment-password"
                        type={props.FormValues.showPassword ? 'text' : 'password'}
                        value={props.FormValues.password}
                        onChange={handleChange('password')}
                        error={checkError.password_error}
                        endAdornment={
                            <InputAdornment position="end">
                                {/* position="start" */}
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {props.FormValues.showPassword ? <Visibility color='primary' /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    {checkError.password_error ?
                        <FormHelperText id="standard-adornment-helper-text">{checkError.password_errortext}</FormHelperText>
                        : <div></div>}
                </FormControl>
                {/* <IconButton></IconButton> */}

            </form>
            <Button_my name='login' onClick={onClickHandelder} ></Button_my>
                <br></br>
                {isloading?
                <CircularProgress></CircularProgress>
                :null}
    
            <div style={{ fontSize: 10, marginTop: 20, display: 'flex' }}>
                Don't have account yet? Signup <div onClick={() => props.setShowSingupForm(true)} style={{ marginLeft: 5, cursor: 'pointer', textDecoration: 'underline' }}> here </div>
            </div>


        </div>
        </div>
        
    );
}

export default LoginForm;