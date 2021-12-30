import React from 'react'
import { FrownOutlined } from "@ant-design/icons";

export default function ErrorMessage({children}) {
    return (
        <div className='errorMessage'>
            <FrownOutlined /> <h2>{children}</h2>
        </div>
    )
}
