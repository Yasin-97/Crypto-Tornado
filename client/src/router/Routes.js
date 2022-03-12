import React from "react";
import { Switch, Route } from "react-router-dom";
import {PrivateRoute} from "router";
import {
  Glance,
  Exchanges,
  CryptoCurrencies,
  CryptoDetails,
  News,
  WatchList,
  SignUp,
  SignIn,
} from "pages";

import { NotFound } from "components";

export default function Routes() {
  return (
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
  );
}
