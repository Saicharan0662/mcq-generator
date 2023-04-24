import React from 'react'

const Form = ({ children, submitAction }) => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='lg:w-1/4 md:w-1/2 bg-blue-100 p-8 rounded-md' onSubmit={submitAction}>
                {children}
            </div>
        </div>
    )
}

export default Form