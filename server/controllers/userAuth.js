const {firebaseAdmin} =require('../firebase')

const userAuthRouter = require("express").Router();

userAuthRouter.post('/',async(req,res)=>{

    try {
        const user=await firebaseAdmin.auth().createUser({
            email:req.body.email,
            emailVerified: false,
            password:req.body.password.toString(),
            displayName:req.body.displayName,
            disabled: false
        })
        res.json({message:'User Created',user})
    } catch (error) {
        res.json({message:'Error creating user'}) 
    }
})



// userAuthRouter.post('/:user-id',async(req,res)=>{
//     try{const user = await firebaseAdmin.auth().getUser(req.params.user-id)  
//         firebaseAdmin.auth().
//      res.json(user)
//    }catch(e){
//       res.json({message:'cannot fetch user data'})   
//     }
//     })

module.exports = userAuthRouter;      
