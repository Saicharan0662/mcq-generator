import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditQuestion = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const { id } = useParams()
    const navigate = useNavigate()
    const [question, setQuestion] = useState({
        title: '',
        description: '',
        tags: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const editQuestion = (e) => {
        e.preventDefault()
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_HOST}ques/update_question/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                title: question.title,
                description: question.description,
                tags: question.tags,
                questionID: id,
            })
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                alert(data.msg)
                navigate('/dashboard')
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}ques/delete_getsingle_question/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                const ques = data
                if (!data.success) alert(data.msg)
                setQuestion({
                    title: ques.data.title,
                    description: ques.data.description,
                    tags: ques.data.tags.join(', '),
                })
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <Navbar
                text='Back'
                clickHandler={() => navigate('/dashboard')}
            />
            <div>
                <Form
                    submitAction={editQuestion}
                >
                    <h1 className='text-lg font-bold'>Edit question</h1>
                    <TextField id="standard-basic0" label="Title" variant="standard" required
                        value={question.title} onChange={e => setQuestion({ ...question, title: e.target.value })} />
                    <TextField id="standard-basic1" label="Description" variant="standard" type='text' required
                        value={question.description} onChange={e => setQuestion({ ...question, description: e.target.value })} />
                    <TextField id="standard-basic2" label="Tags" variant="standard" type='text' required
                        value={question.tags} onChange={e => setQuestion({ ...question, tags: e.target.value })} />

                    <Button variant="contained" color='success' type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default EditQuestion