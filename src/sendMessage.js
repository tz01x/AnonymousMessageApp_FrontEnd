import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { useParams,useHistory} from "react-router";
import Button_my from './button'


import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
function  sendData(text,uid,history){
    axios.post(
        'https://tumzied.pythonanywhere.com/api/sendmessage/',
        {
            
                text:text,
                uid:uid,
            
        }
    ).then(r=>{
        alert('message Send');
        history.push('../');
    }).catch(r=>{
        alert('this link is invalid. Try a valid link');      
        history.push('../');
    });
        
}

//main fuction 
 const SendMessage=(props)=>{
    let { uid } = useParams();
    let history=useHistory();
    const [username,setusername]=useState(null);
    const classes = useStyles();
    const [values,setValue]=useState(
        {message:''}
    );
    const [checkError, setError] = useState({
        message_error: false,
        message_errortext: 'Your messages is to short 😅',
    });

    const handleChange = prop => event => {
        setValue({ ...values, [prop]: event.target.value });
    }

    
    useEffect(() => {

        axios.get('https://tumzied.pythonanywhere.com/api/getusername/',{
            params:{
                uid:uid,
            }
        }).then(r=>{
            if(r.status===203){
                alert('this is invalid link ');      
                history.push('../');
                return {name:'unknown'}
            }else if (r.status==200){
                return r.data;
            }
        }).then(data=>{
            setusername(data.name)
            window.document.title=`SendMessage to ${data.name}`;
        });
        
        
        return () => {
            // cleanup
        }
    }, []);

    const onClickHandelder = () => {

        if(values.message.length<=5){
            //show error 
            setError({...checkError,message_error:true});
        }else {
            // send data to api 
            sendData(values.message,uid,history);
            // reseting error 
            setError({...checkError,message_error:false});

        }

    };
    
return (
    <section style={{backgroundColor:'#222222'}}>
    <div className='title' >
    <p style={{color:'white',textTransform:'capitalize'}}>
        send message to '{username?username:'...'}' anonymously  😀
    </p>

    <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    multiline
                    required
                    id="standard-basic-multiline"
                    onChange={handleChange('message')}
                    label="Your message"
                    error={checkError.message_error}
                    helperText={checkError.message_error?checkError.message_errortext:'Enter your secret Messages 😂'}
                    variant="standard" />
                <br></br>
     </form>       
     <Button_my name='Send' onClick={onClickHandelder} ></Button_my>

    
    </div>
    </section>
);  
}

export default SendMessage;