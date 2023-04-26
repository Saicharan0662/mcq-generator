import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'

const Download = ({ }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { questions, title, description, tags } = location.state

    useEffect(() => {
        window.print()
        navigate('/dashboard')
    }, [])


    return (
        <div className='mx-8 my-4 px-8'>
            <h2>Title: {title}</h2>
            <h2>Description: {description}</h2>
            <span>Tags: </span>
            {tags && tags.map((tag, index) => {
                return (
                    <span key={index} className='mr-1'>
                        <span className='rounded-sm px-2 py-1 bg-green-100 text-green-500 text-xs'>{tag}</span>
                    </span>
                )
            })}
            <div className='mt-4 md:mx-4'>
                {questions && questions.map((question, index) => {
                    return (
                        <QuestionCard
                            key={index}
                            qno={index + 1}
                            question={question.question}
                            options={question.options}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Download