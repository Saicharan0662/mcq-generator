import React from 'react'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';

const Navbar = ({ text = 'Home', clickHandler, isLoading = false }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <div className='sticky top-0' style={{ zIndex: 2 }}>
            <div className='h-12 bg-blue-700 text-white flex justify-between items-center px-6'>
                <Link to={user ? '/dashboard' : '/'}>
                    <div className='font-bold cursor-pointer'>Question Generator</div>
                </Link>
                <Button
                    size="small"
                    color='secondary'
                    variant='contained'
                    onClick={() => clickHandler()}
                >
                    {text}
                </Button>
            </div>
            {isLoading && <LinearProgress color="secondary" />}
        </div>
    )
}

export default Navbar