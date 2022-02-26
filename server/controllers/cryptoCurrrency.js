const axios=require('axios')
const cryptoRouter= require('express').Router();

const headers={
    'x-access-token': 'coinrankingf19ae80d7c6ff61b3f9ccc78c4baabf20f3a449f722ab8a8' 
}

cryptoRouter.get('/coins',async(req,res)=>{

    
    var options = {
        method: 'GET',
        url: `https://api.coinranking.com/v2/coins?limit=${req.query.limit}`, 
        headers
    };
    
    const response=await axios.request(options).then(function (response) {
      return res.status(200).json(response.data);
   }).catch(function (error) {
    return res.json(error);
   });
   
   return response  
  })


  cryptoRouter.get('/coin/:coinId',async(req,res)=>{
    
    var options = {
        method: 'GET',
        url: `https://api.coinranking.com/v2/coin/${req.params.coinId}`, 
        headers
    };
    
    const response=await axios.request(options).then(function (response) {
      return res.status(200).json(response.data);
   }).catch(function (error) {
    return res.json(error);
   });
   return response  
  })

  cryptoRouter.get('/coin/:coinId/history/:timePeriod',async(req,res)=>{ 
    
    var options = {
        method: 'GET',
        url: `https://api.coinranking.com/v2/coin/${req.params.coinId}/history?timePeriod=${req.params.timePeriod}`, 
        headers
    };
    
    const response=await axios.request(options).then(function (response) {
      return res.status(200).json(response.data);
   }).catch(function (error) {
    return res.json(error);
   });
   return response  
  })

  cryptoRouter.get('/exchanges',async(req,res)=>{ 
  
  var options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/exchanges`, 
  };
  
  const response=await axios.request(options).then(function (response) {
    return res.status(200).json(response.data);
 }).catch(function (error) {
    return res.json(error);
 });

 return response  
})

module.exports=cryptoRouter
