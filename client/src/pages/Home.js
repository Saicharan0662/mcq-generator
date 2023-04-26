import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Home = () => {
    return (
        <div className='min-h-screen w-full bg-white-200 flex justify-left items-center landing-bg'>
            <div className='mx-2 md:mx-10'>
                <h1 className='text-2xl font-bold my-4'></h1>
                <div className='w-full md:w-2/3'>
                    <h1 className='text-4xl md:text-6xl font-semibold my-4 text-white'>Welcome to Question Generator</h1>
                    <p className='ml-2 my-4 font-light text-gray-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci laboriosam iure ab dolore quibusdam suscipit assumenda illum quam nemo iste recusandae, aspernatur rerum ipsum sint quaerat ipsa beatae. Sit, perspiciatis!</p>
                </div>

                <div className='my-2 flex gap-x-4'>
                    <Link to={'/register'}>
                        <Button variant='contained' color='success'>Join</Button>
                    </Link>
                    <Link to={'/login'}>
                        <Button variant='contained' color='success'>Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home