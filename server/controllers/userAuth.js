const userAuthRouter = require("express").Router();
const {firebaseAdmin} =require('../services/firebase')
const {getUserIP} = require('../helpers/utils')

userAuthRouter.post('/',async(req,res)=>{

    const ip = req.headers['x-forwarded-for']||req.ip||req.socket?.remoteAddress
    
    const userCountry = getUserIP(ip)?.country
    
    if(userCountry==='IR'){
        return res.json(`From Iran? You may need to use a proxy or VPN.`)
    }
    else{
        firebaseAdmin.auth().createUser({
            email:req.body.email,
            emailVerified: false,
            password:req.body.password.toString(),
            displayName:req.body.displayName,
            disabled: false
        }).then((user)=> res.json({message:'User Created',user}))
        .catch((err)=>{
            const regex=new RegExp(`^Error while parsing response data`, "gi");
            const authNetworkErr=err.message.match(regex)
            if(authNetworkErr){
                return res.json(`A network error (such as unreachable host) has occurred. You may need to use a proxy.`)
            }
           return res.json(err.message)
        })
    }

         
})

module.exports = userAuthRouter;      
