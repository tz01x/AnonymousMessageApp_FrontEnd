import React, { useState } from 'react'
import CircularProgress from './compunent/circularProgressl';
 
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
const SignupForm = (props) => {
  const [isloading,setloading]=useState(false);
  const [checkError, setError] = useState({
    username_error: false,
    username_errortext: 'this enter a valid username',
    email_error: false,
    email_errortext: 'Pleas enter a valid Email ',
    password_error: false,
    password_errortext: ''
  });

  const classes = useStyles();

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
    setloading(true);

    let url = 'https://tumzied.pythonanywhere.com/api/account/register/';
    axios.post(url, {
      username: props.FormValues.username,
      email: props.FormValues.email,
      password: props.FormValues.password,
    }).then(r => {

      if (r.status === 203) {
        let data = r.data;
        console.log(data);
        if (data['details'].includes('username')) {
          setError({ ...checkError, username_error: true, username_errortext: data['details'] });
        }
        else if (data['details'].includes('email')) {


          setError({ ...checkError, email_error: true, email_errortext: data['details'] });

        }
      } else if (r.status = 201) {
        let data = r.data;
        console.log(data);
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
      }

    }).catch(r => {
      // console.log(r);
      // console.log(r.status);
      // console.log(r.sendData);



    });
    setloading(false);

  }
  const onClickHandelder = () => {

    const email = props.FormValues.email;
    const username = props.FormValues.username;
    const password = props.FormValues.password;

    if (username.length < 5) {
      setError({ ...checkError, username_error: true, username_errortext: 'username is to short' });

    }

    if (password.length < 5) {
      setError({ ...checkError, password_error: true, password_errortext: 'password is to short' });

    }
    //checking if @ is in the email 
    // console.log('hi');


    let isthere = email.includes('@');
    console.log(email);
    console.log(isthere);

    //email validation 
    if (isthere == false) {
      setError({ ...checkError, email_error: !isthere })
      // console.log(isthere);
    } else {

      sendData();
      setError({ ...checkError, username_error: false, email_error: false, password_error: false });

      //send data api 
    }


  }
  return (
    <div className='section-signup'>
      <div className='section-signup-title'>Signup</div>
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
        <TextField
          required
          error={checkError.email_error}
          id="outlined-basic"
          onChange={handleChange('email')}
          helperText={checkError.email_error ? checkError.email_errortext : null}
          label="Email"
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
      <Button_my name='Regiser' onClick={onClickHandelder} ></Button_my>
            <br/>
            {isloading?
                <CircularProgress></CircularProgress>
                :null}
      <div style={{ fontSize: 10, marginTop: 20, display: 'flex' }}>
        Already have account! Login <div onClick={() => props.setShowSingupForm(false)} style={{ marginLeft: 5, cursor: 'pointer', textDecoration: 'underline' }}> here </div>
      </div>
    </div>

  </div>
  );
}
export default SignupForm;
// rgba(156, 156, 156, 0.54)
// import { useHistory } from 'react-router-dom';
// routeChange=()=> {
//     let path = `newPath`;
//     let history = useHistory();
//     history.push(path);
//   }