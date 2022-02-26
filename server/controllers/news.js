const axios=require('axios')
const newsRouter= require('express').Router();

newsRouter.get('/:newsCategory/:count',async(req,res)=>{

    const headers={
        'accept-language' : 'en',
        'x-bingapis-sdk' : "true",
        'x-rapidapi-host' : "bing-news-search1.p.rapidapi.com",
        'x-rapidapi-key' : "1be1485364msh1d5c9fda0db9418p10a09djsnb6b15963378f",
    }
    
    var options = {
        method: 'GET',
        url: `https://bing-news-search1.p.rapidapi.com/news/search?q=${req.params.newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${req.params.count}`, 
        params: {cc: 'us'},
        headers
    };
    
    const response=await axios.request(options).then(function (response) {
      return res.status(200).json(response.data);
   }).catch(function (error) {
    return res.json(error);
   });
   return response  
  })

module.exports=newsRouter
