import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import {useGetCryptosQuery} from '../services/cryptoApi'
import {Cryptocurrencies,News} from '../components'
import Loading from './Loading'

const Homepage = () => {
  const showingCryptos=10
  const showingNews=6
    const {data,isFetching}=useGetCryptosQuery(showingCryptos)
    const globalStats=data?.data?.stats;
    if(isFetching)  return <Loading />
    if(!globalStats)  return 'you may have no internet conection!'
  return<main>
<h2 className='heading'>Global Crypto Stats</h2>
<div className='stats-container'>
    <div className='stat'><p>Total Cryptocurrencies</p><b>{globalStats.total}</b></div>
    <div className='stat'><p>Total Exchanges</p><b>{millify(globalStats.totalExchanges)}</b></div>
    <div className='stat'><p>Total Market Cap</p><b>{millify(globalStats.totalMarketCap)}</b></div>
    <div className='stat'><p>Total 24h Volume</p><b>{millify(globalStats.total24hVolume)}</b></div>
    <div className='stat'><p>Total Markets</p><b>{millify(globalStats.totalMarkets)}</b></div>
</div>
<div className='heading-container'>
<h2 className='heading'>Top 10 Cryptocurrencies</h2>
<h4 className='show-more'><Link to='/cryptocurrencies'>Show More</Link></h4>
</div>
<Cryptocurrencies number={showingCryptos}/>
<div className='heading-container'>
<h2 className='heading'>Top Crypto News</h2>
<h4 className='show-more'><Link to='/news'>Show More</Link></h4>
</div>
<News  number={showingNews}/>
  </main>;
};

export default Homepage;
