const newsRouter= require('express').Router();
const axiosResponse = require('../utils')

newsRouter.get('/:newsCategory/:count',(req,res)=>{

    const headers={
        'accept-language' : 'en',
        'x-bingapis-sdk' : "true",
        'x-rapidapi-host' : process.env.NEWS_RAPID_API_HOST,
        'x-rapidapi-key' : process.env.NEWS_RAPID_API_KEY,
    }
    
    const options = {
        method: 'GET',
        url: `https://bing-news-search1.p.rapidapi.com/news/search?q=${req.params.newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${req.params.count}`, 
        params: {cc: 'us'},
        headers
    };
    
    return axiosResponse(req,res,options)
  })

module.exports=newsRouter
