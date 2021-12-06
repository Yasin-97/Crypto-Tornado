import {configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from '../authLayer/authSlice'
import {cryptoApi} from '../assets/services/cryptoApi'
import {cryptoNewsApi} from '../assets/services/cryptoNewsApi'

export default configureStore({
    reducer:{
        authApi:authReducer.reducer,
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer

    },
    // middleware: getDefaultMiddleware({
    //     serializableCheck: false
    //   }),
})