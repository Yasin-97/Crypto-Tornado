import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebaseApp from "services/firebase/firebase";
import {Navbar,MainSection,Footer} from "layout/layoutSections";

import { authActions } from "store/slices/authSlice";
import {
  getUserWatchlist,
  watchlistActions,
} from "store/slices/watchlistSlice";
import {useGetCryptosQuery} from 'store/apis/cryptoApi'
import VoiceAI from "../helpers/customHook/useVoiceAI";


function Layout() {

  // useVoiceAI();
  //api call
  const { data: cryptosList } = useGetCryptosQuery(10);

  //redux
  const dispatch = useDispatch();
  const { setUser } = authActions;
  const currentUser = useSelector((state) => state.authApi.currentUser);
  const theme=useSelector((state)=>state.themeApi.theme)

  //state
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

  return (
    <div className={`layout ${theme}`}>
      <VoiceAI/>
        <Navbar isUserResolved={userResolved} />
      <div style={{ width: "100%" }}>
        <MainSection userResolved={userResolved} />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;