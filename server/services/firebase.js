
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");

const firebaseApp=firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://login-logout-system-2a2fd.firebaseio.com",
});

module.exports={firebaseAdmin,firebaseApp}