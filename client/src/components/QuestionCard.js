import React from 'react'

const QuestionCard = ({ question, options, answer, qno }) => {
    return (
        <div className='my-4 py-4 px-4 rounded-md' style={{ background: '#f0f8ff' }}>
            <p className='text-md font-semibold'>{qno}. {question}</p>
            <div className='flex flex-col my-3'>
                {options.map((option, index) => {
                    return (
                        <ul key={index}>
                            <li className='text-md font-normal'>
                                {index === 0 && <span className='mr-2'>A.</span>}
                                {index === 1 && <span className='mr-2'>B.</span>}
                                {index === 2 && <span className='mr-2'>C.</span>}
                                {index === 3 && <span className='mr-2'>D.</span>}
                                {option}
                            </li>
                        </ul>
                    )
                })}
            </div>
            {answer && <p className='text-md font-normal'>Answer: {answer}</p>}
        </div>
    )
}

export default QuestionCard