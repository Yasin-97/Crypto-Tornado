import React, { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import {FrownOutlined} from '@ant-design/icons'
import {CryptoCard,usePagination,ErrorMessage,Loading} from '../../components'
import { useGetCryptosQuery } from "../../../assets/services/cryptoApi";


const Cryptocurrencies = ({number}) => {
    const numberOfCryptos=number?number:100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(numberOfCryptos);
  const [searchedCryptos,setSearchedCryptos]=useState([])
  const [searchText,setSearchText]=useState('')
  const {setInputData,currentPageData,paginate}=usePagination()

  const cryptos=searchText!==''?searchedCryptos:currentPageData

  const favCryptos = useSelector((state) => state.watchlistApi.favCryptos);

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

// useEffect(() => {
  
// }, [favCryptos])

if(isFetching) return <Loading />
if(!cryptosList?.data)  return <ErrorMessage> You may have bad internet connection! check it and refresh.</ErrorMessage>

  return (
      <>
      <section className="coins-container">
         {!number&&<div className="search-coins">
              <input type="text" placeholder='Search' onChange={(e)=>setSearchText(e.target.value)}/>
          </div>}
{searchedCryptos?.length===0&&<ErrorMessage>Sorry! no match coin found!</ErrorMessage>}
          <div className='coins'>
          {cryptos?.length!==0&&
              cryptos?.map(crypto=>{
                const isFav= favCryptos?.find(favCrypto=>favCrypto.name===crypto.name)
                    
               return <CryptoCard key={crypto.id} isFav={isFav} {...crypto}/>
              }
              )
          }
          </div>
      {numberOfCryptos!==10&&searchText===''&&paginate}
      </section>
      </>
  )
};

export default Cryptocurrencies;
