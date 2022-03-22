const axios=require('axios')
const geoip = require('geoip-lite');

const getUserIP=(ip)=>{
   return geoip.lookup(ip);
}

 const axiosResponse=async(req,res,options)=>{
    return await axios.request(options).then(function (response) {
        return res.status(200).json(response.data);
     }).catch(function (error) {
      return res.json(error);
     });
}

module.exports={axiosResponse,getUserIP}