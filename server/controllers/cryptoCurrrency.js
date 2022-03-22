const cryptoRouter= require('express').Router();
const {axiosResponse} = require('../helpers/utils')
const headers={
    'x-access-token': process.env.CRYPTO_X_ACCESS_TOKEN
}

cryptoRouter.get('/coins',(req,res)=>{

    const options = {
        method: 'GET',
        url: `https://api.coinranking.com/v2/coins?limit=${req.query.limit}`,
        headers
    };

  return axiosResponse(req,res,options)  
  })


  cryptoRouter.get('/coin/:coinId',(req,res)=>{   
    
    const options = {
        method: 'GET',
        url: `https://api.coinranking.com/v2/coin/${req.params.coinId}`, 
        headers
    };

  return axiosResponse(req,res,options)  
  })

  cryptoRouter.get('/coin/:coinId/history/:timePeriod',(req,res)=>{ 
    
    const options = {
        method: 'GET',
        url: `https://api.coinranking.com/v2/coin/${req.params.coinId}/history?timePeriod=${req.params.timePeriod}`, 
        headers
    };

  return axiosResponse(req,res,options) 
  })

  cryptoRouter.get('/exchanges',(req,res)=>{ 
  
  const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/exchanges`, 
  };

return axiosResponse(req,res,options)  
})

module.exports=cryptoRouter
