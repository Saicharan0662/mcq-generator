import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Home = () => {
    return (
        <div className='flex h-screen flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold my-4'>Welcome to Question Generator</h1>
            <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
            >
                <Link to={'/register'}>
                    <Button>Join</Button>
                </Link>
                <Link to={'/login'}>
                    <Button>Login</Button>
                </Link>
            </ButtonGroup>
        </div>
    )
}

export default Home