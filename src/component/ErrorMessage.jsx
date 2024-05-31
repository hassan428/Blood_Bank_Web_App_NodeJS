import React from 'react'

export const ErrorMessage = (props) => {
    return (
        <div className='mt-5 flex justify-center items-center'>
            <h1>{props.errorMsg}</h1>
        </div>
    )
}
