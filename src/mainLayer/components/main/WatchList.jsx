import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {getUserWatchlist, watchlistActions} from '../../../store/slices/watchlistSlice'
import {FrownOutlined} from '@ant-design/icons'
import { useGetCryptosQuery } from "../../../assets/services/cryptoApi";
import {ErrorMessage,WatchlistCryptoItem,Loading} from '../../components'


export default function WatchList() {
    const { data: cryptosList, isFetching } = useGetCryptosQuery(100);
    console.log(cryptosList);
   
    const favCryptos = useSelector((state) => state.watchlistApi.favCryptos);

const [userWatchlist,setUserWatchlist]=useState([])


useEffect(()=>{
    const filteredData=favCryptos.map(watchlistCoin=>{
        return cryptosList?.data?.coins.find(coin=>{if(coin.name===watchlistCoin.name){ return coin}})
    })
    setUserWatchlist(filteredData)
    }
    ,[cryptosList,favCryptos])
    

if(isFetching) return <Loading />

if(!cryptosList?.data)  return <ErrorMessage> You may have bad internet connection! check it and refresh.</ErrorMessage>

if(userWatchlist.length===0) return <h2 style={{textAlign:'center',marginTop:'1.5rem', color:'hsl(0, 0%, 81%)'}}> No favorite cryptocurrency!</h2>
    
return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <table className='watchlist-table'>
      <thead>
        <tr>
          <th></th>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h %</th>
          <th>Market Cap</th>
          <th>Circulating Supply</th>
        </tr>
      </thead>
      <tbody >
        {
          cryptosList?.data?.coins?.map(crypto=>{
            const isFav= userWatchlist?.find(favCrypto=>favCrypto?.name===crypto.name)
            return isFav? <WatchlistCryptoItem key={crypto.id} isFav={isFav} {...crypto}/>:null
        })
        }
      </tbody>
    </table>
    </div>
            
       
    )
}
