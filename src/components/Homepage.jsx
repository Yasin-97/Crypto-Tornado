import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import {useGetCryptosQuery} from '../services/cryptoApi'

const Homepage = () => {
    const {data,isFetching}=useGetCryptosQuery()
    const globalStats=data?.data?.stats;
    if(isFetching)  return 'Loading...'
  return<>
<h2 className='heading'>Global Crypto Stats</h2>
<div className='stats-container'>
    <div className='stat'><p>Total Cryptocurrencies</p><b>{globalStats.total}</b></div>
    <div className='stat'><p>Total Exchanges</p><b>{millify(globalStats.totalExchanges)}</b></div>
    <div className='stat'><p>Total Market Cap</p><b>{millify(globalStats.totalMarketCap)}</b></div>
    <div className='stat'><p>Total 24h Volume</p><b>{millify(globalStats.total24hVolume)}</b></div>
    <div className='stat'><p>Total Markets</p><b>{millify(globalStats.totalMarkets)}</b></div>
</div>
<div>
<h2 className='heading'>Global Crypto Stats</h2>
<h4><Link>Show More</Link></h4>
</div>
  </>;
};

export default Homepage;
