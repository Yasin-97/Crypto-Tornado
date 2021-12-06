import React from 'react'
import millify from "millify";
import {Link} from 'react-router-dom'


export default function CryptoCard({id,iconUrl,rank,name,price,marketCap,change}) {
    return (
        <div className='card-container'>
             <Link to={`/cryptodetails/${id}`}>
            <div className="card">
                
                <div className="card-icon-container">
                <img className='card-icon' alt={name} src={iconUrl} />
                </div>
                <div className="card-content">
                    <h2>{rank}. {name}</h2>
                    <div className="card-detail">
                    <p>Price: <b>{millify(price,{precision:2})}</b></p>
                    <p>Market Cap: <b>{millify(marketCap)}</b></p>
                    <p>Daily change: <b className={`${change>0?'bullish':'burish'}`}>{millify(change)}%</b></p>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}
