import {createSlice} from '@reduxjs/toolkit'
import { auth } from './firebase'

const initialAuthState={
    currentUser:null
}

const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
      getCurrentUser(setState){
        console.log(auth.currentUser);
        return ()=>{setState(auth.currentUser);console.log('meme is ');}
      },
         signup(state, action) {
           const {email,password}=action.payload
            return auth.createUserWithEmailAndPassword(email,password)
          },
          login(state, action) {
            const {email,password}=action.payload
            return auth.signInWithEmailAndPassword(email, password)
          },
           logout(ll,kk) {
             console.log(ll,kk);
            return auth.signOut()
          },
    }

})

export const authActions=authSlice.actions

export default authSlice.reducer