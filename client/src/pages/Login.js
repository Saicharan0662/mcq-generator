import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Form from '../components/Form';

const Login = () => {

    const [input, setInput] = useState({
        useremail: '',
        userpassword: '',
    })
    const navigate = useNavigate();
    const login = (e) => {
        e.preventDefault();
        // console.log(input)

        fetch(`${process.env.REACT_APP_HOST}auth/login/`, {
            method: 'POST',
            body: JSON.stringify({
                useremail: input.useremail,
                userpassword: input.userpassword,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert(data.msg)
                setInput({
                    username: '',
                    useremail: '',
                    userpassword: '',
                    userconfirmpassword: ''
                })

                localStorage.setItem("user", JSON.stringify({
                    username: data.user.username,
                    useremail: data.user.useremail,
                    token: data.user.token
                }))

                if (data.success) navigate('/dashboard')
            })
            .catch(err => {
                console.log(err)
                setInput({
                    username: '',
                    useremail: '',
                    userpassword: '',
                    userconfirmpassword: ''
                })
            })
    }

    return (
        <>
            <Navbar
                text='Register'
                clickHandler={() => navigate('/register')}
            />
            <Form submitAction={login}>
                <h1 className='text-lg font-bold'>Login</h1>
                <form className='flex flex-col justify-center gap-y-6 px-6 py-4'>
                    <TextField id="standard-basic0" label="Email" variant="standard" type='email' required
                        value={input.useremail} onChange={e => setInput({ ...input, useremail: e.target.value })} />
                    <TextField id="standard-basic1" label="password" variant="standard" type='password' required
                        value={input.userpassword} onChange={e => setInput({ ...input, userpassword: e.target.value })} />
                    <Button variant="contained" color='success' type='submit'>Login</Button>
                </form>
            </Form>
        </>
    )
}

export default Login