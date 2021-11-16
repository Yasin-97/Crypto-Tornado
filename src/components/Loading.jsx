import React from 'react'
import loadingSpinner from '../images/loading.svg'

export default function Loading() {
    return (
        <div style={{display:'flex',justifyContent:'center'}}><img src={loadingSpinner} alt=""/> </div>
    )
}
