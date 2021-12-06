import React from 'react'

export default function ErrorMessage({children}) {
    return (
        <div className='errorMessage'>
            <h2>{children}</h2>
        </div>
    )
}
