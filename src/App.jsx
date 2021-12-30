import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Exchanges,
  Home,
  Cryptocurrencies,
  News,
  Avatar,
  CryptoDetails,
  WatchList,
  NotFound,
  ErrorMessage,
} from "./mainLayer/components";
import PrivateRoute from "./mainLayer/components/sub/PrivateRoute";
import SignUp from "./authLayer/components/SignUp";
import SignIn from "./authLayer/components/SignIn";
import { authActions } from "./store/slices/authSlice";
import firebaseApp from "./store/firebase";
import { getUserWatchlist } from "./store/slices/watchlistSlice";

function App() {
  //redux
  const dispatch = useDispatch();
  const { setUser } = authActions;
  const currentUser = useSelector((state) => state.authApi.currentUser);

  //state
  const [theme, setTheme] = useState(false);
  const [userResolved, setUserResolved] = useState(false);
  const [internetError, setInternetError] = useState(false);

  useEffect(() => {
    let unsubscribe;
    try {
      if (navigator.onLine) {
        unsubscribe = firebaseApp.auth().onAuthStateChanged((userInfo) => {
          if (userInfo) {
            const {
              uid: userId,
              email,
              displayName,
            } = userInfo.multiFactor.user;
            dispatch(setUser({ userId, email, displayName }));
          }
          setUserResolved(true);
        });
      } else {
        setInternetError(true);
      }
    } catch (err) {
      console.log(err);
    }

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       if (navigator.onLine) {
  //         const user = await firebaseApp.auth().currentUser;
  //         if (user) {
  //           const { uid: userId, email, displayName } = user.multiFactor.user;
  //           dispatch(setUser({ userId, email, displayName }));
  //         }
  //         setUserResolved(true);
  //       } else {
  //         setInternetError(true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, []);
  // const {refetch}=useGetUserWatchlistQuery({userId:currentUser?.userId})

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserWatchlist({ userId: currentUser?.userId }))
      // refetch()
      };
  }, [currentUser]);

  //themeing
  const currentTheme = (theme) => setTheme(theme);
  const isDark = theme ? "dark" : "light";

  return (
    <div className={`app ${isDark}`}>
      <div className="navbar">
        <Navbar setTheme={currentTheme} isUserResolved={userResolved} />
      </div>
      <div style={{ width: "100%" }}>
        <div className="main-section">
          {internetError && (
            <ErrorMessage>
              {" "}
              You may have bad internet connection! check it and refresh.{" "}
            </ErrorMessage>
          )}
          {currentUser && <Avatar />}
          {userResolved && (
            <div className="routes">
              {/* //put routes in a seperate file and refrence here */}
              <Switch>
                <PrivateRoute exact path="/watchlist" component={WatchList} />
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
                  <SignUp path="signup" />
                </Route>
                <Route exact path="/signin">
                  <SignIn />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </div>
          )}
        </div>
        <div className="footer">
          <h4>
            Cryptornado
            <br />
            All rights reserved
          </h4>
          <br />
          <div
          className='footer-links'
            
          >
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
