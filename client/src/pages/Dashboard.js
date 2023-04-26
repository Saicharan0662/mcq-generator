import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar'
import Card from '../components/Card';

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const [input, setInput] = useState({
        title: '',
        description: '',
        link: '',
        tags: ''
    })
    const [questions, setQuestions] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const createQuestion = e => {
        e.preventDefault()
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_HOST}ques/save_questions/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                title: input.title,
                description: input.description,
                link: input.link,
                tags: input.tags
            })
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                if (data.success) alert("Question created successfully")
                if (data.msg) alert(data.msg)

                setInput({
                    title: '',
                    description: '',
                    link: '',
                    tags: ''
                })

                getQuestions()
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }

    const deleteQuestion = (qId) => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_HOST}ques/delete_getsingle_question/${qId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                if (data.msg) alert(data.msg)

                getQuestions()
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }

    const getQuestions = e => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_HOST}ques/get_questions/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                if (data.success) setQuestions(data.data)
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        getQuestions()
    }, [])

    if (!user) return <Navigate to='/' />

    return (
        <div className='mb-6'>
            <Navbar
                text='Logout'
                clickHandler={() => {
                    localStorage.removeItem('user')
                    navigate('/')
                }}
                isLoading={isLoading}
            />
            <div className='px-8 py-4'>
                <h1 className='text-lg font-normal'>Welcome back {user && user.username}!</h1>
            </div>
            <div>
                <div className='flex justify-center items-center'>
                    <div className='lg:w-1/4 md:w-1/2 bg-blue-100 p-8 rounded-md'>
                        <h1 className='font-bold text-md'>Create Questions</h1>
                        <form className='flex flex-col justify-center gap-y-6 px-6 py-4' onSubmit={createQuestion}>
                            <TextField id="standard-basic0" label="Title" variant="standard" type='text' required
                                value={input.title} onChange={e => setInput({ ...input, title: e.target.value })} />
                            <TextField id="standard-basic1" label="Description" variant="standard" type='text' required
                                value={input.description} onChange={e => setInput({ ...input, description: e.target.value })} />
                            <TextField id="standard-basic1" label="Tags (separate by ',')" variant="standard" type='text' required
                                value={input.tags} onChange={e => setInput({ ...input, tags: e.target.value })} />
                            <TextField id="standard-basic1" label="Link" variant="standard" type='link' required
                                value={input.link} onChange={e => setInput({ ...input, link: e.target.value })} />

                            <Button variant="contained" color='success' type='submit'>Create</Button>
                        </form>
                    </div>
                </div>
            </div>
            <hr className='my-6' />
            <div className='mt-4 px-8'>
                <h1 className='text-md font-bold'>Your Questions {questions && `(${questions.length})`}</h1>
                <div className='flex justify-around items-center flex-wrap'>
                    {questions && questions.map((question, index) => {
                        return (
                            <Card
                                key={index}
                                title={question.title}
                                description={question.description}
                                tags={question.tags}
                                _id={question._id['$oid']}
                                count={question.questions.length}
                                deleteQuestion={deleteQuestion}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dashboard