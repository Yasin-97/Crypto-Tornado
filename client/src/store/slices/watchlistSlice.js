import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import firebaseApp from "../../services/firebase/firebase";


const createConfig = async (params) => {
  const user = firebaseApp.auth().currentUser;
  const token = user && (await user.getIdToken());
  
  const config = {
    params,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}




export const getUserWatchlist=createAsyncThunk(
  "watchlist/getUserWatchlist",
  async(data,thunkAPI)=>{
    const {userId}=data
    thunkAPI.dispatch(watchlistSlice.actions.setIsFavCryptosFetched({isFavCryptosFetched:false}))
    const header = await createConfig({userId});
    axios.get(`https://cryptornado.herokuapp.com/api/user-watchlist`,header)
    .then(res=>thunkAPI.dispatch(watchlistSlice.actions.setWatchlist({favCryptos:res.data.favCryptos})))
    .then(()=>thunkAPI.dispatch(watchlistSlice.actions.setIsFavCryptosFetched({isFavCryptosFetched:true})))
    .catch(err=>console.error(err))
  }
)

export const addToUserWatchlist = createAsyncThunk(
  "watchlist/addToUserWatchlist",
  async (data, thunkAPI) => {
   
    const {userId,newFavCrypto}=data
    const prevFavCryptos=thunkAPI.getState().watchlistApi.favCryptos
    
    thunkAPI.dispatch(watchlistSlice.actions.setWatchlist({favCryptos:[...prevFavCryptos,newFavCrypto]}));
    const header = await createConfig();
    await axios.post('https://cryptornado.herokuapp.com/api/user-watchlist',{userId,favCryptos:[...prevFavCryptos,newFavCrypto]},header)
    .catch(err=>console.error(err))
  }
);


export const removeFromUserWatchlist = createAsyncThunk(
  "watchlist/removeFromUserWatchlist",
  async (data, thunkAPI) => {
    const {userId,removeCryptoId}=data
    const favCryptos=thunkAPI.getState().watchlistApi.favCryptos
    const filteredCryptos=favCryptos.filter(item=>item.coinId!==removeCryptoId)
   
    thunkAPI.dispatch(watchlistSlice.actions.setWatchlist({favCryptos:filteredCryptos}));
    const header = await createConfig();
   await axios.post('https://cryptornado.herokuapp.com/api/user-watchlist',{userId,favCryptos:filteredCryptos},header)
   .catch(err=>console.error(err))
  }
);



const initialWatchlistState = {
  favCryptos: [],
  isFavCryptosFetched:true //to hide fav icons until favCryptos list is loaded
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: initialWatchlistState,
  reducers: {
    setWatchlist(state, action) {
      const {favCryptos}=action.payload
      state.favCryptos = favCryptos;
    },
    setIsFavCryptosFetched(state, action) {
      const {isFavCryptosFetched}=action.payload
      state.isFavCryptosFetched = isFavCryptosFetched;
    },
  }
});


export const watchlistActions = watchlistSlice.actions;

export default watchlistSlice;
