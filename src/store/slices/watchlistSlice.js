import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import firebaseApp, { db, setDoc, doc,collection,query, where,onSnapshot   } from "../../firebase";


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
    // const queryCollection = query(collection(db, "users"), where("__name__", "==",userId)); //just testing back end app
    const header = await createConfig({userId});
    axios.get(`http://localhost:3001/api/user-watchlist`,header)
    .then(res=>thunkAPI.dispatch(watchlistSlice.actions.setWatchlist({favCryptos:res.data.favCryptos})))
    .then(()=>thunkAPI.dispatch(watchlistSlice.actions.setIsFavCryptosFetched({isFavCryptosFetched:true})))
    .catch(err=>console.error(err))
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
    const header = await createConfig();
    await axios.post('http://localhost:3001/api/user-watchlist',{userId,favCryptos:[...prevFavCryptos,newFavCrypto]},header)
    .catch(err=>console.error(err))
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
    const header = await createConfig();
   await axios.post('http://localhost:3001/api/user-watchlist',{userId,favCryptos:filteredCryptos},header)
   .catch(err=>console.error(err))
  //  getUserWatchlist({userId})
  }
);



const initialWatchlistState = {
  favCryptos: [],
  isFavCryptosFetched:false //to prvent user from clicking fav icons on crypto cards before favCryptos are loaded
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
