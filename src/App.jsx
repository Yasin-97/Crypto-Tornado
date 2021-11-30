import React,{useEffect,useState} from "react";
import { Switch, Route, Link } from "react-router-dom";
import {
  Navbar,
  Exchanges,
  Home,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./mainLayer/components";
import SignUp from './authLayer/components/SignUp'
import { useDispatch } from 'react-redux';
import {authActions} from './authLayer/authSlice'
function App() {
  const [theme,setTheme]=useState(false)
  const currentTheme=(theme)=>setTheme(theme)
  
  const isDark=theme?'dark':'light'
  return (
    <div className={`app ${isDark}`}>
     
      <div className="navbar">
        <Navbar setTheme={currentTheme} />
      </div>
      <div style={{width: '100%'}}>
      <div className="main-section">
          <div className="routes">
            {/* <button onClick={()=> dispatch(authActions.getCurrentUser(setUser))}>current user</button>
            <button onClick={()=> dispatch(authActions.login({email:"ypppopppplppso@example.org",password:"3300220110"}))}>login user</button>
            <button onClick={()=> dispatch(authActions.logout())}>bye now</button> */}
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/cryptodetails/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
      </div>
        <div className="footer">
          <h4>
            Cryptornado
            <br />
            All rights reserved
          </h4>
            <br />
          <div style={{display:'grid',gridTemplateRows:'1rem',gridTemplateColumns:'repeat(3,1fr)', gridGap:'2rem',justifyItems:'center'}}>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </div>
        </div>
        </div>
    </div>
  );
}

export default App;
