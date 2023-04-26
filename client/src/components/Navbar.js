import React from 'react'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

const Navbar = ({ text = 'Home', clickHandler, isLoading = false }) => {
    return (
        <div className='sticky top-0'>
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
            {isLoading && <LinearProgress color="secondary" />}
        </div>
    )
}

export default Navbar