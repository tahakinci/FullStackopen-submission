import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      return [...state, content]
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
    },
    setAnecdotes: (_, action) => {
      return action.payload
    }
  }
})

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const addedAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(addedAnecdote))
  }
}

export const updateAnecdoteAsync = (id, content) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, content)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { createAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
