import { useDispatch, useSelector } from "react-redux"
import { updateAnecdoteAsync } from "../reducers/anecdoteReducer"
import { handleNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()


    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content?.toLowerCase().includes(filter?.toLowerCase()))

    const vote = id => {
        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(updateAnecdoteAsync(id, { ...votedAnecdote, votes: votedAnecdote.votes + 1 }))
        dispatch(handleNotification(`You voted "${votedAnecdote.content}"`, 5000))
    }
    return (
        <div>
            {filteredAnecdotes.sort((a, b) => b.votes - a.votes)
                .map(anecdote => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default AnecdoteList
