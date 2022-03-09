import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Loading,
  ErrorMessage,
  Avatar,
  PrivateRoute,
  Glance,
  Exchanges,
  CryptoCurrencies,
  CryptoDetails,
  News,
  WatchList,
  SignUp,
  SignIn,
  NotFound,
} from "mainLayer/index";
import { useGetCryptosQuery } from "store/apis/cryptoApi";
export default function MainSection({ userResolved }) {
  //api call
  const {
    data: cryptosList,
    isFetching: isCryptosListFetching,
    refetch: refetchCryptosList,
  } = useGetCryptosQuery(10);

  //redux
  const currentUser = useSelector((state) => state.authApi.currentUser);

  return (
    <div className="main-section">
      {isCryptosListFetching && <Loading />}
      {!cryptosList?.data && !isCryptosListFetching && (
        <ErrorMessage refetchAction={refetchCryptosList}>
          You may have bad internet connection! try to refetch.
        </ErrorMessage>
      )}
      {currentUser && <Avatar />}
      {userResolved && (
        <div className="routes">
          <Switch>
            <PrivateRoute exact path="/watchlist" component={WatchList} />
            <Route exact path="/">
              <Glance />
            </Route>
            <Route exact path="/exchanges">
              <Exchanges />
            </Route>
            <Route exact path="/cryptocurrencies">
              <CryptoCurrencies />
            </Route>
            <Route exact path="/cryptodetails/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
            <Route exact path="/signup">
              <SignUp />
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
  );
}
