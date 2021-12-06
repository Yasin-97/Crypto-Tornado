import React from 'react'
import { useSelector } from 'react-redux';
import { db,getDoc ,doc} from '../../../store/firebase';

export default function WatchList() {
    const currentUser = useSelector((state) => state.authApi.currentUser);

    const me=async()=>{
        const docRef = doc(db, "users", "Rrl12W0E4hwDmUWIPq7T");
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
        }
        me()

    return (
        <div>
            <h1 style={{color:'white'}}>{currentUser.email}{currentUser.displayName}</h1>
        </div>
    )
}
