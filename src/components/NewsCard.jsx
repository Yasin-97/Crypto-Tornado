import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import dmemoImg from '../assets/imgs/demo.jpg'


export default function NewsCard({name,image,description,provider,datePublished}) {
    return (
        <div className='news-card-container'>
        <Link to={`/crypto`}>
       <div className="news-card">
           
           <div className="news-card-img-container">
        <img className='news-card-img' alt="cryptocurrency news" src={image?.thumbnail?.contentUrl||dmemoImg}/>
           <h2 >{name}</h2>
           </div> 
            <div className="news-card-content">
               <p>{description.length>100?`${description.substring(0,140)}...`:description}</p>
               <div className="news-card-detail">
               <div className='news-provider'>
               <img alt="cryptocurrency news provider" src={provider[0]?.image?.thumbnail?.contentUrl||dmemoImg}/>
                   <p>{provider[0]?.name} </p></div>
               <p>{moment(datePublished).startOf('ss').fromNow()}</p>
               </div>
           </div>
       </div>
       </Link>
   </div>
    )
}
