import React,{useEffect,useState} from "react";
import { Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./mainLayer/components/sub/PrivateRoute";
import {
  Navbar,
  Exchanges,
  Home,
  Cryptocurrencies,
  News,
  CryptoDetails,WatchList,NotFound
} from "./mainLayer/components";
import SignUp from './authLayer/components/SignUp'
import SignIn from './authLayer/components/SignIn'
import { useDispatch } from 'react-redux';
import {authActions} from './store/slices/authSlice'
import {auth} from './store/firebase'
import { setUseProxies } from "immer";


function App() {
  //redux
  const dispatch=useDispatch()
  const {setUser}=authActions

  //state
  const [theme,setTheme]=useState(false)
  const [renderRoutes,setRenderRoutes]=useState(false)
const [users,setUsers]=useState()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      console.log(user);
      const {email}=user.multiFactor.user
    await dispatch( setUser({email}))
    setRenderRoutes(true)
    })




    return unsubscribe
  }, [])
 

  //themeing
  const currentTheme=(theme)=>setTheme(theme)
  const isDark=theme?'dark':'light'
  return (
    <div className={`app ${isDark}`}>
     
      <div className="navbar">
        <Navbar setTheme={currentTheme} />
      </div>
      <div style={{width: '100%'}}>
      <div className="main-section">
          {renderRoutes&&<div className="routes">
            <Switch>
            <PrivateRoute exact path="/watchlist" component={WatchList}/>
              <Route exact path="/">
                <Home />
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
              <Route exact path="/signup">
                <SignUp path='signup' />
              </Route>
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Route>
              <NotFound/>
              </Route>
            </Switch>
          </div>}
      </div>
        <div className="footer">
          <h4>
            Cryptornado
            <br />
            All rights reserved
          </h4>
            <br />
          <div style={{display:'grid',gridTemplateRows:'1rem',gridTemplateColumns:'repeat(4,1fr)', gridGap:'2rem',justifyItems:'center'}}>
            <Link to="/">Glance</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </div>
        </div>
        </div>
    </div>
  );
}

export default App;
