import React from 'react'
import Button from '@mui/material/Button';

const Navbar = ({ text = 'Home', clickHandler }) => {
    return (
        <div className='h-12 bg-blue-700 text-white flex justify-between items-center'>
            <div className='px-4 font-bold'>Question Generator</div>
            <Button
                className='px-4'
                size="small"
                color='secondary'
                variant='contained'
                onClick={() => clickHandler()}
            >
                {text}
            </Button>
        </div>
    )
}

export default Navbar