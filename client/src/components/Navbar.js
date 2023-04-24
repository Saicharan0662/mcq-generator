import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

const Navbar = ({ text = 'Home', path = '/' }) => {
    return (
        <div className='h-12 bg-blue-700 text-white flex justify-between items-center'>
            <div className='px-4 font-bold'>Question Generator</div>
            <Link to={path} className='px-4'>
                <Button size="small" color='secondary' variant='contained'>{text}</Button>
            </Link>
        </div>
    )
}

export default Navbar