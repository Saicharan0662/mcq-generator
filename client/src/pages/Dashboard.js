import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return <Navigate to='/' />

    return (
        <div>
            <h1>{user && user.username}</h1>
        </div>
    )
}

export default Dashboard