import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import themeReducer from "store/slices/themeSlice";
import authReducer from "store/slices/authSlice";
import watchlistReducer from "store/slices/watchlistSlice";
import  cryptoApi  from "store/apis/cryptoApi";
import cryptoNewsApi from "store/apis/cryptoNewsApi";


 function createStore (preloadedState){
   return configureStore({
  reducer: {
    themeApi:themeReducer.reducer,
    authApi:authReducer.reducer,
    watchlistApi:watchlistReducer.reducer,
    [cryptoApi.reducerPath]:cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer,
  },
  preloadedState,
})}


function renderWithRedux(
  ui,
  {
    preloadedState,
    store = createStore(preloadedState),
    ...renderOptions
  } = {}
  ) {
    function Wrapper({ children }) {
      return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}


function renderWithReduxAndRouter(
  ui,
  {
    preloadedState,
    store = createStore(preloadedState),
    ...renderOptions
  } = {}
){
  function Wrapper({ children }) {
    return <BrowserRouter><Provider store={store}>{children}</Provider></BrowserRouter>;
}

return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}


function rendreHookWithRedux(
  hook,
  {
    preloadedState,
    store = createStore(preloadedState),
    initialValues,
    ...renderOptions
  } = {}
  ) {
    function wrapper({ children }) {
      return <Provider store={store}>{children}</Provider>;
  }

  return renderHook((initialValues)=> hook({...initialValues}) , { wrapper,initialProps:{...initialValues}, ...renderOptions });
}



// re-export everything
export * from "@testing-library/react";
// override render method
export {createStore, renderWithReduxAndRouter,renderWithRedux,rendreHookWithRedux };
