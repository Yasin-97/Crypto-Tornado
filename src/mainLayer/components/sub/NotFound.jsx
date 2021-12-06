import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='notfound'>
            <h1>404!</h1>
            <h2>Opps... Page not found !</h2>
            <Link to='/' className='notfound-btn'>Go to Glance</Link>
        </div>
    )
}
