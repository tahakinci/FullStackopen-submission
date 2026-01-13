import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const [anecdote, setAnecdote] = useState("")
    const dispatch = useDispatch()

    const handleCreate = async (e) => {
        e.preventDefault()
        const content = {
            content: anecdote,
            votes: 0
        }
        dispatch(addAnecdote(content))
        setAnecdote("")
    }

    return (
        <form onSubmit={(e) => handleCreate(e)}>
            <div>
                <input value={anecdote} onChange={(e) => setAnecdote(e.target.value)} />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm
