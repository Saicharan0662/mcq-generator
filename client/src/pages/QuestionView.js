import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import QuestionCard from '../components/QuestionCard'
import TextField from '@mui/material/TextField';
import downloadIcon from '../assets/download.png'
import { Button } from '@mui/material';

const QuestionView = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [question, setQuestion] = useState(null)
    const [numberQToDownload, setNumberQToDownload] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_HOST}ques/delete_getsingle_question/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                setQuestion(data.data)
                setNumberQToDownload(data.data.questions.length)

            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])

    const downloadPDF = () => {
        if (numberQToDownload <= 0) return alert('Number of questions should be greater than 0')
        if (numberQToDownload > question.questions.length) return alert('Number of questions can not be greater than total number of questions')

        let temp_questions = [...question.questions]
        // get random numberQToDownload questions
        temp_questions = temp_questions.sort(() => Math.random() - 0.5).slice(0, numberQToDownload)

        navigate('/download', {
            state: {
                questions: temp_questions,
                title: question.title,
                description: question.description,
                tags: question.tags,
            }
        })
    }

    return (
        <div>
            <Navbar
                text='Back'
                clickHandler={() => navigate('/dashboard')}
                isLoading={isLoading}
            />
            <div className='px-12 py-4'>
                <div className='my-4 py-4'>
                    <TextField
                        id="standard-name"
                        label="No. of Questions"
                        type='number'
                        value={numberQToDownload}
                        onChange={(e) => setNumberQToDownload(e.target.value)}
                        max={question?.questions.length}
                        InputProps={{
                            endAdornment:
                                <Button onClick={downloadPDF}>
                                    <img src={downloadIcon} alt="d" className='h-8 cursor-pointer' />
                                </Button>
                        }}
                    />
                </div>
                <h2>Total Questions: {question?.questions.length}</h2>
                <div>
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
                    <div className='mt-4 md:mx-4'>
                        {question && question.questions.map((question, index) => {
                            return (
                                <QuestionCard
                                    key={index}
                                    qno={index + 1}
                                    question={question.question}
                                    answer={question.answer}
                                    options={question.options}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionView