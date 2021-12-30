import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { db, setDoc, doc,collection,query, where,onSnapshot   } from "../firebase";




export const getUserWatchlist=createAsyncThunk(
  "watchlist/getUserWatchlist",
  async(data,thunkAPI)=>{
    const {userId}=data
    // const queryCollection = query(collection(db, "users"), where("__name__", "==",userId)); //just testing back end app
    console.log('meme',userId);
    axios.get('http://localhost:3001/api/user-watchlist',{ params:{userId} })
    .then(res=>thunkAPI.dispatch(watchlistSlice.actions.setWatchlist({favCryptos:res.data.favCryptos})))
    // thunkAPI.dispatch(watchlistSlice.actions.setWatchlist({favCryptos:doc.data().favCryptos}))
  //  onSnapshot(queryCollection, (querySnapshot)=>{
  //    querySnapshot.forEach((doc)=>{
  //      thunkAPI.dispatch(watchlistSlice.actions.setWatchlist({favCryptos:doc.data().favCryptos}));
  //    })
  //  })

  }
)

export const addToUserWatchlist = createAsyncThunk(
  "watchlist/addToUserWatchlist",
  async (data, thunkAPI) => {
    const {userId,newFavCrypto}=data
    const prevFavCryptos=thunkAPI.getState().watchlistApi.favCryptos
    
    thunkAPI.dispatch(watchlistSlice.actions.setWatchlist({favCryptos:[...prevFavCryptos,newFavCrypto]}));
    const newFavCryptoList=[...prevFavCryptos,newFavCrypto] //testing
    // return setDoc(doc(db, "users", userId), {
    //   favCryptos:newFavCryptoList //[...prevFavCryptos,newFavCrypto]
    // }); // just testing back end app
    await axios.post('http://localhost:3001/api/user-watchlist',{ userId,favCryptos:[...prevFavCryptos,newFavCrypto] })
    // getUserWatchlist({userId})
  }
);


export const removeFromUserWatchlist = createAsyncThunk(
  "watchlist/removeFromUserWatchlist",
  async (data, thunkAPI) => {
    const {userId,removeCryptoId}=data
    const favCryptos=thunkAPI.getState().watchlistApi.favCryptos
    const filteredCryptos=favCryptos.filter(item=>item.coinId!==removeCryptoId)
   
    thunkAPI.dispatch(watchlistSlice.actions.setWatchlist({favCryptos:filteredCryptos}));
    // return setDoc(doc(db, "users", userId), {
    //   favCryptos:filteredCryptos
    // }); //just testing back end app
   await axios.post('http://localhost:3001/api/user-watchlist',{ userId,favCryptos:filteredCryptos })
  //  getUserWatchlist({userId})
  }
);



const initialWatchlistState = {
  favCryptos: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: initialWatchlistState,
  reducers: {
    setWatchlist(state, action) {
      const {favCryptos}=action.payload
      state.favCryptos = favCryptos;
    }
  }
});


export const watchlistActions = watchlistSlice.actions;

export default watchlistSlice;
