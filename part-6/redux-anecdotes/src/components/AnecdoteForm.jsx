import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const [content, setContent] = useState("")
    const dispatch = useDispatch()

    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createAnecdote(content))
        setContent("")
    }

    return (
        <form onSubmit={(e) => handleCreate(e)}>
            <div>
                <input value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm
