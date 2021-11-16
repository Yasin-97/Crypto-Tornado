import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import CryptoCard from './CryptoCard'

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loading from './Loading'

const Cryptocurrencies = ({number}) => {
    const numberOfCryptos=number?number:100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(numberOfCryptos);
  const [cryptos,setCryptos]=useState([])
  const [searchText,setSearchText]=useState('')

useEffect(()=>{
const filteredData=cryptosList?.data?.coins.filter(coin=>{
    // return coin.name.toLowerCase().includes(searchText.toLowerCase())
    const regex= new RegExp(`^${searchText}`,'gi')
    return coin.name.match(regex)|| coin.symbol.match(regex)

})
setCryptos(filteredData)
}
,[cryptosList,searchText])

if(isFetching) return <Loading />



  return (
      <>
      <section className="coins-container">
         {!number&&<div className="search-coins">
         {/* <h3>Search :</h3> */}
              <input type="text" placeholder='Search' onChange={(e)=>setSearchText(e.target.value)}/>
          </div>}
          <div className='coins'>
{cryptos?.length===0&&<h2>sorry nothing found for it</h2>}
          {cryptos?.length!==0&&
              cryptos?.map(crypto=>(
                  //<div className="crypto-card"> 
                      <CryptoCard {...crypto}/>
                  //</div>
              ))
          }
          </div>
      </section>
      </>
  )
};

export default Cryptocurrencies;
