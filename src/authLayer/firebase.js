import firebase from "firebase/compat/app"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'firebase/compat/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAsgkDWnMPTKB-HVl_j_sUzsC5hkOWZlGQ',
  authDomain: 'login-logout-system-2a2fd.firebaseapp.com',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth()
export default app