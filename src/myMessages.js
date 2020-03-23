import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Circularprogress from "./compunent/circularProgressl";
import { useHistory } from "react-router-dom";
import { FileCopy } from "@material-ui/icons";
import CopyToclipboard from './compunent/copyToClipbord'; 

const getData = (url, heders, uid, setMsg, setloading) => {
    setloading(true);
    axios.get(url, {
        params: {
            uid: uid,
        },
        headers: heders,

    }).then(r => r.data).then(data => {
        //  console.log(data);
        setMsg(data[0].messages)
    }).catch(r => console.log(r)
    );
    setloading(false);
}
//main funciton 
const Mymessages = (props) => {
    let history = useHistory();

  
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${props.userinfo['token']}`
    }
    const url = 'https://tumzied.pythonanywhere.com/api/messages/';


    useEffect(() => {
        window.document.title='you messages';
        // window.title='your messages'
        getData(url, headers, props.userinfo.uid, props.setMsg, props.setloading);
        return ()=>{
            props.setMsg(null);
        }
    }, []);
    function showall() {
        if (props.msg) {
            return props.msg.map((m) => {
                return (
                  
                        
                    <div className='msg' key={m.id}>
                        <div className='msg-title' >{m.text}</div>
                        <div className='msg-time'>At : {m.create}</div>
                    </div>
                   
                );
            })
        }
        return <></>
    }



    return (
        <div className='section-main-profile'>

            {/* <button onClick={_=>{}}> get data </button> */}
            
                        <div className='msg-section-title' style={{textAlign:'center'}} >
                        <div className='text-link' style={{display:'flex',justifyContent:'center',fontSize:12}}>Copy your Dare link  
                        
                
                        <CopyToclipboard
                        text={`${window.location.protocol}//${window.location.host}${window.location.pathname}sendmessage/${props.userinfo.uid}`}
                        compunent={<FileCopy/>}
                        ></CopyToclipboard>
                        

                    
                        
                        
                        </div>
                        <h1>Messages </h1>
                        </div>
            

            {props.isloading ? <Circularprogress /> : showall()}

        </div>
    );
}
export default Mymessages;