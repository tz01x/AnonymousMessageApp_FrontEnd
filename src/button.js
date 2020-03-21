import React from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {purple} from '@material-ui/core/colors'
const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#6ec895',
    borderColor: '#6ec895',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#6ec895',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#6ec895',
      borderColor: '#6ec895',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem #86e0ad',
    },

    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },

  }));
//   .MuiButton-containedPrimary {
//     color: #fff;
//     background-color: #3f51b5;
// }
  
const Button_my=(props)=>{

    const onclickhendeler=()=>{
        
        let url = 'http://192.168.0.103:8080/api/account/token/';
        let data = {
          username: 'user',
          password: 'admin',
        };

        axios.post(url, data).then((r) => {
          //get the responce data 

          const d = r.data;

          window.localStorage.setItem('userinfo', JSON.stringify(d));

          props.setUserinfo({
            token: r.data.token,
            uid: d.user.uid,
            username: d.user.username,
            expir: d.expire
          });

          props.setLogin(true);



        });

    }

    const classes = useStyles();
    return (
        <Button variant="contained" 
        size="medium" 
        onClick={props.onClick}
        className={classes.root}>
          
          {props.name?props.name:'myButton'}
        </Button>
    );
}
export default Button_my;