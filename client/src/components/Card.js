import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ title, description, tags, count, _id }) => {
    return (
        <div className='rounded-md px-6 bg-white py-3 relative exam-card-width mx-2 my-3' style={{ background: '#f0f8ff' }}>
            <h1 className='text-lg font-semibold truncate ' style={{ width: '85%' }}>{title.toUpperCase()}</h1>
            <p className='font-normal font-tiny -mt-1 mb-2'>{description}</p>
            <div>
                {tags.map((tag, index) => {
                    return (
                        <span key={index} className='mr-1'>
                            <span className='rounded-sm px-2 py-1 bg-green-100 text-green-500 text-xs'>{tag}</span>
                        </span>
                    )
                })}
            </div>
            <div className=''>
                <Link className='student-exam-card-btn' to={`/questionview/${_id}`}> View</Link>
            </div>
            <span className='rounded-md px-2 py-1 bg-green-100 text-green-500 text-xs absolute bottom-3 right-2 border-2 border-green-300'>
                {count} Qs
            </span>
        </div>
    )
}

export default Card