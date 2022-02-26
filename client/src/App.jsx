import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebaseApp from "./firebase";
import Navbar from "./mainLayer/components/Navbar";
import MainSection from "./mainLayer/components/MainSection";
import Footer from "./mainLayer/components/Footer";
import { authActions } from "./store/slices/authSlice";
import {
  getUserWatchlist,
  watchlistActions,
} from "./store/slices/watchlistSlice";
import {useGetCryptosQuery} from './store/apis/cryptoApi'


function App() {

  //api call
  const { data: cryptosList } = useGetCryptosQuery(10);

  //redux
  const dispatch = useDispatch();
  const { setUser } = authActions;
  const currentUser = useSelector((state) => state.authApi.currentUser);

  //state
  const [theme, setTheme] = useState(false);
  const [userResolved, setUserResolved] = useState(false);

  useEffect(() => {

    let unsubscribe;
    try {
      if (cryptosList?.data) { // to chech if internet connection is well
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
      } 
    } catch (err) {
      console.log(err);
    }

    return unsubscribe;
  }, [cryptosList]);


  useEffect(() => {
    if (currentUser) {
      dispatch(
        watchlistActions.setIsFavCryptosFetched({ isFavCryptosFetched: false })
        );
        dispatch(getUserWatchlist({ userId: currentUser?.userId }));
    }
  }, [currentUser]);


  //themeing
  const changeTheme = (isThemeDark) => isThemeDark? setTheme('dark'):setTheme('light');

  return (
    <div className={`app ${theme}`}>
        <Navbar setTheme={changeTheme} isUserResolved={userResolved} />
      <div style={{ width: "100%" }}>
        <MainSection userResolved={userResolved} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
