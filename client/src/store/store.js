import {configureStore,getDefaultMiddleware,applyMiddleware } from '@reduxjs/toolkit'
import thunk from "redux-thunk" ;

import themeReducer from 'store/slices/themeSlice'
import authReducer from 'store/slices/authSlice'
import watchlistReducer from 'store/slices/watchlistSlice'

import cryptoApi from './apis/cryptoApi'
import cryptoNewsApi from './apis/cryptoNewsApi'

export default configureStore({
    reducer:{
        themeApi: themeReducer.reducer,
        authApi:  authReducer.reducer,
        watchlistApi:  watchlistReducer.reducer,
        [cryptoApi.reducerPath]:  cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    }
}, applyMiddleware(thunk) )