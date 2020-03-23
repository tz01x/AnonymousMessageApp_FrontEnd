import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SendMessage from "./sendMessage";
import './App.css';
import './Form_control.css';
import About from "./about.js";
import Nav from './nav/nav';
import SignupForm from './SignupForm';
import Loginform from './LoginForm';
import Mymessages from "./myMessages";
const getMessageurl = 'https://tumzied.pythonanywhere.com/api/messages/';
function App(props) {
  const [isloading,setloading]=useState(false);
  const [islogin, setLogin] = useState(false);
  const [msg,setMsg]=useState(null);
  const [userinfo, setUserinfo] = useState(
    {
      token: null,
      uid: null,
      username: null,
      expir: null
    });

  const [FormValues, setFormValues] = React.useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });


  let baseurl = '/test_my-app/';

  useEffect(() => {
    // console.log('render');
    // at first when the page load this funciton run and every compounent change 
    //his state this funciton fire up 
    if (islogin === false) {
      //if there is data to to get it return null
      let d = window.localStorage.getItem('userinfo');
      if (d != null) {

        d = JSON.parse(d);
        // console.log(d);

        setUserinfo({
          token: d.token,
          uid: d.user.uid,
          username: d.user.username,
          expir: d.expire
        });
        setLogin(true);
      
       //now use can fatch there messages 
           
       
         
          
          

          
      
      
    
      }

    }

    return () => {
      // console.log('finish unmount');
      // this function is call when a particular data is update complectly 
      //like here , when userinfo verible update finish then this function is call
      // console.log(userinfo.username);


    };

  }, [islogin]);

 function  showlogoutUrl() {
    if (islogin){
      return (
        <>
        |<a href='#' onClick={()=> {
            if(islogin){

            setUserinfo(
              {
                token: null,
                uid: null,
                username: null,
                expir: null
              }
            );
            setLogin(false);
            window.localStorage.clear()
          }

          }} >LogOut</a> 
        </>
      );
    }
    return <></>;
   

  }
  return (
    <Router>
      <div>
        <header>
          <Nav></Nav>
        </header>


        <Switch>
          <Route exact path={baseurl}>
            <Home
              setFormValues={setFormValues}
              FormValues={FormValues}
              baseurl={baseurl}
              userinfo={userinfo}
              setUserinfo={setUserinfo}
              islogin={islogin}
              setLogin={setLogin}

              isloading={isloading}
              setloading={setloading}
              msg={msg}
              setMsg={setMsg}
            ></Home>
          </Route>
          <Route path={baseurl + 'about/'}>
            <About />
          </Route>
          <Route exact path={baseurl+'sendmessage/:uid'} >
            <SendMessage/>
          </Route>

          <Route path="*"  >
            <Error></Error>
          </Route>

        </Switch>
        <footer>
        <hr></hr>
        <div>
          2020-Faceless
        </div>
        <div>
          <Link to={baseurl} >Home</Link>|<Link to={'./about/'}>About</Link>
          {showlogoutUrl()}
        </div>
      </footer>

      </div>
    </Router>

  );
}

function Home(props) {
  const [showSignupForm,setShowSingupForm]=useState(true);

  const showComponunt=()=>{
    if(props.islogin===true&&props.islogin!=null){
      return <Mymessages 
      userinfo={props.userinfo} 
    
      isloading={props.isloading}
      setloading={props.setloading}
      msg={props.msg}
      setMsg={props.setMsg}
       />;
    }else{
      if(showSignupForm){
        return <SignupForm
        FormValues={props.FormValues}
        setFormValues={props.setFormValues}
        userinfo={props.userinfo}
        setUserinfo={props.setUserinfo}
        islogin={props.islogin}
        setLogin={props.setLogin}
        setShowSingupForm={setShowSingupForm}
      ></SignupForm>;
      }
      return <Loginform 
        FormValues={props.FormValues}
        setFormValues={props.setFormValues}
        userinfo={props.userinfo}
        setUserinfo={props.setUserinfo}
        islogin={props.islogin}
        setLogin={props.setLogin}
      setShowSingupForm={setShowSingupForm}
      />;
    }
  }
  return (
    <div className="App">

      <section>
        <div className='bg-img' ></div>
        <div className='section-main' >

          {/* <h1 className=''>Hi, *_* </h1>
          {props.islogin} */}
          {/* {props.islogin ? `, ${props.userinfo.username}` : ''} */}
          {/* if login true how all messages else shoe signupform  */}

          
          {showComponunt()}

        </div>
      </section>
    </div>
  );
}




function Error() {
  return (<section>404</section>);
}
export default App;
