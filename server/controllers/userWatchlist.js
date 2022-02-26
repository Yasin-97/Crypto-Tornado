const {firebaseAdmin} =require('../firebase')

const userWatchlistRouter = require("express").Router();

const db = firebaseAdmin.firestore();

userWatchlistRouter.get('/', async (req, res) => {
  const auth = req.currentUser;

  if (auth) {
  let a = db.collection("users").doc(req.query.userId);
   a.get().then(doc =>{
      if (doc.exists) {
        return res.status(200).json(doc.data())
      } else {
        return res.status(200).json({ favCryptos:[]});
      }
    })
    .catch( error => {
     return res.json({msg:error});
    });
  }else{
    return res.status(403).send('Not authorized');
  }

});



userWatchlistRouter.post('/', async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
if(req.body.userId&&req.body.favCryptos){

  let a = db.collection("users");
  let docRef = a.doc(req.body.userId);
  await docRef.set({
    favCryptos: req.body.favCryptos,
  })
   return res.status(201).json({ msg: "request succeed!" });
}
else{
  return res.status(400).json({ msg: "bad request!" });
}
  }
  return res.status(403).send('Not authorized');
});



module.exports = userWatchlistRouter;
