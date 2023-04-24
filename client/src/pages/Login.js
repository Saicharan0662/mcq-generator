import React from 'react'
import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Form from '../components/Form';

const Login = () => {

    const login = (e) => {
        e.preventDefault();
        console.log('login')
    }

    return (
        <>
            <Navbar
                text='Register'
                path='/register'
            />
            <Form submitAction={login}>
                <h1 className='text-lg font-bold'>Login</h1>
                <form className='flex flex-col justify-center gap-y-6 px-6 py-4'>
                    <TextField id="standard-basic0" label="Email" variant="standard" type='email' required />
                    <TextField id="standard-basic1" label="password" variant="standard" type='password' required />
                    <Button variant="contained" color='success' type='submit'>Login</Button>
                </form>
            </Form>
        </>
    )
}

export default Login