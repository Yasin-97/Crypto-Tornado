import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import firebaseApp from "../../firebase";

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

    const newUser=await axios.post('https://cryptornado.vercel.app/api/user-auth',{ email, password, displayName })
    if(newUser){
      const { email } = newUser.data.user;
      thunkAPI.dispatch(signin({ email, password }))
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
