import React from 'react'

const Form = ({ children, submitAction }) => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='lg:w-1/4 md:w-1/2 bg-blue-100 p-8 rounded-md'>
                <form className='flex flex-col justify-center gap-y-6 px-6 py-4' onSubmit={submitAction}>
                    {children}
                </form>
            </div>
        </div>
    )
}

export default Form