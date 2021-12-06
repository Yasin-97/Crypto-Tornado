import React from 'react'
import { useSelector } from 'react-redux';

export default function WatchList() {
    const currentUser = useSelector((state) => state.authApi.currentUser);
    console.log(currentUser);
    return (
        <div>
            <h1 style={{color:'white'}}>{currentUser.email}{currentUser.displayName}</h1>
        </div>
    )
}
