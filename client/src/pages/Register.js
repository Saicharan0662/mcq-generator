import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import Form from '../components/Form';

const Register = () => {

    const [input, setInput] = useState({
        username: '',
        useremail: '',
        userpassword: '',
        userconfirmpassword: ''
    })
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();

        if (input.userpassword !== input.userconfirmpassword) {
            alert("Password do not match")
            return;
        }
        setisLoading(true)

        fetch(`${process.env.REACT_APP_HOST}auth/register/`, {
            method: 'POST',
            body: JSON.stringify({
                username: input.username,
                useremail: input.useremail,
                userpassword: input.userpassword,
            })
        })
            .then(res => res.json())
            .then(data => {
                setisLoading(false)
                alert(data.msg)
                setInput({
                    username: '',
                    useremail: '',
                    userpassword: '',
                    userconfirmpassword: ''
                })

                if (data.success) navigate('/login')
            })
            .catch(err => {
                console.log(err)
                setisLoading(false)
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
                text='Login'
                clickHandler={() => navigate('/login')}
                isLoading={isLoading}
            />
            <Form
                submitAction={register}
            >
                <h1 className='text-lg font-bold'>Register</h1>
                <TextField id="standard-basic0" label="Name" variant="standard" required
                    value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} />
                <TextField id="standard-basic1" label="Email" variant="standard" type='email' required
                    value={input.useremail} onChange={e => setInput({ ...input, useremail: e.target.value })} />
                <TextField id="standard-basic2" label="password" variant="standard" type='password' required
                    value={input.userpassword} onChange={e => setInput({ ...input, userpassword: e.target.value })} />
                <TextField id="standard-basic3" label="confirm password" variant="standard" type='password' required
                    value={input.userconfirmpassword} onChange={e => setInput({ ...input, userconfirmpassword: e.target.value })} />
                <Button variant="contained" color='success' type='submit'>Submit</Button>
            </Form>
        </>
    )
}

export default Register