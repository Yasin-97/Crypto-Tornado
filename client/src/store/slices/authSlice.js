import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import firebaseApp from "../../services/firebase/firebase";

const initialAuthState = {
  currentUser: null,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setUser(state, action) {
      const { userId, email, displayName } = action.payload;
      state.currentUser = { userId, email, displayName };
    },
    removeUser(state, action) {
      state.currentUser = null;
    },
  },
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    const { email, password, displayName } = data;
    
    const newUser=await axios.post('https://cryptornado.herokuapp.com/api/user-auth',{ email, password, displayName })
    if(newUser.data.user){
      // try {
        const { email } = newUser.data.user;
        thunkAPI.dispatch(signin({ email, password }))
        
      // } catch (error) {
      //   thunkAPI.rejectWithValue(error)
      //   console.log(error);
      // }
    }
    else{
      console.log('bye',newUser);
      return thunkAPI.rejectWithValue(newUser)
    }
  }
);

export const signin = createAsyncThunk(
  "atuh/signin",
  async (data, thunkAPI) => {
    const { email, password } = data;
    await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    const {displayName,uid:userId}=await firebaseApp.auth().currentUser.multiFactor.user
    thunkAPI.dispatch(authSlice.actions.setUser({ userId,email,displayName }));
  }
);

export const signout = createAsyncThunk(
  "auth/signout",
  async (data, thunkAPI) => {
    await firebaseApp.auth().signOut();
    thunkAPI.dispatch(authSlice.actions.removeUser());
  }
);

export const authActions = authSlice.actions;

export default authSlice;
