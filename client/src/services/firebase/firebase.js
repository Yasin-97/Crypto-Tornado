
import firebase from "firebase/compat/app"
import { updateProfile,getAuth,onAuthStateChanged } from "firebase/auth";
import { getFirestore,doc,setDoc,collection, query, where,onSnapshot } from "firebase/firestore";
import 'firebase/compat/auth'

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const db = getFirestore();
export {updateProfile,getAuth,onAuthStateChanged,doc,setDoc,collection, query, where,onSnapshot}

export default app