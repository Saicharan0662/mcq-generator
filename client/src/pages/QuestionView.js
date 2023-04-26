import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const QuestionView = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [question, setQuestion] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}ques/delete_getsingle_question/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setQuestion(data.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <Navbar
                text='Back'
                clickHandler={() => navigate('/dashboard')}
            />
            <div className='px-12 py-4'>
                <h2>Title: {question?.title}</h2>
                <h2>Description: {question?.description}</h2>
                <span>Tags: </span>
                {question && question.tags.map((tag, index) => {
                    return (
                        <span key={index} className='mr-1'>
                            <span className='rounded-sm px-2 py-1 bg-green-100 text-green-500 text-xs'>{tag}</span>
                        </span>
                    )
                })}
                <h2>Total Questions: {question?.questions.length}</h2>
                <div className='mt-4 md:mx-4'>
                    {question && question.questions.map((question, index) => {
                        return (
                            <div key={index} className='my-4 py-4 px-4 rounded-md' style={{ background: '#f0f8ff' }}>
                                <p className='text-md font-semibold'>{index + 1}. {question.question}</p>
                                <p className='text-md font-normal'>Options: {question.options}</p>
                                <p className='text-md font-normal'>Answer: {question.answer}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default QuestionView