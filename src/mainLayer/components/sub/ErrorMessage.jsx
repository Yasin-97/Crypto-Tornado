import React from 'react'

export default function ErrorMessage({children}) {
    return (
        <div className='ErrorMessage'>
            <h2>{children}</h2>
        </div>
    )
}
