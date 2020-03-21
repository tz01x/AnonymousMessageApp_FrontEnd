import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import './App.css';
import './Form_control.css';
import About from "./about.js";
import Nav from './nav/nav';
import SignupForm from './SignupForm';

function App(props) {

  const [islogin, setLogin] = useState(false);
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


  let baseurl = '/test_my-app';

  useEffect(() => {
    console.log('render');
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

      }

    }

    return () => {
      console.log('finish unmount');
      // this function is call when a particular data is update complectly 
      //like here , when userinfo verible update finish then this function is call
      console.log(userinfo.username);


    };

  }, [userinfo, islogin]);


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
            ></Home>
          </Route>
          <Route path={baseurl + '/about'}>
            <About />
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
        </div>
      </footer>

      </div>
    </Router>

  );
}

function Home(props) {
  return (
    <div className="App">

      <section>
        <div className='bg-img' ></div>
        <div className='section-main' >

          {props.islogin ? `, ${props.userinfo.username}` : ''}

          <h1 className=''>Hi, *_* </h1>
          <SignupForm
            FormValues={props.FormValues}
            setFormValues={props.setFormValues}
            userinfo={props.userinfo}
            setUserinfo={props.setUserinfo}
            islogin={props.islogin}
            setLogin={props.setLogin}
          ></SignupForm>

        </div>
      </section>


      



    </div>
  );
}

function Error() {
  return (<section>404</section>);
}
export default App;
