import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import Form from '../components/Form';

const Register = () => {

    const register = (e) => {
        e.preventDefault();
        console.log('register')
    }

    return (
        <>
            <Navbar
                text='Login'
                path='/login'
            />
            <Form
                submitAction={register}
            >
                <h1 className='text-lg font-bold'>Register</h1>
                <form className='flex flex-col justify-center gap-y-6 px-6 py-4'>
                    <TextField id="standard-basic" label="Name" variant="standard" required />
                    <TextField id="standard-basic" label="Email" variant="standard" type='email' required />
                    <TextField id="standard-basic" label="password" variant="standard" type='password' required />
                    <TextField id="standard-basic" label="confirm password" variant="standard" type='password' required />
                    <Button variant="contained" color='success' type='submit'>Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default Register