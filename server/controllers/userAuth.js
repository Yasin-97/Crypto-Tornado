const {firebaseAdmin} =require('../firebase')

const userAuthRouter = require("express").Router();

userAuthRouter.post('/',async(req,res)=>{
         firebaseAdmin.auth().createUser({
            email:req.body.email,
            emailVerified: false,
            password:req.body.password.toString(),
            displayName:req.body.displayName,
            disabled: false
        }).then((user)=> res.json({message:'User Created',user}))
        .catch((err)=>{
            console.log('thi is ther roro',err);
            const regex=new RegExp(`^Error while parsing response data`, "gi");
            const authNetworkErr=err.message.match(regex)
            if(authNetworkErr){
                return res.json('A network error (such as unreachable host) has occurred. You may need to use a proxy.')
            }
            res.json(err.message)
        })
})

module.exports = userAuthRouter;      
