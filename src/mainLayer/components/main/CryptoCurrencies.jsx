import React, { useState ,useEffect} from "react";
import {CryptoCard,usePagination,ErrorMessage} from '../../components'

import { useGetCryptosQuery } from "../../../assets/services/cryptoApi";
import Loading from '../sub/Loading'

const Cryptocurrencies = ({number}) => {
    const numberOfCryptos=number?number:100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(numberOfCryptos);
  const [searchedCryptos,setSearchedCryptos]=useState([])
  const [searchText,setSearchText]=useState('')
  const {setInputData,currentPageData,paginate}=usePagination()

  const cryptos=searchText!==''?searchedCryptos:currentPageData


  useEffect(()=>{
    setInputData(cryptosList?.data?.coins)
  },[cryptosList])

useEffect(()=>{
const filteredData=cryptosList?.data?.coins.filter(coin=>{
    // return coin.name.toLowerCase().includes(searchText.toLowerCase())
    const regex= new RegExp(`^${searchText}`,'gi')
    return coin.name.match(regex)|| coin.symbol.match(regex)

})

setSearchedCryptos(filteredData)

}
,[cryptosList,searchText])

if(isFetching) return <Loading />
if(!cryptosList?.data)  return <ErrorMessage>You may have no internet connection! check it and refresh.</ErrorMessage>

// if(searchedCryptos?.length===0) return <ErrorMessage>Sorry! No match coin found!</ErrorMessage>

  return (
      <>
      <section className="coins-container">
         {!number&&<div className="search-coins">
              <input type="text" placeholder='Search' onChange={(e)=>setSearchText(e.target.value)}/>
          </div>}
{searchedCryptos?.length===0&&<ErrorMessage>sorry! no match coin found!</ErrorMessage>}
          <div className='coins'>
          {cryptos?.length!==0&&
              cryptos?.map(crypto=>(
                      <CryptoCard key={crypto.id} {...crypto}/>
              ))
          }
          </div>
      {numberOfCryptos!==10&&searchText===''&&paginate}
      </section>
      </>
  )
};

export default Cryptocurrencies;
