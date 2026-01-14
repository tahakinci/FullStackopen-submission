import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNewAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
      notificationDispatch({ type: "SET_NOTIFICATION", payload: `anecdote "${newAnecdote.content}" created` })
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)
    },
    onError: (error) => {
      notificationDispatch({ type: "SET_NOTIFICATION", payload: error.message })
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
    event.target.anecdote.value = ''
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
