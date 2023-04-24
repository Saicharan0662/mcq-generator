import React from 'react'
import { Navigate } from 'react-router'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    if (!user) return <Navigate to='/' />

    return (
        <div>
            <Navbar
                text='Logout'
                clickHandler={() => {
                    localStorage.removeItem('user')
                    navigate('/')
                }}
            />
            <h1>{user && user.username}</h1>
        </div>
    )
}

export default Dashboard