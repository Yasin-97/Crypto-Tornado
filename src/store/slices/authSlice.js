import {createSlice} from '@reduxjs/toolkit'
import { auth,updateProfile} from '../firebase'

const initialAuthState={
    currentUser:null
}
console.log('from auth slice');
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
         setUser(state, action) {
           const {email,displayName}=action.payload
           state.currentUser={email,displayName}
          },
          removeUser(state, action) {
            state.currentUser=null
          }
    }

})

export const signup=(email,password,displayName)=>{
  return async (dispatch)=>{
      const authenticate=await auth.createUserWithEmailAndPassword(email,password)
    if(authenticate) updateProfile(auth.currentUser,{displayName})
    if(authenticate) dispatch(authSlice.actions.setUser({email,displayName}))

  }
}

export const signin=(email,password)=>{
  return async (dispatch)=>{
      const authenticate=await auth.signInWithEmailAndPassword(email,password)
    if(authenticate) console.log(authenticate);
    if(authenticate) dispatch(authSlice.actions.setUser({email}))

  }
}

export const signout=()=>{
  return async (dispatch)=>{
      const remove=await auth.signOut()
    if(remove) dispatch(authSlice.actions.removeUser())

  }
}



export const authActions=authSlice.actions

export default authSlice